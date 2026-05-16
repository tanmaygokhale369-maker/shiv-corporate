"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { SectionHeading } from "@/components/ui/animations";

const faqs = [
  {
    question: "What types of products does Shiv Corporate offer?",
    answer: "We offer a wide range of products including housekeeping supplies, corporate gifts, office utility products, promotional merchandise, combo kits, and custom branded items for businesses across India.",
  },
  {
    question: "Do you offer bulk pricing and corporate discounts?",
    answer: "Yes! We specialize in bulk orders and offer competitive wholesale pricing. The more you order, the better the rates. Contact us for a customized quote based on your requirements.",
  },
  {
    question: "Can you customize products with our company logo?",
    answer: "Absolutely! We offer custom branding and logo printing on most products including pens, bottles, diaries, USB drives, bags, and more. Minimum order quantities may apply for customization.",
  },
  {
    question: "What are the payment options available?",
    answer: "We accept payments via Razorpay (credit/debit cards, netbanking, UPI), direct UPI transfers, and Cash on Delivery (COD) for eligible orders. For bulk orders, we also offer flexible payment terms.",
  },
  {
    question: "Do you deliver across India?",
    answer: "Yes, we deliver to all states and union territories across India. Shipping charges vary by location, and orders above ₹999 qualify for free shipping. Bulk orders may have special shipping arrangements.",
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We offer a hassle-free return and exchange policy within 7 days of delivery. Products must be unused and in original packaging. Custom branded products are non-returnable unless defective.",
  },
  {
    question: "How can I place a bulk order?",
    answer: "You can place bulk orders directly on our website, via WhatsApp, or by contacting us at 9930469954. Our team will provide you with competitive bulk pricing and delivery timelines.",
  },
  {
    question: "What is the estimated delivery time?",
    answer: "Standard orders are delivered within 5-7 business days. Express delivery options are available in select cities. Bulk and custom orders may take 10-15 business days depending on quantity and customization.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to the most common questions about our products and services."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-2xl border border-dark-200/50 dark:border-dark-700/50 overflow-hidden bg-white dark:bg-dark-900/40"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left hover:bg-dark-50 dark:hover:bg-dark-800/30 transition-colors"
              >
                <span className="text-sm font-semibold text-dark-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-brand-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-dark-400" />
                  )}
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-dark-500 dark:text-dark-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
