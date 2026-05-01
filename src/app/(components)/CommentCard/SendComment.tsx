"use client"
import { useRef } from "react";
import {toast } from "@heroui/react";
import { createComment } from "../PostCard/PostCard.actions";
import Image from "next/image";
import { Post } from "@/app/types/post.types";

export default function SendComment({post}:{post : Post}) {

    const commentContent = useRef();

    async function handleSendComment() {
        const postObj = new FormData();
        if (commentContent.current?.value) {
            postObj.append("content", commentContent.current.value);
        }
        const isSendSuccessfully = await createComment(post._id, postObj);
        if (isSendSuccessfully) {
            toast.success("Comment created successfully");
            commentContent.current.value = "";
        }
        else {
            toast.danger("Error happened while creating this comment!!");
        }

    }
    return (
        <div className="w-full max-w-xl mx-auto bg-[##1D2E48] p-4 space-y-4 shadow-sm ">
            {/* Input Section */}
            <div className="flex items-center gap-3 border-b pb-4">
                <Image src={post.user.photo} width={300} height={300} alt={post.user.name} className="w-9 h-9 rounded-full object-cover" />
                <input
                   ref={commentContent}
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 outline-none text-sm placeholder:text-gray-500"
                />
                <button onClick={handleSendComment} className="text-blue-500 cursor-pointer font-semibold text-sm hover:text-blue-600 transition">
                    Post
                </button>
            </div>
        </div>
    )
}
