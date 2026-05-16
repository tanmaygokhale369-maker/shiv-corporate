"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  MessageSquare,
  Settings,
  Image as ImageIcon,
  BarChart3,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Bell,
  Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SITE_NAME } from "@/lib/constants";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Don't show admin layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-950 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-dark-200/50 dark:border-dark-800/50 bg-white dark:bg-dark-900">
        {/* Logo */}
        <div className="p-6 border-b border-dark-200/50 dark:border-dark-800/50">
          <Link href="/admin" className="flex flex-col items-center gap-2">
            <Image
              src="/logo.png"
              alt="Shiv Corporate Solutions Logo"
              width={140}
              height={50}
              className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
              priority
            />
            <p className="text-[10px] text-dark-400 uppercase tracking-wider font-medium">Admin Panel</p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-500/10 text-brand-500 shadow-sm"
                    : "text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800"
                }`}
              >
                <link.icon className="w-4.5 h-4.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-dark-200/50 dark:border-dark-800/50">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-dark-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4.5 h-4.5" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-dark-900 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-dark-200/50 dark:border-dark-800/50">
                <h2 className="font-bold font-display text-dark-900 dark:text-white">Admin</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5 text-dark-500" />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      pathname === link.href
                        ? "bg-brand-500/10 text-brand-500"
                        : "text-dark-500 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800"
                    }`}
                  >
                    <link.icon className="w-4.5 h-4.5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-dark-200/50 dark:border-dark-800/50">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center"
              >
                <Menu className="w-5 h-5 text-dark-600 dark:text-dark-300" />
              </button>

              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm text-dark-900 dark:text-white w-64 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="relative w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center">
                <Bell className="w-4.5 h-4.5 text-dark-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
