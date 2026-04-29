// import { cookies } from "next/headers";
import { getToken } from "../lib/auth";
import { Post } from "../types/post.types";

//  const cookie = await cookies();
//  const token = cookie.get("usertoken")?.value;

export async function getAllPosts() :Promise<Post[] | undefined>{
  try{
    const res = await fetch("https://route-posts.routemisr.com/posts",{
     headers:{
      Token : await getToken() || ""
     },
     next: {
      tags: ["posts"]
     }
   })
     const data = await res.json();
     return data?.data?.posts;
   }
   catch(error){
    console.log("From error",error);
   }
  }

 export const formatEgyptDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-EG", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};



