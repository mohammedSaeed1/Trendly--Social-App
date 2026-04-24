"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarLinks : { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
];

const navbarLinksOnMobile : { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" }
];



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathName =  usePathname();
  

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            {/* <Logo /> */}
            <p className="font-bold">Trendly Social app</p>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
            {navbarLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`block py-2 ${pathName === link.href ? "font-medium text-accent" : ""}`}>
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/login" className="font-medium text-accent">
            Login
          </Link>
          <Link href="/register" className="font-medium text-accent bg-amber-300 rounded-xl px-2">
            Sign Up
          </Link>
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
             {navbarLinksOnMobile.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`block py-2 ${pathName === link.href ? "font-medium text-accent" : ""}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}