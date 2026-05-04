import { Avatar } from "@heroui/react";
import Bookmark from "./Bookmark";
import Like from "./Like";
import Share from "./Share";
import Comment from "./Comment";
import Link from "next/link";
import Image from "next/image";
import PostActionsMenu from "./PostActionsMenu";
import { Post } from "@/app/types/post.types";

export default function PostCardUI({post , userId}:{post : Post , userId : string }) {
  return (
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.user._id}`}>
            <Avatar className="ring-2 ring-white/10">
              <Avatar.Image
                alt={post.user.name}
                src={post.user.photo}
              />
              <Avatar.Fallback>
                {post.user.name}
              </Avatar.Fallback>
            </Avatar>
          </Link>

          <div>
            <Link href={`/profile/${post.user._id}`}>
            <h2 className="text-white font-semibold text-sm">
              {post.user.name}
            </h2>
            </Link>
            <p className="text-slate-400 text-xs">
              {(post.createdAt)}
            </p>
          </div>
        </div>

        {userId === post.user._id && (
          <PostActionsMenu post={post} />
        )}
      </header>

      {/* Content */}
      <main className="px-4 pb-3 space-y-3">

        {post.body && (
          <p className="text-slate-200 text-sm leading-relaxed wrap-break-word">
            {post.body}
          </p>
        )}

        {post.image && (
          <div className="rounded-xl overflow-hidden border border-white/10">
            <Image
              src={post.image}
              alt="post image"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-4 py-1.5 border-t border-white/10">

        <div className="flex items-center gap-6 py-1 text-slate-400">

          {/* Like */}
          <div className="flex items-center gap-1 hover:text-indigo-400 transition cursor-pointer">
            <Like postId={post._id} />
            {post.likesCount > 0 && (
              <span className="text-sm ms-0.5">{post.likesCount}</span>
            )}
          </div>

          {/* Comment */}
          <div className="flex items-center gap-1 hover:text-indigo-400 transition cursor-pointer">
            <Comment postId={post._id} />
            {post.commentsCount > 0 && (
              <span className="text-sm ms-0.5">{post.commentsCount}</span>
            )}
          </div>

          {/* Share */}
          <div className="flex items-center gap-1 hover:text-indigo-400 transition cursor-pointer">
            <Share post={post} />
            {post.sharesCount > 0 && (
              <span className="text-sm ms-0.5">{post.sharesCount}</span>
            )}
          </div>
        </div>

        {/* Bookmark */}
        <div className="text-slate-400 hover:text-indigo-400 transition">
          <Bookmark
            postId={post._id}
            isBookmarked={post.bookmarked}
          />
        </div>
      </footer>
    </div>
  )
}
