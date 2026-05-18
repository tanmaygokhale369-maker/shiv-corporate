"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Package } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-white dark:bg-dark-950">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/10 dark:bg-brand-500/5 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-400/10 dark:bg-brand-400/5 blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-600/5 dark:bg-brand-600/3 blur-[150px]" />

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3366ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#3366ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3366ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${20 + i * 15}%`}
              y1="0"
              x2={`${30 + i * 15}%`}
              y2="100%"
              stroke="url(#lineGrad)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatType: "loop" }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-500/10 dark:bg-brand-500/10 border border-brand-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Premium Corporate Solutions
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight text-dark-900 dark:text-white mb-6"
          >
            Elevate Your{" "}
            <span className="gradient-text">Corporate</span>
            <br />
            Identity & Space
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-dark-500 dark:text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {SITE_NAME} delivers premium corporate gifts, housekeeping products,
            and office essentials. Transform your workspace with quality products
            trusted by businesses across India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/products" className="btn-premium text-base">
              Explore Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="btn-secondary text-base">
              Request Quote
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { icon: Package, value: "500+", label: "Products" },
              { icon: ShieldCheck, value: "100%", label: "Quality Assured" },
              { icon: Truck, value: "All Over Maharashtra", label: "Delivery" },
              { icon: Sparkles, value: "1000+", label: "Happy Clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                className="glass-card p-4 md:p-5 flex flex-col items-center gap-2 hover:shadow-glow transition-shadow cursor-default"
              >
                <stat.icon className="w-5 h-5 text-brand-500" />
                <span className="text-2xl md:text-3xl font-bold font-display text-dark-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-dark-500 dark:text-dark-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-dark-950 to-transparent z-10" />
    </section>
  );
}




