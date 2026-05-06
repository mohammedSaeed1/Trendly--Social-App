"use client"
import { createContext} from "react";
import { UserProfile } from "../types/user.types";

export const UserContext = createContext<UserProfile | null>(null);

export default function UserContextProvider({ children , loggedUser}: { children: React.ReactNode , loggedUser : UserProfile }) {
  
  return <UserContext.Provider value={loggedUser}>
    {children}
  </UserContext.Provider>
}