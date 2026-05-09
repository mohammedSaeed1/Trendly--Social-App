"use client";

import { useContext, useRef, useState } from "react";
import { toast } from "@heroui/react";
import { createComment } from "../PostCard/PostCard.actions";
import { Post } from "@/app/types/post.types";
import { UserContext } from "@/app/Context/UserContext";

export default function SendComment({ post }: { post: Post }) {
  const userContext = useContext(UserContext);
  const commentContent = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!userContext) return null;
  const { loggedUser } = userContext;

  async function handleSendComment() {
    if (!commentContent.current?.value.trim()) return;

    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("content", commentContent.current.value);

      const ok = await createComment(post._id, form);

      if (ok) {
        toast.success("Comment added");
        commentContent.current.value = "";
      } else {
        toast.danger("Failed to comment");
      }
    } catch {
      toast.danger("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 border border-white/10 bg-white/5 rounded-xl px-3 sm:px-4 py-2 sm:py-3 w-full">

      {/* Avatar */}
      <img
        src={loggedUser.user.photo}
        alt={loggedUser.user.name}
        className="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover shrink-0"
      />

      {/* Input */}
      <input
        ref={commentContent}
        placeholder="Write a comment..."
        className="
          flex-1
          bg-transparent
          outline-none
          text-sm sm:text-base
          text-white
          placeholder:text-slate-400
          min-w-0
        "
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSendComment();
        }}
      />

      {/* Button */}
      <button
        onClick={handleSendComment}
        disabled={isLoading}
        className="
          bg-indigo-500 hover:bg-indigo-600
          disabled:opacity-50 disabled:cursor-not-allowed
          text-white text-xs sm:text-sm
          px-3 sm:px-4 py-1.5
          rounded-lg transition
          shrink-0
        "
      >
        {isLoading ? "..." : "Post"}
      </button>
    </div>
  );
}