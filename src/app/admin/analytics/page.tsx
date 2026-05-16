"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { TrendingUp, Package, MessageSquare, ShoppingCart, IndianRupee, Users } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    totalProducts: 0,
    totalEnquiries: 0,
    categoryStats: [] as any[],
    recentEnquiries: [] as any[],
    ordersByStatus: {} as Record<string, number>,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAnalytics(); }, []);

  async function fetchAnalytics() {
    setLoading(true);

    const [
      { data: orders },
      { count: productCount },
      { count: enquiryCount },
      { data: products },
      { data: enquiries },
    ] = await Promise.all([
      supabase.from("orders").select("*"),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }),
      supabase.from("products").select("category"),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    const allOrders = orders || [];
    const totalRevenue = allOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
    const avgOrderValue = allOrders.length ? Math.round(totalRevenue / allOrders.length) : 0;

    // orders by status
    const ordersByStatus: Record<string, number> = {};
    allOrders.forEach((o: any) => {
      ordersByStatus[o.status] = (ordersByStatus[o.status] || 0) + 1;
    });

    // category stats from products
    const catCounts: Record<string, number> = {};
    (products || []).forEach((p: any) => {
      const cat = p.category?.replace(/-/g, " ") || "Other";
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    });
    const total = Object.values(catCounts).reduce((a, b) => a + b, 0) || 1;
    const categoryStats = Object.entries(catCounts).map(([name, count]) => ({
      name,
      count,
      pct: Math.round((count / total) * 100),
    })).sort((a, b) => b.count - a.count);

    setData({
      totalRevenue,
      totalOrders: allOrders.length,
      avgOrderValue,
      totalProducts: productCount || 0,
      totalEnquiries: enquiryCount || 0,
      categoryStats,
      recentEnquiries: enquiries || [],
      ordersByStatus,
    });
    setLoading(false);
  }

  const statCards = [
    { label: "Total Revenue", value: `₹${data.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "from-green-500 to-emerald-500" },
    { label: "Total Orders", value: data.totalOrders, icon: ShoppingCart, color: "from-blue-500 to-cyan-500" },
    { label: "Avg Order Value", value: `₹${data.avgOrderValue.toLocaleString()}`, icon: TrendingUp, color: "from-purple-500 to-violet-500" },
    { label: "Total Products", value: data.totalProducts, icon: Package, color: "from-orange-500 to-amber-500" },
    { label: "Total Enquiries", value: data.totalEnquiries, icon: MessageSquare, color: "from-pink-500 to-rose-500" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500",
    confirmed: "bg-blue-500",
    processing: "bg-indigo-500",
    shipped: "bg-purple-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  const enquiryStatusColors: Record<string, string> = {
    new: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
    contacted: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
    resolved: "bg-green-500/10 text-green-600 border border-green-500/20",
    closed: "bg-dark-500/10 text-dark-400 border border-dark-500/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-dark-500 mt-1">Business performance overview — live from Supabase</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-display text-dark-900 dark:text-white">
              {loading ? "..." : s.value}
            </p>
            <p className="text-xs text-dark-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
          <h3 className="font-bold font-display text-dark-900 dark:text-white mb-5">Products by Category</h3>
          {loading ? (
            <p className="text-center py-8 text-dark-400">Loading...</p>
          ) : data.categoryStats.length === 0 ? (
            <p className="text-center py-8 text-dark-400">No products yet.</p>
          ) : (
            <div className="space-y-4">
              {data.categoryStats.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-dark-700 dark:text-dark-300 capitalize">{cat.name}</span>
                    <span className="text-dark-400">{cat.count} products ({cat.pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-dark-100 dark:bg-dark-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-700"
                      style={{ width: `${cat.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders by Status */}
        <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
          <h3 className="font-bold font-display text-dark-900 dark:text-white mb-5">Orders by Status</h3>
          {loading ? (
            <p className="text-center py-8 text-dark-400">Loading...</p>
          ) : Object.keys(data.ordersByStatus).length === 0 ? (
            <p className="text-center py-8 text-dark-400">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(data.ordersByStatus).map(([status, count]) => {
                const total = Object.values(data.ordersByStatus).reduce((a, b) => a + b, 0) || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium text-dark-700 dark:text-dark-300 capitalize">{status}</span>
                      <span className="text-dark-400">{count} orders ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-dark-100 dark:bg-dark-800 overflow-hidden">
                      <div className={`h-full rounded-full ${statusColors[status] || "bg-brand-500"} transition-all duration-700`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold font-display text-dark-900 dark:text-white">Recent Enquiries</h3>
          <a href="/admin/enquiries" className="text-xs text-brand-500 hover:text-brand-600 font-medium">View All →</a>
        </div>
        {loading ? (
          <p className="text-center py-8 text-dark-400">Loading...</p>
        ) : data.recentEnquiries.length === 0 ? (
          <p className="text-center py-8 text-dark-400">No enquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {data.recentEnquiries.map((enq) => (
              <div key={enq.id} className="flex items-center justify-between p-4 rounded-xl bg-dark-50 dark:bg-dark-800/50">
                <div>
                  <p className="text-sm font-medium text-dark-900 dark:text-white">{enq.name}</p>
                  <p className="text-xs text-dark-400">{enq.company} · {enq.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${enquiryStatusColors[enq.status] || enquiryStatusColors.new}`}>
                    {enq.status || "new"}
                  </span>
                  <span className="text-xs text-dark-400">{new Date(enq.created_at).toLocaleDateString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}