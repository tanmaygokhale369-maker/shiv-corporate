"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Upload, X, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Housekeeping",
  "Corporate Gifts",
  "Office Products",
  "Combo Kits",
  "Promotional",
  "Utility Products",
];

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    category: "Corporate Gifts",
    subcategory: "",
    price: "",
    original_price: "",
    stock: "100",
    description: "",
    is_featured: false,
  });

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    setImagePreviews(files.map(f => URL.createObjectURL(f)));
  }

  async function uploadImages(): Promise<string[]> {
    const urls: string[] = [];
    for (const file of imageFiles) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("products").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("products").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  }

  async function handleSave() {
    if (!form.name || !form.category) { toast.error("Name and category required"); return; }
    setSaving(true);
    try {
      const imageUrls = await uploadImages();
      const payload = {
        name: form.name,
        slug: slugify(form.name) + "-" + Date.now(),
        category: form.category.toLowerCase().replace(/\s+/g, "-"),
        price: parseFloat(form.price) || 0,
        original_price: parseFloat(form.original_price) || null,
        stock: parseInt(form.stock) || 100,
        description: form.description,
        is_featured: form.is_featured,
        is_active: true,
        ...(imageUrls.length > 0 && { images: imageUrls }),
      };

      if (editId) {
        await supabase.from("products").update(payload).eq("id", editId);
        toast.success("Product updated!");
      } else {
        await supabase.from("products").insert(payload);
        toast.success("Product added!");
      }
      resetForm();
      fetchProducts();
    } catch (e) {
      toast.error("Error saving product");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast.success("Deleted!");
    fetchProducts();
  }

  function handleEdit(p: any) {
    setEditId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price?.toString() || "",
      original_price: p.original_price?.toString() || "",
      stock: p.stock?.toString() || "100",
      description: p.description || "",
      is_featured: p.is_featured || false,
    });
    setImagePreviews(p.images || []);
    setImageFiles([]);
    setShowForm(true);
    window.scrollTo(0, 0);
  }

  function resetForm() {
    setForm({ name: "", category: "Corporate Gifts", price: "", original_price: "", stock: "100", description: "", is_featured: false });
    setImageFiles([]);
    setImagePreviews([]);
    setEditId(null);
    setShowForm(false);
  }

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Products</h1>
          <p className="text-sm text-dark-500 mt-1">Manage your product catalog</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="btn-premium text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
          <h3 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-4">{editId ? "Edit Product" : "Add New Product"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Product Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500" placeholder="e.g. Metal Keychain KC-01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Category *</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value, subcategory: ""})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Sub Category</label>
              <select value={form.subcategory} onChange={e => setForm({...form, subcategory: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500">
                <option value="">None</option>
                {form.category === "Corporate Gifts" && <>
                  <option value="keychains">Keychains</option>
                  <option value="gift-sets">Gift Sets</option>
                  <option value="notebook-diary">Notebook Diary</option>
                  <option value="leather-bags">Leather Bags</option>
                  <option value="metal-pens">Metal Pens</option>
                  <option value="plastic-pens">Plastic Pens</option>
                  <option value="bottles-mugs">Bottles & Mugs</option>
                  <option value="cardholder">Cardholder</option>
                  <option value="hand-bags">Hand Bags</option>
                  <option value="organizers">Organizers</option>
                  <option value="trophies">Trophies</option>
                  <option value="powerbank-diaries">Powerbank & Diaries</option>
                  <option value="mobile-stand">Mobile Stand</option>
                  <option value="pendrive">Pendrive</option>
                  <option value="jute-folders">Jute Folders</option>
                </>}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Price (â‚¹)</label>
              <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Original Price (â‚¹)</label>
              <input type="number" value={form.original_price} onChange={e => setForm({...form, original_price: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Stock</label>
              <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500" placeholder="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Product Images</label>
              <div className="flex items-center gap-3 flex-wrap">
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-dark-300 dark:border-dark-600 text-sm text-dark-500 cursor-pointer hover:border-brand-500 transition-colors">
                  <Upload className="w-4 h-4" /> Upload Images
                  <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-dark-200">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500 resize-none" placeholder="Product description..." />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} className="rounded" />
              <label htmlFor="featured" className="text-sm text-dark-700 dark:text-dark-300">Featured Product</label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} disabled={saving} className="btn-premium text-sm flex items-center gap-2">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
              {saving ? "Saving..." : "Save Product"}
            </button>
            <button onClick={resetForm} className="btn-secondary text-sm flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500" />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-dark-200/50 dark:border-dark-700/50">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-dark-500">Product</th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-dark-500">Category</th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-dark-500">Price</th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-dark-500">Stock</th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-dark-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-200/30 dark:divide-dark-700/30">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-12 text-dark-400">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-dark-400">No products yet. Add your first product!</td></tr>
            ) : filtered.map(p => (
              <tr key={p.id} className="hover:bg-dark-50/50 dark:hover:bg-dark-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-400 text-xs">No img</div>
                    )}
                    <span className="text-sm font-medium text-dark-900 dark:text-white">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-dark-500 capitalize">{p.category?.replace(/-/g, " ")}</td>
                <td className="px-6 py-4 text-sm text-dark-900 dark:text-white">â‚¹{p.price}</td>
                <td className="px-6 py-4 text-sm text-dark-500">{p.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(p)} className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center text-brand-500 hover:bg-brand-100 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

