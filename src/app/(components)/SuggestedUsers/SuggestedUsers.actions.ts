"use server"
import { getToken } from "@/app/lib/auth";
import { updateTag } from "next/cache";
const baseURL = process.env.API_BASE_URL;


export async function followAndUnfollowUser(userId : string){
    const token = await getToken();
    const res = await fetch(`${baseURL}/${userId}/follow`,{
        method: "PUT",
        headers:{
            Token: token || ""
        }
    })
    if(res.ok){
        const data = await res.json();
        updateTag(`getUserProfile${userId}`);
        return data.data.following;
    }
}