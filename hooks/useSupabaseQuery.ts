"use client";
import { useCallback } from "react";
import { toast } from "sonner";

export function useSupabaseQuery() {
  const executeQuery = useCallback(
    async (fn: () => Promise<any>, onError?: (err: string) => void) => {
      try {
        const result = await fn();
        return result;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Database error occurred";
        console.error("[v0] Supabase query error:", error);
        
        if (onError) {
          onError(errorMsg);
        } else {
          toast.error(errorMsg);
        }
        
        return null;
      }
    },
    []
  );

  return { executeQuery };
}
