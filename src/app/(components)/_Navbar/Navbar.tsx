"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationPanel from "../Notifications/Notifications";
import {
  getUnreadCount,
  getNotifications,
  markNotificationAsRead,
  markAllAsRead,
} from "../Notifications/Notifications.actions";

const navbarLinks = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
];

const navbarLinksOnMobile = [
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

  // ── Fetch unread count on mount ──
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
    setNotifications((prev: any[]) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );

    setUnreadCount((prev) => Math.max(0, prev - 1));
    markNotificationAsRead(id);
  }

  function handleMarkAllAsRead() {
    setNotifications((prev: any[]) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
    setUnreadCount(0);
    markAllAsRead();
  }

  return (
    <>
      {/* ───────── NAVBAR ───────── */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-slate-300 hover:text-white transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>

            <h1 className="text-lg font-bold text-white tracking-wide">
              <span className="text-indigo-400">Trendly</span>
            </h1>
          </div>

          {/* Center */}
          <ul className="hidden md:flex items-center gap-6">
            {navbarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm transition ${
                    pathName === link.href
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}

                  {pathName === link.href && (
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-400 rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Bell */}
            <button
              ref={bellRef}
              onClick={handleBellClick}
              className="relative rounded-full p-2 text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              <i className="fa-regular fa-bell text-lg"></i>

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-slate-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 text-sm font-medium transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-white/5 backdrop-blur-xl">
            <ul className="flex flex-col gap-2 p-4">
              {navbarLinksOnMobile.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2 text-sm ${
                      pathName === link.href
                        ? "text-white"
                        : "text-slate-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ───────── NOTIFICATION PANEL ───────── */}
      {isPanelOpen && (
        <div
          ref={panelRef}
          className="fixed right-4 top-[72px] z-50 w-[350px]"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-2xl">
            <NotificationPanel
              notifications={notifications}
              unreadCount={unreadCount}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>
      )}
    </>
  );
}