"use client";

import { useState } from "react";
import { getBookmarks } from "../profile/profile.actions";
import { Post } from "@/app/types/post.types";
import { toast } from "@heroui/react";
import PostCardUI from "../PostCard/PostCardUI";

export default function BookmarkPosts() {
  const [bookmarks, setBookmarks] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  async function handleToggle() {
    try {
      setIsVisible((prev) => !prev);

      if (!bookmarks) {
        setIsLoading(true);
        const data = await getBookmarks();
        setBookmarks(data);
      }
    } catch {
      toast.danger("Failed to load bookmarks");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
      >
        <i className="fa-solid fa-bookmark text-lg"></i>
        <span className="text-sm font-medium cursor-pointer">
          Saved Posts
        </span>
      </button>

      {isVisible && (
        <div className="space-y-4">

          {isLoading && (
            <p className="text-sm text-gray-500">
              Loading...
            </p>
          )}

          {!isLoading && bookmarks?.length === 0 && (
            <p className="text-sm text-gray-500">
              No saved posts
            </p>
          )}



          {bookmarks && bookmarks.length > 0 && (
            <div className="space-y-4">
              {bookmarks.map((post) => (
                <div key={post._id} className="rounded-xl shadow-sm p-3">
                  <PostCardUI post={post} userId={post.user._id}/> 
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}