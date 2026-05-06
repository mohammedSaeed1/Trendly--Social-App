"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationPanel from "../Notifications/Notifications";
import {
  getUnreadCount,
  getNotifications,
  markNotificationAsRead,
  markAllAsRead,
} from "../Notifications/Notifications.actions";
import { UserContext } from "@/app/Context/UserContext";

export default function Sidebar() {
  const path = usePathname();
  const loggedUser = useContext(UserContext);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const panelRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);

  const links = [
    { label: "Home", href: "/", icon: "fa-house" },
    { label: "Reels", href: "/reels", icon: "fa-play" },
    { label: "Profile", href: `/profile/${loggedUser?._id}`, icon: "fa-user" },
  ];

  // ── Fetch unread count ──
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  async function fetchUnreadCount() {
    const count = await getUnreadCount();
    setUnreadCount(count);
  }

  // ── Close notifications panel on outside click ──
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

    if (opening) fetchNotifications();
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
      {/* ───────── SIDEBAR ───────── */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-slate-950/80 backdrop-blur-xl p-6 z-40">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white mb-10">
          <span className="text-indigo-400">Trendly</span>
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                path === link.href
                  ? "bg-indigo-500 text-white"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <i className={`fa-solid ${link.icon}`}></i>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}

          {/* Notifications */}
          <button
            ref={bellRef}
            onClick={handleBellClick}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition relative"
          >
            <i className="fa-regular fa-bell"></i>
            <span>Notifications</span>

            {unreadCount > 0 && (
              <span className="absolute right-4 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

        </nav>

        {/* Bottom Auth */}
        <div className="mt-auto flex flex-col gap-3">
          <Link
            href="/login"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 text-sm font-medium text-center transition"
          >
            Sign Up
          </Link>
        </div>
      </aside>

      {/* ───────── NOTIFICATIONS PANEL ───────── */}
      {isPanelOpen && (
        <div
          ref={panelRef}
          className="fixed left-72 top-20 z-50 w-[350px]"
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