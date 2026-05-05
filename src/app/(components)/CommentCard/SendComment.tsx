"use client"
import { useRef } from "react";
import {toast } from "@heroui/react";
import { createComment } from "../PostCard/PostCard.actions";
import { Post } from "@/app/types/post.types";

export default function SendComment({ post }: { post: Post }) {
  const commentContent = useRef<HTMLInputElement>(null);

  async function handleSendComment() {
    const form = new FormData();

    if (commentContent.current?.value) {
      form.append("content", commentContent.current.value);
    }

    const ok = await createComment(post._id, form);

    if (ok) {
      toast.success("Comment added");
      if (commentContent.current) commentContent.current.value = "";
    } else {
      toast.danger("Failed to comment");
    }
  }

  return (
    <div className="flex items-center gap-3 border border-white/10 bg-white/5 rounded-xl px-4 py-3">

      <img
        src={post.user.photo}
        alt={post.user.name}
        className="rounded-full w-10 h-10 object-cover"
      />

      <input
        ref={commentContent}
        placeholder="Write a comment..."
        className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-slate-400"
      />

      <button
        onClick={handleSendComment}
        className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-lg transition"
      >
        Post
      </button>
    </div>
  );
}
