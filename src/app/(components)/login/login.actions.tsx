"use server"
import { cookies } from "next/headers";
import { LoginSchemaType } from "./login.types";

export async function loginForm(values: LoginSchemaType) {

    const res = await fetch(`https://route-posts.routemisr.com/users/signin`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    if (res.ok) {
        console.log("data:", data);
        const cookie = await cookies();
        cookie.set("usertoken", data.data.token, {
            httpOnly: true,
            sameSite: "lax"
        })
        return true;
    } else {
        return false;
    }
}

