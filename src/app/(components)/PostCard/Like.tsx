"use client"

import { addLikeAndUnLike } from "./PostCard.actions"
import { useState } from "react";

 export default function Like({postId}:{postId: string}){ 

    const [like , setLike] = useState(false);
  

  async function handleLike(){
    const isSuccessfully = await addLikeAndUnLike(postId);
    if(isSuccessfully){
      setLike((prev) => !prev);
    }
 
  }
  
  return (
    <i onClick={handleLike} className={`fa-solid fa-heart cursor-pointer ${like ? "text-red-500" : "text-[#637188]"}`}></i>
  )
}
