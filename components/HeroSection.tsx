"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const headline = ["Exceptional", "Properties.", "Exceptional", "Lives."];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-stretch overflow-hidden">
      {/* Left — image */}
      <div className="hidden lg:block lg:w-1/2 xl:w-[55%] relative">
        <Image
          src="https://picsum.photos/seed/hero001/1400/900"
          alt="Luxury property exterior"
          fill
          priority
          sizes="55vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIBAAAQQBBQEAAAAAAAAAAAAAAQIDBAUREiExQf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCi3ue5VnXfHWmkpQ2hzpSEpAAAHQBIAHwBSlAz/9k="
        />
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />

        {/* Floating stat card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-16 left-8 bg-white p-6 shadow-2xl"
        >
          <p className="text-3xl font-extrabold text-primary">$2.4B+</p>
          <p className="text-xs font-semibold tracking-wide text-text-muted mt-1">
            Properties Transacted
          </p>
        </motion.div>
      </div>

      {/* Right — content */}
      <div className="w-full lg:w-1/2 xl:w-[45%] bg-primary flex items-center relative">
        {/* Mobile background */}
        <div className="lg:hidden absolute inset-0">
          <Image
            src="https://picsum.photos/seed/hero001/800/600"
            alt="Luxury property"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>

        <div className="relative z-10 px-8 md:px-12 xl:px-16 py-32 lg:py-0 max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase text-accent">
              <span className="w-8 h-px bg-accent" />
              Est. 2008 — Award-Winning Brokerage
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] mb-8">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-md"
          >
            We represent the world&apos;s most extraordinary residential properties — from Malibu cliffsides to Manhattan penthouses and Aspen estates.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/properties" className="btn-accent group">
              Explore Properties
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-sm tracking-wide hover:border-white transition-colors duration-300">
              Speak to an Agent
            </Link>
          </motion.div>

          {/* Bottom marquee line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-16 pt-8 border-t border-white/10 flex gap-10 overflow-hidden"
          >
            {["Los Angeles", "New York", "Miami", "Aspen", "Palm Beach"].map((city) => (
              <span key={city} className="text-xs font-semibold tracking-widest uppercase text-white/30 whitespace-nowrap">
                {city}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-[27%] flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-white/40"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
