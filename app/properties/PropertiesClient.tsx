"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import type { Property, PropertyType, PropertyStatus } from "@/lib/supabase/types";

const propertyTypes: PropertyType[] = ["House", "Apartment", "Villa", "Land"];
const statusOptions: PropertyStatus[] = ["For Sale", "New", "Sold"];
const bedroomOptions = [1, 2, 3, 4, 5];

interface Filters {
  priceMin: number;
  priceMax: number;
  types: PropertyType[];
  statuses: PropertyStatus[];
  bedrooms: number | null;
}

const defaultFilters: Filters = {
  priceMin: 0,
  priceMax: 20_000_000,
  types: [],
  statuses: [],
  bedrooms: null,
};

interface Props {
  properties: Property[];
}

export default function PropertiesClient({ properties }: Props) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest">("newest");

  const toggleType = (type: PropertyType) => {
    setFilters((f) => ({
      ...f,
      types: f.types.includes(type) ? f.types.filter((t) => t !== type) : [...f.types, type],
    }));
  };

  const toggleStatus = (status: PropertyStatus) => {
    setFilters((f) => ({
      ...f,
      statuses: f.statuses.includes(status)
        ? f.statuses.filter((s) => s !== status)
        : [...f.statuses, status],
    }));
  };

  const clearFilters = () => setFilters(defaultFilters);

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.statuses.length > 0 ||
    filters.bedrooms !== null ||
    filters.priceMin > 0 ||
    filters.priceMax < 20_000_000;

  const filtered = useMemo(() => {
    let result = [...properties];
    if (filters.types.length > 0) result = result.filter((p) => filters.types.includes(p.type));
    if (filters.statuses.length > 0) result = result.filter((p) => filters.statuses.includes(p.status));
    if (filters.bedrooms !== null) result = result.filter((p) => p.bedrooms >= filters.bedrooms!);
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [filters, sortBy, properties]);

  const SidebarContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-text-dark mb-4">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-text-muted mb-1 block">Min Price</label>
            <select value={filters.priceMin} onChange={(e) => setFilters((f) => ({ ...f, priceMin: Number(e.target.value) }))} className="input-field text-sm">
              <option value={0}>No minimum</option>
              <option value={1_000_000}>$1M+</option>
              <option value={3_000_000}>$3M+</option>
              <option value={5_000_000}>$5M+</option>
              <option value={8_000_000}>$8M+</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-text-muted mb-1 block">Max Price</label>
            <select value={filters.priceMax} onChange={(e) => setFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))} className="input-field text-sm">
              <option value={20_000_000}>No maximum</option>
              <option value={5_000_000}>Up to $5M</option>
              <option value={8_000_000}>Up to $8M</option>
              <option value={10_000_000}>Up to $10M</option>
              <option value={15_000_000}>Up to $15M</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-text-dark mb-4">Property Type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={filters.types.includes(type)} onChange={() => toggleType(type)} className="w-4 h-4 accent-primary" />
              <span className="text-sm text-text-dark group-hover:text-primary transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-text-dark mb-4">Status</h3>
        <div className="space-y-2">
          {statusOptions.map((status) => (
            <label key={status} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={filters.statuses.includes(status)} onChange={() => toggleStatus(status)} className="w-4 h-4 accent-primary" />
              <span className="text-sm text-text-dark group-hover:text-primary transition-colors">{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-text-dark mb-4">Minimum Bedrooms</h3>
        <div className="flex gap-2 flex-wrap">
          {bedroomOptions.map((n) => (
            <button key={n} onClick={() => setFilters((f) => ({ ...f, bedrooms: f.bedrooms === n ? null : n }))}
              className={`w-10 h-10 text-sm font-semibold transition-all duration-200 ${filters.bedrooms === n ? "bg-primary text-white" : "border border-gray-200 text-text-muted hover:border-primary hover:text-primary"}`}>
              {n}+
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-primary transition-colors">
          <X size={14} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-primary pt-40 pb-16">
        <div className="container-wide">
          <span className="section-label text-accent mb-3 block">All Properties</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Browse Listings</h1>
          <p className="text-white/60 text-base max-w-xl">
            {properties.length} exceptional properties across the world&apos;s most desirable addresses.
          </p>
        </div>
      </div>

      <div className="container-wide py-12">
        <div className="flex gap-8 lg:gap-12">
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-28 bg-white border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-bold text-text-dark mb-6 pb-4 border-b border-gray-100">Filter Properties</h2>
              <SidebarContent />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <p className="text-sm text-text-muted">
                <span className="font-bold text-text-dark">{filtered.length}</span> properties found
              </p>
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-semibold text-text-dark border border-gray-200 px-4 py-2 hover:border-primary hover:text-primary transition-colors">
                  <SlidersHorizontal size={14} /> Filters
                  {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-accent" />}
                </button>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm font-medium border border-gray-200 px-3 py-2 focus:outline-none focus:border-primary bg-white cursor-pointer">
                  <option value="newest">Newest First</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.types.map((t) => (
                  <button key={t} onClick={() => toggleType(t)} className="flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 hover:bg-primary/20 transition-colors">
                    {t} <X size={11} />
                  </button>
                ))}
                {filters.statuses.map((s) => (
                  <button key={s} onClick={() => toggleStatus(s)} className="flex items-center gap-1.5 text-xs font-semibold bg-accent/10 text-accent px-3 py-1.5 hover:bg-accent/20 transition-colors">
                    {s} <X size={11} />
                  </button>
                ))}
                {filters.bedrooms !== null && (
                  <button onClick={() => setFilters((f) => ({ ...f, bedrooms: null }))} className="flex items-center gap-1.5 text-xs font-semibold bg-gray-100 text-text-muted px-3 py-1.5 hover:bg-gray-200 transition-colors">
                    {filters.bedrooms}+ beds <X size={11} />
                  </button>
                )}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-text-muted text-lg font-medium mb-2">No properties match your filters.</p>
                <button onClick={clearFilters} className="text-primary font-semibold hover:text-accent transition-colors text-sm mt-2">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((property, i) => (
                  <PropertyCard key={property.id} property={property} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-80 bg-white z-50 lg:hidden flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-text-dark">Filter Properties</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-text-muted hover:text-text-dark"><X size={20} /></button>
            </div>
            <div className="p-5 flex-1"><SidebarContent /></div>
            <div className="p-5 border-t border-gray-100">
              <button onClick={() => setSidebarOpen(false)} className="btn-primary w-full">Show {filtered.length} Properties</button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
