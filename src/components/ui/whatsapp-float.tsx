"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_NUMBER, PHONE_NUMBERS } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

export function WhatsAppFloat() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-dark-200 dark:border-dark-700 p-5 w-72 mb-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-dark-900 dark:text-white text-sm">
                Chat with us
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-dark-400 hover:text-dark-600 dark:hover:text-dark-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-dark-500 dark:text-dark-400 mb-4">
              Hi! 👋 How can we help you? Chat with us on WhatsApp or call us
              directly.
            </p>
            <div className="space-y-2">
              <a
                href={getWhatsAppLink(
                  WHATSAPP_NUMBER,
                  "Hi, I am interested in your products. Can you help me?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#1fb855] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${PHONE_NUMBERS[0]}`}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        style={{
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        }}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}
