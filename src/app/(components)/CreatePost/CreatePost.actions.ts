"use server"
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function createPost(values : FormData){    
    const cookie = await cookies();
    const token = cookie.get("usertoken")?.value;
     const res = await fetch("https://route-posts.routemisr.com/posts",{
      method: "POST",
      body: values,
       headers:{    
        Token : token || ""
    }
  })

    // const data = await res.json();
    if(res.ok){
      revalidateTag("posts");
      return true;  
    } 
    else return false;
    // return data?.data?.posts;
}