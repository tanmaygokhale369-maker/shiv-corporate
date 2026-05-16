"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Shield, ArrowRight } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    // Demo admin credentials
    if (email === "admin@shivcorporate.com" && password === "admin123") {
      toast.success("Welcome to Admin Panel!");
      router.push("/admin");
    } else {
      toast.error("Invalid credentials. Try admin@shivcorporate.com / admin123");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow-lg mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-display text-white mb-1">
            Admin Panel
          </h1>
          <p className="text-dark-400 text-sm">{SITE_NAME} Management</p>
        </div>

        <div className="bg-dark-900/60 backdrop-blur-xl border border-dark-700/40 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500"
                  placeholder="admin@shivcorporate.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-premium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 rounded-xl bg-brand-500/10 border border-brand-500/20">
            <p className="text-xs text-brand-400 text-center">
              Demo: admin@shivcorporate.com / admin123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
