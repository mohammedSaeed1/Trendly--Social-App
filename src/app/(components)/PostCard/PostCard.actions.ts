"use server"
import { getToken } from "@/app/lib/auth";
import { updateTag } from "next/cache";

export async function addLikeAndUnLike(postId: string) {
    const token = await getToken();
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/like`, {
            method: "PUT",
            headers: {
                Token: token || ""
            }
        })
        if (res.ok) {
            updateTag(`getSinglePost${postId}`);
            return true;
        }
        else return false;
    }

export async function addBookmarkAndUnBookmark(postId: string) {
    const token = await getToken();
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/bookmark`, {
            method: "PUT",
            headers: {
                Token: token || ""
            }
        })
        if (res.ok) {
            updateTag(`getSinglePost${postId}`);
            return true;
        }
        else return false;
    }
export async function sharePost(postId: string , bodyContent? : string) {
    const token = await getToken();
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/share`, {
            method: "POST",
            body: bodyContent ? JSON.stringify({body : bodyContent}) : undefined,
            headers: {
                Token: token || "",
                "Content-type": "application/json"
            }
        })
        if (res.ok) {
            const data = await res.json();
            updateTag("posts");
            updateTag("HomeFeed");
            return data.data.post;
        }
        else return false;   
    }
export async function deletePost(postId: string) {
    const token = await getToken();
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Token: token || "",
            }
        })
        if (res.ok) {
           updateTag("posts");
           updateTag("HomeFeed");
            return true
        }
        else return false;
        
    }
export async function updatePost(postId: string , values : FormData) {
    const token = await getToken();
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}`, {
            method: "PUT",
            body: values,
            headers: {
                Token: token || ""
            }
        })
        if (res.ok) {
           updateTag(`posts`);
            updateTag("HomeFeed");
            return true;
        }
        else return false;
}

export async function createComment(postId : string , values : FormData){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Token": token || ""
        },
        body: values
    });
    if(res.ok){
        const data = await res.json();
        updateTag(`getPostComments${postId}`);
        return data;
    }
    else return false;
}

export async function getPostComments(postId : string){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments`, {
        method: "GET",
        headers: {
            "Token": token || ""
        },
        next:{
            tags:[`getPostComments${postId}`]
        }
    });
    if(res.ok){
        const data = await res.json();
        return data.data.comments;
    }
    else return false;
}

export async function deleteComment(postId : string , commentId : string){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, {
        method: "Delete",
        headers: {
            "Token": token || ""
        },
    });
    if(res.ok){
        updateTag(`getPostComments${postId}`);
        return true;
    }
    else return false;
}

export async function updateComment(postId : string , commentId : string , updatedContent:FormData){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, {
        method: "PUT",
        body: updatedContent,
        headers: {
            "Token": token || ""
        },
    });
    if(res.ok){
        updateTag(`getPostComments${postId}`);
        return true;
    }
    else return false;
}

export async function addLikeAndUnlikeComment(postId : string , commentId : string){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`, {
        method: "PUT",
        headers: {
            "Token": token || ""
        },
    });
    if(res.ok){
        updateTag(`getPostComments${postId}`);
        return true;
    }
    else return false;
}

export async function createReply(postId : string , commentId : string , content:FormData){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`, {
        method: "POST",
        body: content,
        headers: {
            Token: token || ""
        },
    });
    if(res.ok){
        updateTag(`getCommentReplies${commentId}`);
        return true;
    }
    else return false;
}

export async function getCommentReplies(postId : string , commentId : string){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`, {
        method: "GET",
        headers: {
            Token: token || ""
        },
        next: {
            tags: [`getCommentReplies${commentId}`]
        }
    });
    if(res.ok){
        const data = await res.json();
        return data.data.replies;        
    }
    else return false;
}