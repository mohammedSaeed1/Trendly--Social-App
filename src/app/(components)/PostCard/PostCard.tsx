import { formatEgyptDate } from "@/app/services/post.service";
import { Post } from "@/app/types/post.types";
import { Avatar} from "@heroui/react";
import Bookmark from "./Bookmark";
import Like from "./Like";
import Share from "./Share";

export default function PostCard({post}: {post: Post}) {

    
    return (
        <>
            <div className="bg-[#1D2E48] md:p-5 md:w-1/3 mx-auto my-2 rounded-lg border-4 border-[#2B3767]">

                <header className="flex justify-between items-center p-1.5">
                    <div className="flex">
                    <Avatar>
                        <Avatar.Image alt={post.user.name} src={post.user.photo} />
                        <Avatar.Fallback>{post.user.name}</Avatar.Fallback>
                    </Avatar>
                    <div>
                        <h2 className="ms-1.5 text-white">{post.user.name}</h2>
                        <h3 className="ms-1.5 text-gray-400 text-xs">{formatEgyptDate(post.createdAt)}</h3>
                    </div>
                    </div>
                    <i className="fa-solid fa-ellipsis text-[#637188]"></i>
            
                </header>
                <main className="p-1.5">
                   {post.body && <p className="text-red-400 wrap-break-word">{post.body}</p>}
                   {post.image && <img src={post.image} alt={"Fixed"} className="w-full"/>}
                </main>
                <footer className="flex items-center gap-x-5 justify-evenly p-1.5">
                <div className="flex items-center gap-x-1 text-[#637188]">
                    <Like postId={post._id} />
                  {post.likesCount > 0 && <h4>{post.likesCount}</h4>}  
                </div>
                 <div className="flex items-center gap-x-1 text-[#637188]">
                   <i className="fa-regular fa-comment"></i>
                   {post.commentsCount > 0 && <h4>{post.commentsCount}</h4>}
                </div>
                 <div className="flex items-center gap-x-1 text-[#637188]">
                    <Share post={post} />
                   {post.sharesCount > 0 && <h4>{post.sharesCount}</h4>}    
                </div>
    
               <Bookmark postId={post._id} isBookmarked={post.bookmarked}/>
                </footer>
            </div>
        </>
    )
}
