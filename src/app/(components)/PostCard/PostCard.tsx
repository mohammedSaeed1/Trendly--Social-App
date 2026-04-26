import { Post } from "@/app/types/post.types";
import { Avatar } from "@heroui/react";
import Image from "next/image";
export default function PostCard({post}: {post: Post}) {
       
    return (
        <>
            <div className="bg-green-400 p-5 w-1/2 my-2">

                <header className="flex">
                    <Avatar>
                        <Avatar.Image alt={post.user.name} src={post.user.photo} />
                        <Avatar.Fallback>{post.user.name}</Avatar.Fallback>
                    </Avatar>
                    <div>
                        <h2 className="ms-1.5 text-white">{post.user.name}</h2>
                        <h3 className="ms-1.5 text-gray-400">{post.createdAt}</h3>
                    </div>
                </header>
                <main>
                    <p>{post.body}</p>
                    <Image src={post.image} alt={"Fixed"} width={500} height={200}/>
                </main>
                <footer className="flex items-center justify-between">
                <div className="flex items-center gap-x-1">
                    <i className="fa-regular fa-heart"></i>
                    <h4>{post.likesCount}</h4>
                    <h4>Likes</h4>               
                </div>
                 <div className="flex items-center gap-x-1">
                   <i className="fa-regular fa-comment"></i>
                    <h4>{post.commentsCount}</h4>
                    <h4>Comments</h4>               
                </div>
                 <div className="flex items-center gap-x-1">
                    <i className="fa-solid fa-share-nodes"></i>
                    <h4>{post.sharesCount}</h4>               
                </div>
                </footer>
            </div>
        </>
    )
}
