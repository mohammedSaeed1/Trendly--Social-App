"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/app/Context/UserContext";
import { LoggedUserProfile } from "@/app/types/user.types";
import { getUnreadCount } from "@/app/(components)/notifications/Notifications.actions"

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();

  const { loggedUser, userToken } = useContext(UserContext) as {
    loggedUser: LoggedUserProfile;
    userToken: string;
  };

  const [unreadCountNotifications, setUnreadCountNotifications] =
    useState<number>(0);

  const links = [
    { label: "Home", href: "/", icon: "fa-house" },
    { label: "Reels", href: "/reels", icon: "fa-clapperboard" },
    {
      label: "Profile",
      href: `/profile/${loggedUser?.user._id}`,
      icon: "fa-user",
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: "fa-bell",
      badge: true,
    },
  ];

  async function getNotificationCount() {
    const count = await getUnreadCount();

    if (count) {
      setUnreadCountNotifications(count);
    }
  }

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    setUnreadCountNotifications(0);

    router.push("/login");
    router.refresh();
  }

  useEffect(() => {
    if (userToken) {
      getNotificationCount();
    }
  }, [userToken]);

  return (
    <>
      {/* ───────── DESKTOP SIDEBAR ───────── */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-67.5 flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-2xl lg:flex">
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
            {userToken &&
              links.map((link) => {
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
                      />

                      {/* Notification Badge */}
                      {link.label === "Notifications" &&
                        unreadCountNotifications > 0 && (
                          <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                            {unreadCountNotifications > 9
                              ? "9+"
                              : unreadCountNotifications}
                          </span>
                        )}
                    </div>

                    <span className="text-sm font-medium">
                      {link.label}
                    </span>
                  </Link>
                );
              })}

            {/* Desktop Auth Buttons */}
            {userToken ? (
              <button
                onClick={handleLogout}
                className="hidden items-center gap-4 rounded-2xl px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white lg:flex"
              >
                <i className="fa-solid fa-right-from-bracket text-lg"></i>

                <span className="text-sm font-medium cursor-pointer text-red-400">
                  Logout
                </span>
              </button>
            ) : (
              <div className="hidden flex-col gap-2 lg:flex cursor-pointer">
                <Link
                  href="/login"
                  className="rounded-2xl px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-2xl px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-auto border-t border-white/10 p-6">
          <div className="rounded-2xl border border-indigo-500/20 bg-linear-to-br from-indigo-500/20 to-fuchsia-500/10 p-4">
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
       
        {userToken &&
          links.map((link) => {
            const isActive = path === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center transition ${
                  isActive ? "text-indigo-400" : "text-slate-400"
                }`}
              >
                <div
                  className={`relative flex h-11 w-11 items-center justify-center rounded-2xl ${
                    isActive ? "bg-indigo-500/15" : ""
                  }`}
                >
                  <i className={`fa-solid ${link.icon} text-lg`} />

                  {/* Notification Badge */}
                  {link.label === "Notifications" &&
                    unreadCountNotifications > 0 && (
                      <span className="absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                        {unreadCountNotifications > 9
                          ? "9+"
                          : unreadCountNotifications}
                      </span>
                    )}
                </div>

                <span className="text-[11px] font-medium">
                  {link.label}
                </span>
              </Link>
            );
          })}

        {/* Mobile Auth Buttons */}
        {userToken ? (
          <button
            onClick={handleLogout}
            className="relative flex flex-col items-center text-slate-400 transition hover:text-white"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl">
              <i className="fa-solid fa-right-from-bracket text-lg"></i>
            </div>

            <span className="text-[11px] font-medium">
              Logout
            </span>
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="relative flex flex-col items-center text-slate-400 transition hover:text-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl">
                <i className="fa-solid fa-arrow-right-to-bracket text-lg"></i>
              </div>

              <span className="text-[11px] font-medium">
                Login
              </span>
            </Link>

            <Link
              href="/register"
              className="relative flex flex-col items-center text-slate-400 transition hover:text-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl">
                <i className="fa-solid fa-user-plus text-lg"></i>
              </div>

              <span className="text-[11px] font-medium">
                Register
              </span>
            </Link>
          </>
        )}
      </div>
    </>
  );
}