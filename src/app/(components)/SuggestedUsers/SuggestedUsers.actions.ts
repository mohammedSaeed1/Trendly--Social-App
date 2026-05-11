"use server"
import { getToken } from "@/app/lib/auth";
import { updateTag } from "next/cache";

export async function followAndUnfollowUser(userId : string){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/users/${userId}/follow`,{
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