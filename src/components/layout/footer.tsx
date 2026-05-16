"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, Heart } from "lucide-react";
import { SITE_FULL_NAME, PHONE_NUMBERS, EMAIL, ADDRESS } from "@/lib/constants";

const footerLinks = {
  products: [
    { label: "Housekeeping Products", href: "/products?category=housekeeping" },
    { label: "Corporate Gifts", href: "/products?category=corporate-gifts" },
    { label: "Office Products", href: "/products?category=office-products" },
    { label: "Combo Kits", href: "/products?category=combo-kits" },
    { label: "Promotional Products", href: "/products?category=promotional" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
    { label: "Bulk Orders", href: "/contact" },
  ],
  support: [
    { label: "Track Order", href: "/dashboard" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Return Policy", href: "/return-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-dark-950 text-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <div className="border-b border-dark-800/50">
        <div className="container-custom py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold font-display mb-2">Stay Updated</h3>
              <p className="text-dark-400 text-sm">Get the latest products, offers, and corporate deals delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 md:w-72 px-5 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500 transition-colors" />
              <button className="btn-premium whitespace-nowrap">Subscribe <ArrowRight className="w-4 h-4 ml-2" /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-xl p-3 inline-flex shadow-lg">
                <Image src="/logo.png" alt="Shiv Corporate Solutions Logo" width={160} height={56} className="h-16 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6 max-w-sm">{SITE_FULL_NAME} is your trusted partner for premium corporate gifts, housekeeping products, and office utilities. Delivering quality across India with trusted service.</p>
            <div className="space-y-3">
              <a href={`tel:${PHONE_NUMBERS[0]}`} className="flex items-center gap-3 text-sm text-dark-400 hover:text-brand-400 transition-colors"><Phone className="w-4 h-4" />+91 {PHONE_NUMBERS[0]}</a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm text-dark-400 hover:text-brand-400 transition-colors"><Mail className="w-4 h-4" />{EMAIL}</a>
              <div className="flex items-start gap-3 text-sm text-dark-400"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{ADDRESS}</div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-dark-400 hover:text-brand-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-dark-400 hover:text-brand-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-dark-400 hover:text-brand-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-dark-800/50">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">© {new Date().getFullYear()} {SITE_FULL_NAME}. All rights reserved.</p>
          <p className="text-xs text-dark-500 flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in India</p>
        </div>
      </div>
    </footer>
  );
}
