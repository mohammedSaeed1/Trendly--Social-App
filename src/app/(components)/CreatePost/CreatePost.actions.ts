"use server"
import { revalidateTag } from "next/cache";
import { getToken } from "@/app/lib/auth";

export async function createPost(values : FormData){   
  const token = await getToken(); 
     const res = await fetch("https://route-posts.routemisr.com/posts",{
      method: "POST",
      body: values,
       headers:{    
        Token : token || ""
    }
  })
  if(res.ok){
      revalidateTag("posts","max");
      return true;  
    } 
    else return false;
}