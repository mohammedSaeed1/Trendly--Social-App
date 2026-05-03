"use server"
import { cookies } from "next/headers";
import { RegisterSchemaType } from "./register.types";

export async function registerForm(values: RegisterSchemaType) {
    const res = await fetch(`https://route-posts.routemisr.com/users/signup`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const data = await res.json();
        const cookie = await cookies();
        cookie.set("usertoken", data.data.token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        })
        return true;
    }
    else {
        const data = await res.json();
        console.log(data);
        return false;
    }
}

