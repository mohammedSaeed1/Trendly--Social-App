"use server"
import { cookies } from "next/headers";
import { changePasswordSchemaType} from "./changePassword.types";
import { getToken } from "@/app/lib/auth";


export async function changePassword(values: changePasswordSchemaType) {

   
    const res = await fetch(`https://route-posts.routemisr.com/users/change-password`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
            Token :  await getToken() || "",
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    if (res.ok) {
        const cookie = await cookies();
        cookie.delete("usertoken");
        return true;
    } else{
        console.log("from changepassword",data);
        
       return false};
}

