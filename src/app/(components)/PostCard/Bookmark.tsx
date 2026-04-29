"use client"

import { addBookmarkAndUnBookmark} from "./PostCard.actions"
import { useState } from 'react';


 export default function Bookmark({postId , isBookmarked} : {postId:string , isBookmarked:boolean}){

  const [bookmark , setBookmark] = useState(isBookmarked);


  async function handleBookmark(){
    const isSuccessfully = await addBookmarkAndUnBookmark(postId);
    if(isSuccessfully){
       setBookmark((prev) => !prev);
    }
  }
  
  return (
    <i onClick={handleBookmark} className={`fa-solid fa-bookmark cursor-pointer ms-auto ${bookmark ? 'text-yellow-300': "text-[#637188]" }`}></i>
  )
}
