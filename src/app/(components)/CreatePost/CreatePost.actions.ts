"use server"
import { updateTag } from "next/cache";
import { getToken } from "@/app/lib/auth";
const baseURL = process.env.API_BASE_URL;


export async function createPost(values : FormData){   
  const token = await getToken(); 
     const res = await fetch(`${baseURL}/posts`,{
      method: "POST",
      body: values,
       headers:{    
        Token : token || ""
    }
  })
  if(res.ok){
      updateTag("posts");
      updateTag("HomeFeed");
      return true;  
    } 
    else return false;
}