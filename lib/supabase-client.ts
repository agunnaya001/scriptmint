"use client";

import { createBrowserClient } from "@supabase/ssr";

let supabaseInstance: any = null;

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase environment variables not configured");
      return null;
    }

    supabaseInstance = createBrowserClient(supabaseUrl, supabaseKey);
  }

  return supabaseInstance;
}

export function useSupabase() {
  return getSupabaseClient();
}



