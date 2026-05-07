"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/Context/UserContext";
import Image from "next/image";
import { getUnreadCount } from "../notifications/Notifications.actions";

export default function Sidebar() {
  const path = usePathname();
  const loggedUser = useContext(UserContext);
 const [unreadCountNotifications, setUnreadCountNotifications] = useState<number>(0);

 async function getNoftificationCount(){
   const count = await getUnreadCount();
   if(count) setUnreadCountNotifications(count);
 }
  
 useEffect(() => {
   getNoftificationCount();
 }, [])
 

  const links = [
    { label: "Home", href: "/", icon: "fa-house" },
    { label: "Reels", href: "/reels", icon: "fa-clapperboard" },
    {
      label: "Profile",
      href: `/profile/${loggedUser?._id}`,
      icon: "fa-user",
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: "fa-bell",
      badge: true,
    },
  ];

  return (
    <>
      {/* ───────── DESKTOP SIDEBAR ───────── */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-50 h-screen w-67.5 flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-2xl">

        <div className="flex flex-col px-6 pt-7">

          {/* Logo */}
          <Link href="/" className="mb-10 flex items-center">
            <Image
              src="/trendly-logo-dark.svg"
              width={170}
              height={170}
              alt="Trendly logo"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">

            {links.map((link) => {
              const isActive = path === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-4 rounded-2xl px-4 py-3 transition ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >

                  {/* Icon */}
                  <div className="relative">
                    <i
                      className={`fa-solid ${link.icon} text-lg transition-transform group-hover:scale-110`}
                    ></i>

                    {/* 🔴 Badge */}
                    {link.label === "Notifications" && unreadCountNotifications > 0 && (
                      <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {unreadCountNotifications > 9 ? "9+" : unreadCountNotifications}
                      </span>
                    )}
                  </div>

                  <span className="text-sm font-medium">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-auto border-t border-white/10 p-6">
          <div className="rounded-2xl bg-linear-to-br from-indigo-500/20 to-fuchsia-500/10 p-4 border border-indigo-500/20">
            <p className="text-sm font-medium text-white">
              Trendly Social
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Share moments, connect, explore reels.
            </p>
          </div>
        </div>
      </aside>

      {/* ───────── MOBILE BOTTOM BAR ───────── */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 bg-slate-950/90 px-4 backdrop-blur-xl lg:hidden">

        {links.map((link) => {
          const isActive = path === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex flex-col items-center transition ${
                isActive ? "text-indigo-400" : "text-slate-400"
              }`}
            >
              <div className={`relative flex h-11 w-11 items-center justify-center rounded-2xl ${
                isActive ? "bg-indigo-500/15" : ""
              }`}>

                <i className={`fa-solid ${link.icon} text-lg`} />

                {/* 🔴 Mobile badge */}
                {link.label === "Notifications" && unreadCountNotifications > 0 && (
                  <span className="absolute top-1 right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {unreadCountNotifications}
                  </span>
                )}
              </div>

              <span className="text-[11px] font-medium">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}