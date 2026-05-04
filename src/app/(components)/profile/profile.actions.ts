"use server"
import { getToken } from "@/app/lib/auth";
import { revalidateTag } from "next/cache";

export async function uploadProfilePhoto(photo : FormData){
    const res = await fetch(`https://route-posts.routemisr.com/users/upload-photo`,{
        method: "PUT",
        body: photo,
        headers:{
            Token: await getToken() || ""
        }
    })
    if(res.ok){
        revalidateTag("getMyProfile");
        return true;
    }
}

export async function getBookmarks(){
    const res = await fetch(`https://route-posts.routemisr.com/users/bookmarks`,{
        headers:{
            Token: await getToken() || ""
        },
        next:{
            tags: ["getBookmarks"]
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data.bookmarks;
    }
}
