"use client";

import { useState } from "react";
import { Save, Phone, Mail, MapPin, Globe, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    whatsapp: "919930469954",
    phone1: "9930469954",
    phone2: "8591639892",
    email: "shivcorporate93@gmail.com",
    address: "Mumbai, Maharashtra, India",
    about: "Shiv Corporate Solution is India's trusted partner for premium corporate gifts, housekeeping products, and office supplies.",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    upiId: "suresh.patel11244@okicici",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Settings</h1>
        <p className="text-sm text-dark-500 mt-1">Manage website settings and contact information</p>
      </div>

      {/* Contact Info */}
      <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
        <h3 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-brand-500" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">WhatsApp Number</label>
            <input type="text" value={settings.whatsapp} onChange={(e) => setSettings({...settings, whatsapp: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Phone 1</label>
            <input type="text" value={settings.phone1} onChange={(e) => setSettings({...settings, phone1: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Phone 2</label>
            <input type="text" value={settings.phone2} onChange={(e) => setSettings({...settings, phone2: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Email</label>
            <input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Address</label>
            <input type="text" value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white" />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
        <h3 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-4">
          💳 Payment Settings
        </h3>
        <div>
          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">UPI ID</label>
          <input type="text" value={settings.upiId} onChange={(e) => setSettings({...settings, upiId: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white" />
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
        <h3 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-500" />
          Social Media Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: "facebook" as const, label: "Facebook" },
            { key: "instagram" as const, label: "Instagram" },
            { key: "twitter" as const, label: "Twitter / X" },
            { key: "linkedin" as const, label: "LinkedIn" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">{label}</label>
              <input type="url" value={settings[key]} onChange={(e) => setSettings({...settings, [key]: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 text-dark-900 dark:text-white" placeholder={`https://${key}.com/...`} />
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 p-6">
        <h3 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-4">
          📝 About Text
        </h3>
        <textarea rows={4} value={settings.about} onChange={(e) => setSettings({...settings, about: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm focus:outline-none focus:border-brand-500 resize-none text-dark-900 dark:text-white" />
      </div>

      <button onClick={handleSave} className="btn-premium flex items-center gap-2">
        <Save className="w-4 h-4" />
        Save Settings
      </button>
    </div>
  );
}
