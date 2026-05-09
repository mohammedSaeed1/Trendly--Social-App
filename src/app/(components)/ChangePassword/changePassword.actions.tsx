"use server"
import { cookies } from "next/headers";
import { changePasswordSchemaType} from "./changePassword.types";
import { getToken } from "@/app/lib/auth";


export async function changePassword(values: changePasswordSchemaType) {
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/users/change-password`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
            Token : token || "",
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const cookie = await cookies();
        cookie.delete("usertoken");
        return true;
    } else{        
       return false};
}

