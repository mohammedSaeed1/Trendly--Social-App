"use server"
import { revalidateTag } from "next/cache";
import { getToken } from "@/app/lib/auth";

export async function createPost(values : FormData){    
     const res = await fetch("https://route-posts.routemisr.com/posts",{
      method: "POST",
      body: values,
       headers:{    
        Token : await getToken() || ""
    }
  })
  if(res.ok){
      revalidateTag("posts");
      return true;  
    } 
    else return false;
}