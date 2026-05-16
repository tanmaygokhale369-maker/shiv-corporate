"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, IndianRupee, Headphones, Package, Zap } from "lucide-react";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/components/ui/animations";

const features = [
  {
    icon: IndianRupee,
    title: "Best Bulk Pricing",
    description: "Competitive wholesale prices for corporate bulk orders. The more you order, the more you save.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Fast and reliable delivery across all states in India. Track your orders in real-time.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Every product is quality-checked and comes with our trust guarantee. Premium products only.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 customer support via WhatsApp, call, and email. We are always here for you.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Package,
    title: "Custom Branding",
    description: "Personalize products with your company logo and branding for corporate gifting.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Quick Processing",
    description: "Orders processed within 24 hours. Rush delivery available for urgent requirements.",
    gradient: "from-indigo-500 to-blue-500",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-400/5 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Why Choose Us"
          title="Built for Businesses Like Yours"
          subtitle="We understand what businesses need. That's why thousands of companies trust us for their corporate and housekeeping needs."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-6 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/30 transition-all duration-300 hover:shadow-premium"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
