import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Bed, Bath, Maximize2, MapPin, Phone, Mail, ArrowLeft, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { rowToProperty, type PropertyRow } from "@/lib/supabase/types";
import { formatPriceFull, formatSqm } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";
import EnquiryForm from "@/components/EnquiryForm";
import PropertyCard from "@/components/PropertyCard";

interface Params {
  params: { id: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  // Use the cookie-free static client — generateStaticParams runs at build time
  const supabase = createStaticClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("properties") as any)
    .select("id") as { data: { id: string }[] | null };
  return (data ?? []).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("properties") as any)
    .select("title, description")
    .eq("id", params.id)
    .single() as { data: { title: string; description: string } | null };
  if (!data) return {};
  return { title: data.title, description: data.description };
}

const statusStyles: Record<string, string> = {
  "For Sale": "bg-primary text-white",
  New: "bg-accent text-white",
  Sold: "bg-gray-500 text-white",
};

export default async function PropertyDetailPage({ params }: Params) {
  const supabase = createClient();

  const [{ data: row }, { data: relatedRows }] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("properties") as any)
      .select("*")
      .eq("id", params.id)
      .single() as Promise<{ data: PropertyRow | null }>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("properties") as any)
      .select("*")
      .neq("id", params.id)
      .limit(3) as Promise<{ data: PropertyRow[] | null }>,
  ]);

  if (!row) notFound();

  const property = rowToProperty(row);
  const related = (relatedRows ?? []).map(rowToProperty);

  return (
    <>
      <div className="bg-bg-subtle border-b border-gray-100 pt-24">
        <div className="container-wide py-4">
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors">
            <ArrowLeft size={15} /> Back to Properties
          </Link>
        </div>
      </div>

      <div className="container-wide py-10">
        <ImageGallery images={property.images} title={property.title} />

        <div className="grid lg:grid-cols-3 gap-10 mt-12">
          {/* Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start gap-4 mb-6">
              <span className={`text-xs font-bold tracking-[0.15em] uppercase px-3 py-1.5 ${statusStyles[property.status]}`}>
                {property.status}
              </span>
              <span className="text-xs font-medium text-text-muted bg-bg-subtle px-3 py-1.5">{property.type}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-3 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-text-muted mb-6">
              <MapPin size={15} className="text-accent flex-shrink-0" />
              <span className="text-sm">{property.address}, {property.suburb}, {property.city}</span>
            </div>
            <p className="text-4xl md:text-5xl font-extrabold text-primary mb-8 tracking-tight">
              {formatPriceFull(property.price)}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10 p-6 bg-bg-subtle">
              <div className="flex flex-col items-center text-center gap-2">
                <Bed size={20} className="text-accent" />
                <span className="text-2xl font-extrabold text-text-dark">{property.bedrooms}</span>
                <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 border-x border-gray-200">
                <Bath size={20} className="text-accent" />
                <span className="text-2xl font-extrabold text-text-dark">{property.bathrooms}</span>
                <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Maximize2 size={20} className="text-accent" />
                <span className="text-2xl font-extrabold text-text-dark">{formatSqm(property.sqm)}</span>
                <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Floor Area</span>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-text-dark mb-4">About This Property</h2>
              <p className="text-text-muted leading-relaxed text-base">{property.description}</p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-text-dark mb-5">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-accent" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-text-dark font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-text-dark mb-5">Location</h2>
              <div className="relative h-64 md:h-80 bg-bg-subtle border border-gray-100 overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/map${property.id}/1200/500`}
                  alt={`Map of ${property.suburb}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white shadow-lg px-6 py-4 text-center">
                    <MapPin size={20} className="text-accent mx-auto mb-2" />
                    <p className="text-sm font-bold text-text-dark">{property.suburb}</p>
                    <p className="text-xs text-text-muted">{property.city}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-text-muted mt-2">{property.address}, {property.suburb}, {property.city}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white border border-gray-100 shadow-sm p-6">
                <p className="text-xs font-semibold tracking-wide uppercase text-text-muted mb-4">Listed by</p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={property.agent.avatar} alt={property.agent.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-text-dark text-base">{property.agent.name}</p>
                    <p className="text-xs text-accent font-semibold">Senior Property Agent</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 text-sm text-text-muted hover:text-primary transition-colors">
                    <Phone size={14} className="text-accent" /> {property.agent.phone}
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 text-sm text-text-muted hover:text-primary transition-colors">
                    <Mail size={14} className="text-accent" /> {property.agent.email}
                  </a>
                </div>
              </div>
              <EnquiryForm propertyTitle={property.title} compact />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-dark mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
