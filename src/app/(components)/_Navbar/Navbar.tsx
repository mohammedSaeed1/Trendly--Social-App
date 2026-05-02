"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationPanel from "../Notifications/Notifications";
import { getUnreadCount, getNotifications, markNotificationAsRead, markAllAsRead } from "../Notifications/Notifications.actions";

const navbarLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
];

const navbarLinksOnMobile: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  
  const pathName = usePathname();  
  // ── On mount: fetch just the count ──
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  
  async function fetchUnreadCount() {
    const count = await getUnreadCount();
    setUnreadCount((prev) => (prev === count ? prev : count));
  }

  // ── Close panel when clicking outside ──
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(e.target as Node)
      ) {
        setIsPanelOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  async function fetchNotifications() {
    const data = await getNotifications();
    setNotifications(data);
  }

  function handleBellClick() {
    const opening = !isPanelOpen;
    setIsPanelOpen(opening);
    if (opening) {
      fetchNotifications();
    }
  }

  function handleMarkAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((n: any) => (n._id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
     markNotificationAsRead(id);
  }

  function handleMarkAllAsRead() {
    setNotifications((prev) => prev.map((n: any) => ({ ...n, isRead: true })));
    setUnreadCount(0);
    markAllAsRead();
  }

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          {/* ── Left: hamburger + logo ── */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <p className="font-bold">Trendly Social app</p>
          </div>

          {/* ── Center: nav links ── */}
          <ul className="hidden items-center gap-4 md:flex">
            {navbarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 ${pathName === link.href ? "font-medium text-accent" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right: bell + auth ── */}
          <div className="flex items-center gap-4">

            {/* Bell icon */}
            <button
              ref={bellRef}
              onClick={handleBellClick}
              aria-label="Notifications"
              className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={isPanelOpen ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>

              {/* Unread badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            <div className="hidden items-center gap-4 md:flex">
              <Link href="/login" className="font-medium text-accent">
                Login
              </Link>
              <Link
                href="/register"
                className="font-medium text-accent bg-amber-300 rounded-xl px-2"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              {navbarLinksOnMobile.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2 ${pathName === link.href ? "font-medium text-accent" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ── Notification panel dropdown ── */}
      {isPanelOpen && (
        <div
          ref={panelRef}
          className="fixed right-4 top-18 z-50 md:absolute md:right-6"
        >
          <NotificationPanel
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        </div>
      )}
    </>
  );
}
