"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { ShoppingCart, Eye, X } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  processing: "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20",
  shipped: "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  delivered: "bg-green-500/10 text-green-600 border border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border border-red-500/20",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewOrder, setViewOrder] = useState<any | null>(null);

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success("Status updated!");
  }

  const filtered = orders
    .filter(o => filter === "all" || o.status === filter)
    .filter(o => !search || o.order_number?.toLowerCase().includes(search.toLowerCase()) || o.customer_name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Orders</h1>
        <p className="text-sm text-dark-500 mt-1">Manage customer orders and update statuses</p>
      </div>

      {/* Search */}
      <input type="text" placeholder="Search by order ID or customer..." value={search} onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 text-sm text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" />

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium capitalize transition-colors ${filter === s ? "bg-brand-500 text-white" : "bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 text-dark-500 hover:border-brand-500"}`}>
            {s === "all" ? `All (${orders.length})` : `${s} (${orders.filter(o => o.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-dark-200/50 dark:border-dark-700/50">
            <tr>
              {["Order ID", "Customer", "Items", "Total", "Payment", "Status", "Date", "Actions"].map(h => (
                <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-dark-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-200/30 dark:divide-dark-700/30">
            {loading ? (
              <tr><td colSpan={8} className="text-center py-12 text-dark-400">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-12 text-dark-400">
                <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-dark-300" />
                No orders yet.
              </td></tr>
            ) : filtered.map(order => (
              <tr key={order.id} className="hover:bg-dark-50/50 dark:hover:bg-dark-800/30 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-brand-500">{order.order_number}</td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-dark-900 dark:text-white">{order.customer_name}</p>
                  <p className="text-xs text-dark-400">{order.customer_email}</p>
                </td>
                <td className="px-5 py-4 text-sm text-dark-500">{order.items?.length || 0}</td>
                <td className="px-5 py-4 text-sm font-semibold text-dark-900 dark:text-white">₹{order.total?.toLocaleString()}</td>
                <td className="px-5 py-4 text-sm text-dark-500 capitalize">{order.payment_method}</td>
                <td className="px-5 py-4">
                  <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize border focus:outline-none cursor-pointer ${statusColors[order.status] || ""}`}>
                    {["pending","confirmed","processing","shipped","delivered","cancelled"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-4 text-xs text-dark-400">{new Date(order.created_at).toLocaleDateString("en-IN")}</td>
                <td className="px-5 py-4">
                  <button onClick={() => setViewOrder(order)}
                    className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center text-brand-500 hover:bg-brand-100 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white dark:bg-dark-900 rounded-2xl border border-dark-200 dark:border-dark-700 shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-dark-200 dark:border-dark-700">
              <h3 className="font-bold text-dark-900 dark:text-white">Order {viewOrder.order_number}</h3>
              <button onClick={() => setViewOrder(null)} className="w-8 h-8 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 flex items-center justify-center">
                <X className="w-4 h-4 text-dark-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-dark-400 text-xs mb-1">Customer</p><p className="font-medium text-dark-900 dark:text-white">{viewOrder.customer_name}</p></div>
                <div><p className="text-dark-400 text-xs mb-1">Email</p><p className="font-medium text-dark-900 dark:text-white">{viewOrder.customer_email}</p></div>
                <div><p className="text-dark-400 text-xs mb-1">Phone</p><p className="font-medium text-dark-900 dark:text-white">{viewOrder.customer_phone}</p></div>
                <div><p className="text-dark-400 text-xs mb-1">Payment</p><p className="font-medium text-dark-900 dark:text-white capitalize">{viewOrder.payment_method}</p></div>
                <div><p className="text-dark-400 text-xs mb-1">Total</p><p className="font-bold text-brand-500">₹{viewOrder.total?.toLocaleString()}</p></div>
                <div><p className="text-dark-400 text-xs mb-1">Status</p><span className={`px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${statusColors[viewOrder.status]}`}>{viewOrder.status}</span></div>
              </div>
              {viewOrder.items?.length > 0 && (
                <div>
                  <p className="text-xs text-dark-400 mb-2">Items</p>
                  <div className="space-y-2">
                    {viewOrder.items.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-dark-50 dark:bg-dark-800/50 text-sm">
                        <span className="text-dark-900 dark:text-white">{item.name}</span>
                        <span className="text-dark-500">x{item.quantity} — ₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}