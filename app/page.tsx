import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import StatsCounter from "@/components/StatsCounter";
import { featuredProperties } from "@/lib/data";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export const metadata: Metadata = {
  title: "LuxProp — Exceptional Properties, Exceptional Lives",
  description:
    "Discover the world's finest residential properties. From Malibu cliffsides to Manhattan penthouses.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats bar */}
      <StatsCounter />

      {/* Featured listings */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-wide">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="section-label mb-3 block">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark">
                Featured<br />
                <span className="text-primary">Properties</span>
              </h2>
            </div>
            <Link href="/properties" className="btn-outline self-start md:self-auto flex items-center gap-2 group">
              View All Listings
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProperties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed editorial section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container-wide grid lg:grid-cols-2 items-center gap-0">
          {/* Text */}
          <div className="py-20 lg:py-28 lg:pr-16">
            <span className="section-label mb-4 block text-accent">Our Approach</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              More Than a<br />Transaction
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              We believe that finding your next home is one of life&apos;s most significant moments. That&apos;s why every client receives the undivided attention of a dedicated agent — from the first conversation to the final handshake.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="btn-accent group">
                Our Story
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-sm tracking-wide hover:border-white transition-colors duration-300">
                Meet the Team
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-72 lg:h-full lg:min-h-[520px]">
            <Image
              src="https://picsum.photos/seed/editorial001/900/700"
              alt="Luxury home interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIBAAAQQBBQEAAAAAAAAAAAAAAQIDBAUREiExQf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCi3ue5VnXfHWmkpQ2hzpSEpAAAHQBIAHwBSlAz/9k="
            />
            <div className="absolute inset-0 bg-primary/30" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* CTA section */}
      <section className="py-20 lg:py-28 bg-bg-subtle">
        <div className="container-narrow text-center">
          <span className="section-label mb-4 block">Ready to Begin?</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-dark mb-6 text-balance">
            Find Your Perfect
            <span className="text-primary"> Address</span>
          </h2>
          <p className="text-text-muted text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you&apos;re searching for a primary residence, a vacation retreat, or an investment property, our agents are ready to guide you to the right home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="btn-primary group">
              Browse All Properties
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact an Agent
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
