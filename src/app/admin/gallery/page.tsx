"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Upload, Trash2, Image as ImageIcon, X } from "lucide-react";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<any | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchGallery(); }, []);

  async function fetchGallery() {
    setLoading(true);
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    setImages(data || []);
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("products").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("products").getPublicUrl(path);
        await supabase.from("gallery").insert({
          title: file.name.replace(/\.[^.]+$/, ""),
          image: data.publicUrl,
          category: "General",
          is_active: true,
        });
      }
    }
    toast.success("Images uploaded!");
    fetchGallery();
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(id: string, imageUrl: string) {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery").delete().eq("id", id);
    // extract path from URL and delete from storage
    const path = imageUrl.split("/products/")[1];
    if (path) await supabase.storage.from("products").remove([path]);
    setImages(prev => prev.filter(i => i.id !== id));
    toast.success("Deleted!");
  }

  async function updateTitle(id: string, title: string) {
    await supabase.from("gallery").update({ title }).eq("id", id);
    setImages(prev => prev.map(i => i.id === id ? { ...i, title } : i));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Gallery</h1>
          <p className="text-sm text-dark-500 mt-1">Manage gallery images</p>
        </div>
        <label className={`btn-premium text-sm flex items-center gap-2 cursor-pointer ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Upload Images"}
          <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {loading ? (
        <p className="text-center py-12 text-dark-400">Loading...</p>
      ) : images.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-dark-200 dark:border-dark-700 rounded-2xl">
          <ImageIcon className="w-12 h-12 text-dark-300 mx-auto mb-3" />
          <p className="text-dark-400 mb-4">No images yet. Upload your first ones!</p>
          <label className="btn-premium text-sm cursor-pointer inline-flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Images
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-2xl overflow-hidden border border-dark-200/50 dark:border-dark-700/50 bg-white dark:bg-dark-900/60">
              <div className="aspect-square cursor-pointer" onClick={() => setPreview(img)}>
                <img src={img.image} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-2">
                <input
                  type="text"
                  defaultValue={img.title}
                  onBlur={e => updateTitle(img.id, e.target.value)}
                  className="w-full text-xs px-2 py-1 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-300 focus:outline-none focus:border-brand-500"
                />
              </div>
              <button
                onClick={() => handleDelete(img.id, img.image)}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setPreview(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-white/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <img src={preview.image} alt={preview.title} className="w-full rounded-2xl shadow-2xl" />
            <p className="text-white/70 text-sm text-center mt-3">{preview.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}