// ── Shared domain types ─────────────────────────────────────
export type PropertyType = "House" | "Apartment" | "Villa" | "Land";
export type PropertyStatus = "For Sale" | "Sold" | "New";

// Shape returned by Supabase (flat, with agent_ columns)
export interface PropertyRow {
  id: string;
  title: string;
  price: number;
  address: string;
  suburb: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: PropertyType;
  status: PropertyStatus;
  description: string;
  features: string[];
  images: string[];
  agent_name: string;
  agent_phone: string;
  agent_email: string;
  agent_avatar: string;
  created_at: string;
}

// Shape used across app components (nested agent object)
export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  suburb: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: PropertyType;
  status: PropertyStatus;
  description: string;
  features: string[];
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export interface EnquiryInsert {
  name: string;
  email: string;
  phone: string;
  message: string;
  property_title?: string | null;
}

// Converts a flat DB row → nested Property shape used by components
export function rowToProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    title: row.title,
    price: row.price,
    address: row.address,
    suburb: row.suburb,
    city: row.city,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    sqm: row.sqm,
    type: row.type,
    status: row.status,
    description: row.description,
    features: row.features,
    images: row.images,
    agent: {
      name: row.agent_name,
      phone: row.agent_phone,
      email: row.agent_email,
      avatar: row.agent_avatar,
    },
  };
}
