/**
 * Supabase client for use outside of a request context
 * (e.g. generateStaticParams, build-time data fetching).
 * Does NOT use cookies — safe for static generation.
 */
import { createClient } from "@supabase/supabase-js";

export function createStaticClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
