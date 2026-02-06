import type { ReactNode } from "react";

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}
