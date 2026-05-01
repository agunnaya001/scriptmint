"use client";
import { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("[v0] Error caught:", error);
    return (
      <div style={{ padding: "20px", background: "#1a0f08", border: "1px solid #f97316", borderRadius: "4px", color: "#f97316", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>
        ⚠ Error loading component. Check console for details.
      </div>
    );
  }
}
