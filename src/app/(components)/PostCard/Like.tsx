"use client"

import { useRouter } from "next/navigation";
import { addLikeAndUnLike } from "./PostCard.actions"
import { useState } from "react";

 export default function Like({postId}:{postId: string}){ 

    const [like , setLike] = useState(false);
    const router = useRouter();
  

  async function handleLike(){
    const isSuccessfully = await addLikeAndUnLike(postId);
    if(isSuccessfully){
      setLike((prev) => !prev);
      router.refresh();
    }
 
  }
  
  return (
    <i onClick={handleLike} className={`fa-solid fa-heart cursor-pointer ${like ? "text-red-500" : "text-[#637188]"}`}></i>
  )
}
