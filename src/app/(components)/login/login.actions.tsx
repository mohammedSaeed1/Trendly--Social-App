"use server"
import { cookies } from "next/headers";
import { LoginSchemaType } from "./login.types";
const baseURL = process.env.API_BASE_URL;


export async function loginForm(values: LoginSchemaType) {

    const res = await fetch(`${baseURL}/users/signin`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    if (res.ok) {
        const cookie = await cookies();
        cookie.set("usertoken", data.data.token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        })
        return true;
    } else return false;
}

