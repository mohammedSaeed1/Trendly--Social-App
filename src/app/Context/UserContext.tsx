"use client"
import { createContext} from "react";
import { LoggedUserProfile} from "../types/user.types";

export type UserContextValue = {
  loggedUser: LoggedUserProfile
  userToken: string
}

export const UserContext = createContext<UserContextValue | null>(null);

export default function UserContextProvider({ children , loggedUser , userToken}: { children: React.ReactNode , loggedUser : LoggedUserProfile , userToken : string }) {
  
  return <UserContext.Provider value={{loggedUser , userToken} }>
    {children}
  </UserContext.Provider>
}