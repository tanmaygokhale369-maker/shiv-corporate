"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, FolderOpen, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
    const cats = data || [];
    setCategories(cats);

    // get product count per category
    const counts: Record<string, number> = {};
    for (const cat of cats) {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("category", cat.slug);
      counts[cat.slug] = count || 0;
    }
    setProductCounts(counts);
    setLoading(false);
  }

  async function handleSave() {
    if (!form.name) { toast.error("Name required"); return; }
    setSaving(true);
    const payload = { name: form.name, slug: slugify(form.name), description: form.description, is_active: true };
    if (editId) {
      await supabase.from("categories").update(payload).eq("id", editId);
      toast.success("Category updated!");
    } else {
      await supabase.from("categories").insert(payload);
      toast.success("Category added!");
    }
    resetForm();
    fetchCategories();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    await supabase.from("categories").delete().eq("id", id);
    toast.success("Deleted!");
    fetchCategories();
  }

  function handleEdit(cat: any) {
    setEditId(cat.id);
    setForm({ name: cat.name, description: cat.description || "" });
    setShowForm(true);
  }

  function resetForm() {
    setForm({ name: "", description: "" });
    setEditId(null);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Categories</h1>
          <p className="text-sm text-dark-500 mt-1">Manage product categories</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="btn-premium text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
          <h3 className="font-bold text-dark-900 dark:text-white mb-4">{editId ? "Edit Category" : "Add Category"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white"
                placeholder="e.g. Corporate Gifts" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Description</label>
              <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white"
                placeholder="Brief description" />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={handleSave} disabled={saving} className="btn-premium text-sm flex items-center gap-2">
                {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                Save
              </button>
              <button onClick={resetForm} className="btn-secondary text-sm flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
            </div>
          </div>
        </motion.div>
      )}

      {loading ? (
        <p className="text-center py-12 text-dark-400">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-center py-12 text-dark-400">No categories yet. Add your first one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="p-5 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-900 dark:text-white text-sm">{cat.name}</h3>
                    <p className="text-xs text-dark-400">{productCounts[cat.slug] || 0} products</p>
                    {cat.description && <p className="text-xs text-dark-400 mt-0.5">{cat.description}</p>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(cat)} className="w-8 h-8 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 flex items-center justify-center text-dark-400 hover:text-brand-500">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="w-8 h-8 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 flex items-center justify-center text-dark-400 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}