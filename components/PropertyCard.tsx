"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize2, ArrowUpRight } from "lucide-react";
import type { Property } from "@/lib/supabase/types";
import { formatPrice, formatSqm } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const statusStyles: Record<Property["status"], string> = {
  "For Sale": "bg-primary text-white",
  New: "bg-accent text-white",
  Sold: "bg-gray-500 text-white",
};

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/property/${property.id}`} className="group block">
        <div className="relative overflow-hidden bg-bg-subtle">
          {/* Image container */}
          <div className="relative h-64 md:h-72 overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAIhAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFERIhQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AoF9v8G4GkzWkLQygrSA2ZDIPrXhXp9qe1dZjyE+mOQ6hKUJHgAfkAVQpSlAz/9k="
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 ${statusStyles[property.status]}`}>
                {property.status}
              </span>
            </div>

            {/* Hover overlay CTA */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="flex items-center gap-2 bg-white text-primary text-sm font-bold px-5 py-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                View Property <ArrowUpRight size={14} />
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="p-5 bg-white border border-gray-100 group-hover:border-accent/30 transition-colors duration-300">
            {/* Price */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl font-extrabold text-primary tracking-tight">
                {formatPrice(property.price)}
              </span>
              <span className="text-xs text-text-muted font-medium bg-bg-subtle px-2 py-1">
                {property.type}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-text-dark mb-1 group-hover:text-primary transition-colors duration-200 leading-snug">
              {property.title}
            </h3>

            {/* Address */}
            <p className="text-xs text-text-muted mb-4 truncate">
              {property.address}, {property.suburb}, {property.city}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
                <Bed size={13} className="text-accent" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
                <Bath size={13} className="text-accent" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
                <Maximize2 size={13} className="text-accent" />
                <span>{formatSqm(property.sqm)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
