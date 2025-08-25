// components/MobileMenu.tsx
"use client";
import Link from "next/link";
import React from "react";

export default function MobileMenu({
  open,
  onClose,
}: { open: boolean; onClose: () => void; }) {
  return (
    <div className="mobile-sheet" aria-hidden={!open}>
      <div
        className="mobile-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav style={{ display: "grid", gap: 12 }}>
          <Link href="/" onClick={onClose}>🏠 Home</Link>
          <Link href="/tabs" onClick={onClose}>🧩 Tabs</Link>
          <Link href="/about" onClick={onClose}>ℹ️ About</Link>
        </nav>
        <button
          className="btn"
          style={{ marginTop: 16 }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
