"use client";

import { motion } from "framer-motion";
import { Users, Award, Globe, Heart, Target, Lightbulb } from "lucide-react";
import { SectionHeading, ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { CTASection } from "@/components/home/cta-section";
import { SITE_FULL_NAME } from "@/lib/constants";

const stats = [
  { value: "500+", label: "Products" },
  { value: "1000+", label: "Happy Clients" },
  { value: "50+", label: "Cities Served" },
  { value: "5+", label: "Years Experience" },
];

const values = [
  { icon: Target, title: "Quality First", description: "We never compromise on the quality of our products. Every item goes through rigorous quality checks." },
  { icon: Users, title: "Customer Focused", description: "Our customers are at the heart of everything we do. We build long-lasting business relationships." },
  { icon: Lightbulb, title: "Innovation", description: "We constantly update our product range to bring you the latest in corporate gifting and utility." },
  { icon: Award, title: "Trust & Reliability", description: "Built on a foundation of trust. We deliver what we promise, every single time." },
  { icon: Globe, title: "Pan-India Reach", description: "Serving businesses across every state in India with efficient delivery and support." },
  { icon: Heart, title: "Passion for Service", description: "We are passionate about helping businesses create great impressions with quality products." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-20 bg-dark-50/50 dark:bg-dark-900/30 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="container-custom relative z-10">
          <SectionHeading
            badge="About Us"
            title="Building Premium Corporate Experiences"
            subtitle={`${SITE_FULL_NAME} is India's trusted partner for premium corporate gifts, housekeeping products, and office supplies.`}
          />
        </div>
      </div>

      {/* Story */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[4/3] rounded-2xl bg-white border border-brand-500/20 flex items-center justify-center p-8">
                <img src="/logo.png" alt="Shiv Corporate Solutions" className="w-full h-full object-contain drop-shadow-xl" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold uppercase tracking-wider mb-4">
                  Our Story
                </span>
                <h3 className="text-3xl font-bold font-display text-dark-900 dark:text-white mb-6">
                  From Vision to India&apos;s Trusted Corporate Partner
                </h3>
                <div className="space-y-4 text-dark-600 dark:text-dark-400 leading-relaxed">
                  <p>
                    Founded with a vision to provide premium quality corporate products at competitive prices,
                    {SITE_FULL_NAME} has grown to become one of India&apos;s most trusted suppliers of corporate gifts,
                    housekeeping products, and office utilities.
                  </p>
                  <p>
                    We understand that every business has unique needs. Whether you&apos;re looking for custom-branded
                    corporate gifts for your clients, reliable housekeeping supplies for your facility, or innovative
                    office products, we have you covered.
                  </p>
                  <p>
                    With a product catalog of 500+ items, competitive bulk pricing, and pan-India delivery,
                    we make it easy for businesses of all sizes to access quality products that leave a lasting impression.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-dark-50/50 dark:bg-dark-900/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 glass-card"
              >
                <span className="text-3xl md:text-4xl font-bold font-display gradient-text">
                  {stat.value}
                </span>
                <p className="text-sm text-dark-500 dark:text-dark-400 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-padding">
        <div className="container-custom">
          <SectionHeading
            badge="Our Values"
            title="What Drives Us Forward"
            subtitle="Our core values define who we are and how we serve businesses across India."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/30 hover:shadow-premium transition-all duration-300"
                >
                  <value.icon className="w-10 h-10 text-brand-500 mb-4" />
                  <h4 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

