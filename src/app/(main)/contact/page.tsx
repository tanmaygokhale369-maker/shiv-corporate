"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Navigation } from "lucide-react";
import { SectionHeading, ScrollReveal } from "@/components/ui/animations";
import { PHONE_NUMBERS, EMAIL, ADDRESS, WHATSAPP_NUMBER } from "@/lib/constants";
import { getWhatsAppLink, isValidEmail, isValidPhone } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    setIsSubmitting(true);
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      await sb.from('enquiries').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.subject + (formData.message ? ': ' + formData.message : ''),
        status: 'new'
      });
      toast.success('Message sent! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch(e) {
      toast.error('Failed to send. Please WhatsApp us directly.');
    }
    setIsSubmitting(false);
  };

  const contactItems = [
    { icon: Phone, label: "Phone", value: "+91 " + PHONE_NUMBERS[0], href: "tel:" + PHONE_NUMBERS[0] },
    { icon: Phone, label: "Alternate", value: "+91 " + PHONE_NUMBERS[1], href: "tel:" + PHONE_NUMBERS[1] },
    { icon: Mail, label: "Email", value: EMAIL, href: "mailto:" + EMAIL },
    { icon: MapPin, label: "Office", value: ADDRESS, href: "https://www.google.com/maps/place/19.0160103,72.8519974" },
    { icon: Clock, label: "Hours", value: "Mon - Sat, 9 AM - 7 PM", href: "#" },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative py-20 bg-dark-50/50 dark:bg-dark-900/30 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="container-custom relative z-10">
          <SectionHeading
            badge="Contact Us"
            title="Lets Talk Business"
            subtitle="Have questions about bulk orders, custom branding, or our products? We would love to hear from you."
          />
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <ScrollReveal direction="left" className="lg:col-span-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Get in Touch</h3>
                <p className="text-dark-500 dark:text-dark-400">Reach out to us through any of these channels. We typically respond within 2 hours during business hours.</p>
                <div className="space-y-4">
                  {contactItems.map(function(item) {
                    return (
                      <a key={item.label} href={item.href} className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/30 transition-all group">
                        <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-brand-500" />
                        </div>
                        <div>
                          <p className="text-xs text-dark-400 uppercase tracking-wider">{item.label}</p>
                          <p className="text-sm font-medium text-dark-900 dark:text-white group-hover:text-brand-500 transition-colors">{item.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
                <a href={getWhatsAppLink(WHATSAPP_NUMBER, "Hi, I would like to enquire about your products and services.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1fb855] transition-colors shadow-lg">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-premium p-8">
                <h3 className="text-xl font-bold font-display text-dark-900 dark:text-white mb-6">Send us a Message</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Full Name</label>
                    <input type="text" value={formData.name} onChange={function(e) { setFormData({ ...formData, name: e.target.value }); }} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Email</label>
                    <input type="email" value={formData.email} onChange={function(e) { setFormData({ ...formData, email: e.target.value }); }} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Phone</label>
                    <input type="tel" value={formData.phone} onChange={function(e) { setFormData({ ...formData, phone: e.target.value }); }} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors" placeholder="10-digit number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Company</label>
                    <input type="text" value={formData.company} onChange={function(e) { setFormData({ ...formData, company: e.target.value }); }} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors" placeholder="Company name" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Subject</label>
                  <select value={formData.subject} onChange={function(e) { setFormData({ ...formData, subject: e.target.value }); }} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors">
                    <option value="">Select a topic</option>
                    <option value="bulk-order">Bulk Order Enquiry</option>
                    <option value="custom-branding">Custom Branding</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Message</label>
                  <textarea rows={5} value={formData.message} onChange={function(e) { setFormData({ ...formData, message: e.target.value }); }} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors resize-none" placeholder="Tell us about your requirements..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="mt-6 w-full btn-premium flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-5 h-5" />Send Message</span>
                  )}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="section-padding pt-0">
        <div className="container-custom">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-dark-200/50 dark:border-dark-700/50 shadow-xl">
              <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-dark-900 border-b border-dark-200/50 dark:border-dark-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-900 dark:text-white text-sm">Our Location</p>
                    <p className="text-xs text-dark-400">{ADDRESS}</p>
                  </div>
                </div>
                <a href="https://www.google.com/maps/dir/?api=1&destination=19.0160103,72.8519974" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d942.5!2d72.8519974!3d19.0160103!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAwJzU3LjYiTiA3MsKwNTEnMDcuMiJF!5e0!3m2!1sen!2sin!4v1715000000000"
                width="100%"
                height="450"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shiv Corporate Solutions Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

