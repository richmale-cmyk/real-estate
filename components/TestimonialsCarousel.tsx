"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "LuxProp found us the Malibu home we&apos;d been dreaming of for years. James understood exactly what we were looking for and never wasted our time with properties that weren&apos;t right. The entire experience felt effortlessly handled.",
    author: "Catherine & Robert Mills",
    role: "Purchased — Carbon Beach, Malibu",
    avatar: "https://picsum.photos/seed/testi1/120/120",
  },
  {
    id: 2,
    quote:
      "Selling our Manhattan penthouse through LuxProp was the right decision. Sophia managed every detail with incredible precision and achieved a price well above our expectations. We wouldn&apos;t use anyone else.",
    author: "David Wentworth",
    role: "Sold — Park Avenue Penthouse, NYC",
    avatar: "https://picsum.photos/seed/testi2/120/120",
  },
  {
    id: 3,
    quote:
      "From the first call to the day we received the keys, Marcus and the LuxProp team were nothing short of exceptional. They treated our purchase as if it were their own — with genuine care and relentless attention to detail.",
    author: "Priya & Alistair Thornton",
    role: "Purchased — Coconut Grove, Miami",
    avatar: "https://picsum.photos/seed/testi3/120/120",
  },
];

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const prev = () => {
    const idx = (activeIndex - 1 + testimonials.length) % testimonials.length;
    setDirection(-1);
    setActiveIndex(idx);
  };

  const next = () => {
    const idx = (activeIndex + 1) % testimonials.length;
    setDirection(1);
    setActiveIndex(idx);
  };

  const t = testimonials[activeIndex];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <span className="section-label mb-3 block">Client Voices</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark">
            What Our Clients <span className="text-primary">Say</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Quote icon */}
          <Quote
            size={64}
            className="text-accent/15 absolute -top-4 -left-4 lg:-left-10"
            strokeWidth={1}
          />

          {/* Testimonial */}
          <div className="relative overflow-hidden min-h-[220px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <blockquote className="text-xl md:text-2xl font-medium text-text-dark leading-relaxed text-center mb-10">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-text-dark text-sm">{t.author}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center border-2 border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-gray-200 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center border-2 border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
