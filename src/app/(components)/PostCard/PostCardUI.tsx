import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import Bookmark from "./Bookmark";
import Like from "./Like";
import Share from "./Share";
import Comment from "./Comment";
import PostActionsMenu from "./PostActionsMenu";

import { Post } from "@/app/types/post.types";
import { formatEgyptDate } from "@/app/utlitis/Date";

export default function PostCardUI({post,userId}: {post: Post , userId: string}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.user._id}`}>
            <Avatar className="ring-2 ring-white/10">
              <Avatar.Image
                alt={post.user.name}
                src={post.user.photo}
              />
              <Avatar.Fallback>{post.user.name}</Avatar.Fallback>
            </Avatar>
          </Link>

          <div>
            <Link href={`/profile/${post.user._id}`}>
              <h2 className="text-sm font-semibold text-white">
                {post.user.name}
              </h2>
            </Link>

            <p className="text-xs text-slate-400">
              {formatEgyptDate(post.createdAt)}
            </p>
          </div>
        </div>

        {userId === post.user._id && <PostActionsMenu post={post} />}
      </header>

      {/* Content */}
      <main className="space-y-3 px-4 pb-3">
        {/* Share caption (optional) */}
        {post.body && (
          <p className="wrap-break-word text-sm leading-relaxed text-slate-200">
            {post.body}
          </p>
        )}

        {/* Shared post preview */}
        {post.sharedPost && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <PostCardUI
              post={post.sharedPost}
              userId={userId}
            />
          </div>
        )}

        {/* Normal post image (only if not a shared post) */}
        {!post.sharedPost && post.image && (
          <div className="relative w-full overflow-hidden rounded-xl border border-white/10">
            <Image
              src={post.image}
              alt="Post image"
              width={1200}
              height={800}
              className="h-auto max-h-150 w-full object-cover"
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-white/10 px-4 py-1.5">
        <div className="flex items-center gap-6 py-1 text-slate-400">
          {/* Like */}
          <div className="flex cursor-pointer items-center gap-1 transition hover:text-indigo-400">
            <Like postId={post._id} />
            {post.likesCount > 0 && (
              <span className="ms-0.5 text-sm">{post.likesCount}</span>
            )}
          </div>

          {/* Comment */}
          <div className="flex cursor-pointer items-center gap-1 transition hover:text-indigo-400">
            <Comment postId={post._id} />
            {post.commentsCount > 0 && (
              <span className="ms-0.5 text-sm">{post.commentsCount}</span>
            )}
          </div>

          {/* Share */}
          <div className="flex cursor-pointer items-center gap-1 transition hover:text-indigo-400">
            <Share post={post} />
            {post.sharesCount > 0 && (
              <span className="ms-0.5 text-sm">{post.sharesCount}</span>
            )}
          </div>
        </div>

        {/* Bookmark */}
        <div className="text-slate-400 transition hover:text-indigo-400">
          <Bookmark
            postId={post._id}
            isBookmarked={post.bookmarked}
          />
        </div>
      </footer>
    </div>
  );
}