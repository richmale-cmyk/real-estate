import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { rowToProperty, type PropertyRow } from "@/lib/supabase/types";
import PropertiesClient from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Properties",
  description: "Browse all luxury properties available through LuxProp.",
};

export const revalidate = 60;

export default async function PropertiesPage() {
  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from("properties") as any)
    .select("*")
    .order("created_at", { ascending: false }) as { data: PropertyRow[] | null; error: unknown };

  if (error) console.error("Failed to fetch properties:", error);

  const properties = (data ?? []).map(rowToProperty);

  return <PropertiesClient properties={properties} />;
}
