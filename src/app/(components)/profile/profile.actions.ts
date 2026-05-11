"use server"
import { getToken } from "@/app/lib/auth";
import { updateTag } from "next/cache";

export async function uploadProfilePhoto(photo : FormData){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/users/upload-photo`,{
        method: "PUT",
        body: photo,
        headers:{
            Token: token || ""
        }
    })
    if(res.ok){
        updateTag("getMyProfile");
        return true;
    }
}

export async function getBookmarks(){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/users/bookmarks`,{
        headers:{
            Token: token || ""
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
