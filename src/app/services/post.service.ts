import { getToken } from "../lib/auth";
import { Post } from "../types/post.types";

export async function getAllPosts() :Promise<Post[] | undefined>{
  
    const res = await fetch("https://route-posts.routemisr.com/posts",{
     headers:{
      Token : await getToken() || ""
     },
     next: {
      tags: ["posts"]
     }
   })
   if(res.ok){
     const data = await res.json();
     return data?.data?.posts;
   }
   }

export async function getSinglePost(postId: string) {
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}`, {
            method: "GET",
            headers: {
                Token: await getToken() || "",
            },
            next: {
              tags: [`getSinglePost${postId}`]
            }
        })
        if (res.ok) {  
            const data = await res.json();
            return data.data.post;
        }
        else return false;
    }



