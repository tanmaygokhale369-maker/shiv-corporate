"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/animations";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    company: "TechVista Solutions Pvt. Ltd.",
    content: "Shiv Corporate has been our trusted partner for corporate gifting for over 3 years. The quality of products and timely delivery is exceptional. Highly recommended for bulk corporate orders!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Mehta",
    company: "Sunrise Hospitality Group",
    content: "We source all our housekeeping products from Shiv Corporate. Their product range is extensive, pricing is competitive, and the customer service is top-notch. A pleasure to work with!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "InnovateTech India",
    content: "The promotional products we ordered were delivered on time and the custom branding was flawless. Our clients loved the gifts. Will definitely order again for our next event.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    company: "GreenLeaf Facility Management",
    content: "Best housekeeping supplies vendor we have worked with. Quality products at competitive prices. Their combo kits save us a lot of time and money. Excellent service!",
    rating: 4,
  },
  {
    id: 5,
    name: "Vikram Singh",
    company: "Atlas Manufacturing Co.",
    content: "Ordered office utility products in bulk and was impressed by the quality and packaging. The team is very responsive and handles bulk orders efficiently. Great experience!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (i) => (i - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="section-padding relative bg-dark-50/50 dark:bg-dark-900/30 overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by businesses across India for quality corporate products and exceptional service."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-premium p-8 md:p-12"
            >
              <Quote className="w-10 h-10 text-brand-500/20 mb-6" />
              <p className="text-lg md:text-xl text-dark-700 dark:text-dark-300 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonials[currentIndex].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-dark-300 dark:text-dark-600"
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="text-lg font-bold font-display text-dark-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    {testimonials[currentIndex].company}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center hover:border-brand-500 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-dark-600 dark:text-dark-300" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center hover:border-brand-500 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-dark-600 dark:text-dark-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-8 bg-brand-500"
                    : "bg-dark-300 dark:bg-dark-600 hover:bg-brand-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
