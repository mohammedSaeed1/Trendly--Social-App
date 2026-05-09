import { getToken } from "../lib/auth";
import { Post } from "../types/post.types";

export async function getAllPosts() :Promise<Post[] | undefined>{
    const token = await getToken();
    const res = await fetch("https://route-posts.routemisr.com/posts",{
     headers:{
      Token : token
     },
     cache: "force-cache",
     next: {
      revalidate: 30,
      tags: ["posts"]
     }
   })
   if(res.ok){
     const data = await res.json();     
     return data?.data?.posts;
   }
   }

export async function getSinglePost(postId: string) {
    const token = await getToken();
        const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}`, {
            method: "GET",
            headers: {
                Token: token
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



