"use server"
import { getToken } from "@/app/lib/auth";
import { revalidateTag } from "next/cache";

export async function followAndUnfollowUser(userId : string){
    const res = await fetch(`https://route-posts.routemisr.com/users/${userId}/follow`,{
        method: "PUT",
        headers:{
            Token: await getToken() || ""
        }
    })
    if(res.ok){
        const data = await res.json();
        revalidateTag(`getUserProfile${userId}`);
        // revalidateTag()
        return data.data.following;
    }
}