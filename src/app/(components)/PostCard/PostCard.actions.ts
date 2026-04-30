"use server"

import { getToken } from "@/app/lib/auth";
import { revalidateTag } from "next/cache";

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
        if (res.ok) {
            revalidateTag("posts");
            return true;
        }
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
        if (res.ok) {
            revalidateTag("posts");
            return true;
        }
        else return false;
    }
    catch (error) {
        console.log("From error", error);
    }
}

export async function sharePost(postId: string , bodyContent? : string) {
    try {
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/share`, {
            method: "POST",
            body: bodyContent ? JSON.stringify({body : bodyContent}) : undefined,
            headers: {
                Token: await getToken() || "",
                "Content-type": "application/json"
            },
            next: {
                tags: ["posts"]
            }
        })
        if (res.ok) {
           revalidateTag("posts");
            return true
        }
        else return false;
        
    }
    catch (error) {
        console.log("From error", error);
    }
}


export async function deletePost(postId: string) {
    try {
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Token: await getToken() || "",
            },
            next: {
                tags: ["posts"]
            }
        })
        if (res.ok) {
           revalidateTag("posts");
            return true
        }
        else return false;
        
    }
    catch (error) {
        console.log("From error", error);
    }
}


export async function updatePost(postId: string , values : FormData) {
    try {
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}`, {
            method: "PUT",
            body: values,
            headers: {
                Token: await getToken() || "",
            },
            next: {
                tags: ["posts"]
            }
        })
        if (res.ok) {
           revalidateTag("posts");
            return true;
        }
        else return false;
    }
    catch (error) {
        console.log("From error", error);
    }
}
