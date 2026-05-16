"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { MessageSquare, Phone, Mail, Building2, Trash2 } from "lucide-react";

const statusColors: Record<string, string> = {
  new: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
  contacted: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  resolved: "bg-green-500/10 text-green-600 border border-green-500/20",
  closed: "bg-dark-500/10 text-dark-400 border border-dark-500/20",
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => { fetchEnquiries(); }, []);

  async function fetchEnquiries() {
    setLoading(true);
    const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    setEnquiries(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    toast.success("Status updated!");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    await supabase.from("enquiries").delete().eq("id", id);
    setEnquiries(prev => prev.filter(e => e.id !== id));
    toast.success("Deleted!");
  }

  const filtered = filter === "all" ? enquiries : enquiries.filter(e => e.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Enquiries</h1>
        <p className="text-sm text-dark-500 mt-1">Manage customer enquiries and leads</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "new", "contacted", "resolved", "closed"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium capitalize transition-colors ${filter === s ? "bg-brand-500 text-white" : "bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 text-dark-500 hover:border-brand-500"}`}>
            {s === "all" ? `All (${enquiries.length})` : `${s} (${enquiries.filter(e => e.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center py-12 text-dark-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="w-12 h-12 text-dark-300 mx-auto mb-3" />
          <p className="text-dark-400">No enquiries yet. They'll appear here when customers contact you.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enq) => (
            <div key={enq.id} className="p-5 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/20 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-dark-900 dark:text-white">{enq.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[enq.status] || statusColors.new}`}>
                      {enq.status || "new"}
                    </span>
                    <span className="text-xs text-dark-400">{new Date(enq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-dark-500 mb-3">
                    {enq.company && <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{enq.company}</span>}
                    {enq.email && <a href={`mailto:${enq.email}`} className="flex items-center gap-1 hover:text-brand-500"><Mail className="w-3.5 h-3.5" />{enq.email}</a>}
                    {enq.phone && <a href={`tel:${enq.phone}`} className="flex items-center gap-1 hover:text-brand-500"><Phone className="w-3.5 h-3.5" />{enq.phone}</a>}
                  </div>

                  {enq.message && <p className="text-sm text-dark-600 dark:text-dark-300 bg-dark-50 dark:bg-dark-800/50 rounded-xl p-3">{enq.message}</p>}
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <select value={enq.status || "new"} onChange={e => updateStatus(enq.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-xs text-dark-700 dark:text-dark-300 focus:outline-none focus:border-brand-500">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>

                  <div className="flex gap-1">
                    {enq.phone && (
                      <a href={`https://wa.me/91${enq.phone}?text=Hi ${enq.name}, thank you for your enquiry at Shiv Corporate Solutions.`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex-1 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-medium text-center hover:bg-[#1fb855] transition-colors">
                        WhatsApp
                      </a>
                    )}
                    {enq.phone && (
                      <a href={`tel:${enq.phone}`}
                        className="flex-1 py-1.5 rounded-xl bg-brand-500 text-white text-xs font-medium text-center hover:bg-brand-600 transition-colors">
                        Call
                      </a>
                    )}
                  </div>

                  <button onClick={() => handleDelete(enq.id)}
                    className="w-full py-1.5 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 text-xs font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
                    <Trash2 className="w-3 h-3" /> Delete
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