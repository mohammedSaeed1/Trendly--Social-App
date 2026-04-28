"use server"
import { cookies } from "next/headers";


export async function createPost(values : FormData){    
    const cookie = await cookies();
    const token = cookie.get("usertoken")?.value;
     const res = await fetch("https://route-posts.routemisr.com/posts",{
      method: "POST",
      body: values,
       headers:{    
        Token : token || ""
    },
    next: {
        tags: ["posts"]
    }
  })

    // const data = await res.json();
    if(res.ok) return true;
    else return false;
    // return data?.data?.posts;
}