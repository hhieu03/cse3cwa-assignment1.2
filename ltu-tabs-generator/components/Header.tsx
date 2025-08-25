// components/Header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import StudentBadge from "./StudentBadge";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

function setLastRouteCookie(path: string) {
  const d = new Date();
  d.setTime(d.getTime() + 30*24*60*60*1000); // 30 ngày
  document.cookie = `lastRoute=${encodeURIComponent(path)}; expires=${d.toUTCString()}; path=/`;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // lưu cookie "trang menu đang ở" (yêu cầu Cookie – Remember menu tab) 
    setLastRouteCookie(pathname);
  }, [pathname]);

  // breadcrumbs đơn giản
  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <header className="header">
      <div className="container nav" role="navigation" aria-label="Primary">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <StudentBadge />
          <Link href="/" style={{fontWeight:700, fontSize:18, color:"var(--fg)", textDecoration:"none"}} aria-label="Home">LTU Tabs Generator</Link>
        </div>

        <nav className="nav-links" aria-label="Desktop menu">
          <Link href="/">Home</Link>
          <Link href="/tabs">Tabs</Link>
          <Link href="/about">About</Link>
          <ThemeToggle />
          <button
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </button>
        </nav>
      </div>

      {/* Breadcrumbs */}
      <div className="container" aria-label="Breadcrumbs" style={{paddingTop:4, paddingBottom:8, fontSize:14, color:"var(--muted)"}}>
        <span><Link href="/">Home</Link></span>
        {crumbs.map((c, i) => (
          <span key={i}> / <Link href={"/"+crumbs.slice(0,i+1).join("/")}>{c}</Link></span>
        ))}
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
