"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Heart,
  Phone,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCartStore } from "@/store/cart";
import { SITE_NAME, PHONE_NUMBERS } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/products",
    label: "Products",
    children: [
      { href: "/products?category=housekeeping", label: "Housekeeping" },
      { href: "/products?category=corporate-gifts", label: "Corporate Gifts" },
      { href: "/products?category=office-products", label: "Office Products" },
      { href: "/products?category=combo-kits", label: "Combo Kits" },
      { href: "/products?category=utility-products", label: "Utility Products" },
      { href: "/products?category=promotional", label: "Promotional Products" },
    ],
  },
  { href: "/categories", label: "Categories" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-dark-950 dark:bg-dark-950 text-dark-300 text-xs py-2 border-b border-dark-800/50">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${PHONE_NUMBERS[0]}`}
              className="flex items-center gap-1.5 hover:text-brand-400 transition-colors"
            >
              <Phone className="w-3 h-3" />
              +91 {PHONE_NUMBERS[0]}
            </a>
            <span className="text-dark-600">|</span>
            <a
              href={`tel:${PHONE_NUMBERS[1]}`}
              className="hover:text-brand-400 transition-colors"
            >
              +91 {PHONE_NUMBERS[1]}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span> All Over Maharashtra Delivery</span>
            <span className="text-dark-600">|</span>
            <span>Bulk Orders Welcome</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-dark-950/80 backdrop-blur-2xl shadow-lg border-b border-dark-200/20 dark:border-dark-700/20"
            : "bg-white/50 dark:bg-dark-950/50 backdrop-blur-md"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="Shiv Corporate Solutions Logo"
                width={160}
                height={60}
                className="h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? "text-brand-500 bg-brand-50 dark:bg-brand-950/30"
                        : "text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white hover:bg-dark-50 dark:hover:bg-dark-800/50"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 py-2 rounded-xl bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700 shadow-xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-dark-600 dark:text-dark-300 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/search"
                className="hidden sm:flex w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 items-center justify-center hover:border-brand-500 dark:hover:border-brand-400 transition-colors"
              >
                <Search className="w-4.5 h-4.5 text-dark-500 dark:text-dark-400" />
              </Link>

              <Link
                href="/wishlist"
                className="hidden sm:flex w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 items-center justify-center hover:border-brand-500 dark:hover:border-brand-400 transition-colors"
              >
                <Heart className="w-4.5 h-4.5 text-dark-500 dark:text-dark-400" />
              </Link>

              <ThemeToggle />

              <button
                onClick={openCart}
                className="relative w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center hover:border-brand-500 dark:hover:border-brand-400 transition-colors"
              >
                <ShoppingCart className="w-4.5 h-4.5 text-dark-500 dark:text-dark-400" />
                {totalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {totalItems()}
                  </motion.span>
                )}
              </button>

              <Link
                href="/login"
                className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-500 text-white items-center justify-center hover:bg-brand-600 transition-colors shadow-glow"
              >
                <User className="w-4.5 h-4.5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-dark-600 dark:text-dark-300" />
                ) : (
                  <Menu className="w-5 h-5 text-dark-600 dark:text-dark-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[calc(4rem+1px)] left-0 right-0 z-40 bg-white dark:bg-dark-950 border-b border-dark-200 dark:border-dark-700 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "text-brand-500 bg-brand-50 dark:bg-brand-950/30"
                        : "text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-dark-400 hover:text-brand-500 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-dark-200 dark:border-dark-700 flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 btn-premium text-center text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/search"
                  className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center"
                >
                  <Search className="w-5 h-5 text-dark-500" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


