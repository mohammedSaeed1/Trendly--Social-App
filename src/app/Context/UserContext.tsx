"use client"
import { createContext} from "react";
import { UserProfile } from "../types/user.types";

type UserContextValue = {
  loggedUser: UserProfile
  userToken: string
}

export const UserContext = createContext<UserContextValue | null>(null);

export default function UserContextProvider({ children , loggedUser , userToken}: { children: React.ReactNode , loggedUser : UserProfile , userToken : string }) {
  
  return <UserContext.Provider value={{loggedUser , userToken} }>
    {children}
  </UserContext.Provider>
}