"use client";
import { UserContext } from "@/app/Context/UserContext";
// import { UserProfile } from "@/app/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext} from "react";

export default function MobileBottomBar() {
  const path = usePathname();
   
  const loggedUser = useContext(UserContext);
  
  const links = [
    { href: "/", icon: "fa-house" },
    { href: "/reels", icon: "fa-play" },
    { href: `/profile/${loggedUser?._id}`, icon: "fa-user" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 flex justify-around py-3 lg:hidden">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <i
            className={`fa-solid ${link.icon} text-xl transition ${
              path === link.href
                ? "text-white"
                : "text-slate-500 hover:text-white"
            }`}
          ></i>
        </Link>
      ))}
    </div>
  );
}