"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ui/animations";
import { WHATSAPP_NUMBER, PHONE_NUMBERS } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-brand-400/10 blur-[60px]"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-brand-500/10 blur-[80px]"
      />

      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
              Ready to Transform Your{" "}
              <span className="text-brand-300">Corporate Experience?</span>
            </h2>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">
              Get in touch for bulk orders, custom branding, and exclusive
              corporate deals. Our team is ready to help you find the perfect
              products for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-dark-900 font-semibold hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={getWhatsAppLink(
                  WHATSAPP_NUMBER,
                  "Hi, I want to enquire about bulk corporate orders."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1fb855] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href={`tel:${PHONE_NUMBERS[0]}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
