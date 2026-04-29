"use server"

import { getToken } from "@/app/lib/auth";

export async function addLikeAndUnLike(postId: string) {
    try {
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/like`, {
            method: "PUT",
            headers: {
                Token: await getToken() || ""
            },
            next: {
                tags: ["posts"]
            }
        })
        if(res.ok) return true;
        else return false;
    }
    catch (error) {
        console.log("From error", error);
    }
}
export async function addBookmarkAndUnBookmark(postId: string) {
    try {
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/bookmark`, {
            method: "PUT",
            headers: {
                Token: await getToken() || ""
            },
            next: {
                tags: ["posts"]
            }
        })
        if(res.ok) return true
        else return false;
    }
    catch (error) {
        console.log("From error", error);
    }
}