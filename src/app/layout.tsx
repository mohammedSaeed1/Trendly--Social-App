import type { Metadata } from "next";
import "./globals.css";
import { Toast } from "@heroui/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./(components)/SideBar/SideBar";
import UserContextProvider from "./Context/UserContext";
import { getMyProfile } from "./services/user.service";
import { cookies } from "next/headers";
import { LoggedUserProfile} from "./types/user.types";
import Logo from "./(components)/Logo/Logo";
import {poppins} from "@/app/fonts";


export const metadata: Metadata = {
  title: "Trendly Social app",
  description:
  "Trendly is a modern social media platform to share posts, explore reels, connect with friends, and discover trending content.",
  keywords: [
    "Trendly",
    "Social Media",
    "Next.js Social App",
    "Reels",
    "Posts",
    "Social Network",
    "Trendly Social",
    "React",
    "Next.js",
    "Community Platform",
  ],

  authors: [
    {
      name: "Mohamed Saeed",
    }
  ],

  creator: "Mohamed Saeed"
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>){
  
  const user : LoggedUserProfile = await getMyProfile();
   
  const userToken : string  = (await cookies()).get("usertoken")?.value;

  return (
    <>
    <html lang="en" className={`h-full antialiased `}>
      <body className={`${poppins.className} flex flex-col min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900`}>
     <UserContextProvider loggedUser = {user} userToken ={userToken}>
       <Sidebar />
       <Logo/>      
        {children}
     </UserContextProvider>
      <Toast.Provider placement="top"/>
        </body>
    </html>
      </>
  )
}
