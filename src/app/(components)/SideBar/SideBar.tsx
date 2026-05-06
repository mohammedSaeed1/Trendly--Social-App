"use client";

import { useContext} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/Context/UserContext";

export default function Sidebar() {
  const path = usePathname();
  const loggedUser = useContext(UserContext);

  const links = [
    { label: "Home", href: "/", icon: "fa-house" },
    { label: "Reels", href: "/reels", icon: "fa-play" },
    { label: "Profile", href: `/profile/${loggedUser?._id}`, icon: "fa-user" },
  ];

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
    </>
  );
}