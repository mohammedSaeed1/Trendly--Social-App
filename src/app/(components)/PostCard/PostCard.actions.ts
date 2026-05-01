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

export async function createComment(postId : string , values : FormData){
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Token": await getToken() || ""
        },
        body: values,
        next:{
            tags : [`singlePost${postId}`]
        }
    });
    if(res.ok){
        const data = await res.json();
        console.log("From create comment action", data);
        revalidateTag(`singlePost${postId}`);
        return data;
    }
    else{
        return false;
    }
}

export async function getPostComments(postId : string){
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments`, {
        method: "GET",
        headers: {
            "Token": await getToken() || ""
        },
        next:{
            tags:[`getPostComments${postId}`]
        }
    });
    if(res.ok){
        const data = await res.json();
        console.log("From comments action", data);
        return data.data.comments;
    }
    else{
        return false;
    }
}

export async function deleteComment(postId : string , commentId : string){
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, {
        method: "Delete",
        headers: {
            "Token": await getToken() || ""
        },
    });
    if(res.ok){
        revalidateTag(`getPostComments${postId}`);
        return true;
    }
    else{
        return false;
    }
}

export async function updateComment(postId : string , commentId : string , updatedContent:FormData){
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, {
        method: "PUT",
        body: updatedContent,
        headers: {
            "Token": await getToken() || ""
        },
    });
    if(res.ok){
        revalidateTag(`getPostComments${postId}`);
        return true;
    }
    else{
        return false;
    }
}

export async function addLikeAndUnlikeComment(postId : string , commentId : string){
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`, {
        method: "PUT",
        headers: {
            "Token": await getToken() || ""
        },
    });
    if(res.ok){
        revalidateTag(`getPostComments${postId}`);
        return true;
    }
    else{
        return false;
    }
}

export async function createReply(postId : string , commentId : string , content:FormData){
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`, {
        method: "POST",
        body: content,
        headers: {
            "Token": await getToken() || ""
        },
    });
    if(res.ok){
        revalidateTag(`getPostComments${postId}`);
        return true;
    }
    else{
        return false;
    }
}

export async function getCommentReplies(postId : string , commentId : string){
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`, {
        method: "GET",
        headers: {
            "Token": await getToken() || ""
        },
    });
    if(res.ok){
        revalidateTag(`getPostComments${postId}`);
        const data = await res.json();
        console.log("adadadadada",data);
        return data.data.replies;        
    }
    else{
        return false;
    }
}