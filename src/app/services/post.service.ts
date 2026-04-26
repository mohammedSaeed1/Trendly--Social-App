import { cookies } from "next/headers";
import { Post } from "../types/post.types";

 const cookie = await cookies();
 const token = cookie.get("usertoken");

export async function getAllPosts() :Promise<Post[]>{
   const res = await fetch("https://route-posts.routemisr.com/posts",{
    headers:{
     Token : token?.value || ""
    }
  })
    const data = await res.json();
    return data.data.posts;
  }