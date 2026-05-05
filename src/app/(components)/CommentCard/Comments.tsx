"use client";

import { Comment } from "@/app/types/comment.types";
import {addLikeAndUnlikeComment,createReply,deleteComment,getCommentReplies,updateComment} from "../PostCard/PostCard.actions";
import { toast } from "@heroui/react";
import { useRef, useState } from "react";
import { Post } from "@/app/types/post.types";

export default function Comments({comments,post,loggedUserId}: {comments: Comment[],post: Post , loggedUserId : string}) {
  const [activeEditCommentId, setActiveEditCommentId] = useState<string | null>(null);
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);
  const [visibleRepliesCommentId, setVisibleRepliesCommentId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, Comment[]>>({});
  const editContentInput = useRef<HTMLInputElement>(null);
  const replyContentInput = useRef<HTMLInputElement>(null);


 

  function handleInputForUpdate(commentId: string) {
    setActiveEditCommentId((prev) => (prev === commentId ? null : commentId));
    setActiveReplyCommentId(null);
  }

  function handleReplyInput(commentId: string) {
    setActiveReplyCommentId((prev) => (prev === commentId ? null : commentId));
    setActiveEditCommentId(null);
  }

  async function handleUpdateComment(commentId: string) {
    const formData = new FormData();

    if (editContentInput.current?.value) {
      formData.append("content", editContentInput.current.value);
    }

    const ok = await updateComment(post._id, commentId, formData);

    if (ok) {
      toast.success("Comment updated");
      if (editContentInput.current) editContentInput.current.value = "";
      setActiveEditCommentId(null);
    } else {
      toast.danger("Failed to update comment");
    }
  }

  async function handleDeleteComment(commentId: string) {
    const ok = await deleteComment(post._id, commentId);

    if (ok) {
      toast.success("Comment deleted");
    } else {
      toast.danger("Failed to delete");
    }
  }

  async function handleLike(commentId: string) {
    const ok = await addLikeAndUnlikeComment(post._id, commentId);

    if (!ok) toast.danger("Like failed");
  }

  async function handleReplySubmit(commentId: string) {
    const formData = new FormData();

    if (replyContentInput.current?.value) {
      formData.append("content", replyContentInput.current.value);
    }

    const ok = await createReply(post._id, commentId, formData);

    if (ok) {
      toast.success("Reply added");
      if (replyContentInput.current) replyContentInput.current.value = "";
      setActiveReplyCommentId(null);
    } else {
      toast.danger("Failed to reply");
    }
  }

  async function displayReplies(commentId: string) {
    if (visibleRepliesCommentId === commentId) {
      setVisibleRepliesCommentId(null);
      return;
    }

    if (!replies[commentId]) {
      const data = await getCommentReplies(post._id, commentId);

      setReplies((prev) => ({
        ...prev,
        [commentId]: data,
      }));
    }

    setVisibleRepliesCommentId(commentId);
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment._id} className="flex gap-3">

          {/* Avatar */}
          <img
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
            className="rounded-full w-9 h-9 object-cover"
          />

          <div className="flex-1">

            {/* Comment Bubble */}
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md">
              <p className="text-sm text-white leading-relaxed">
                <span className="font-semibold mr-2">
                  {comment.commentCreator.name}
                </span>
                {comment.content}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 flex-wrap">

              <span>
                {new Date(comment.createdAt).toLocaleDateString("en-EG")}
              </span>

              {comment.likes.length > 0 && (
                <span>{comment.likes.length} likes</span>
              )}

              <button
                onClick={() => handleReplyInput(comment._id)}
                className="hover:text-indigo-400 transition"
              >
                Reply
              </button>

              { loggedUserId === comment.commentCreator._id && (
                <>
                  <button
                    onClick={() => handleInputForUpdate(comment._id)}
                    className="hover:text-indigo-400 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-400 hover:text-red-500 transition"
                  >
                    Delete
                  </button>
                </>
              )}

              {comment.repliesCount > 0 && (
                <button
                  onClick={() => displayReplies(comment._id)}
                  className="hover:text-indigo-400 transition"
                >
                  {visibleRepliesCommentId === comment._id
                    ? "Hide replies"
                    : `View replies (${comment.repliesCount})`}
                </button>
              )}
            </div>

            {/* Edit Input */}
            {activeEditCommentId === comment._id && (
              <div className="flex items-center gap-2 mt-3">
                <input
                  ref={editContentInput}
                  placeholder="Update comment..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                />

                <button
                  onClick={() => handleUpdateComment(comment._id)}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            )}

            {/* Reply Input */}
            {activeReplyCommentId === comment._id && (
              <div className="flex items-center gap-2 mt-3 ml-2">
                <input
                  ref={replyContentInput}
                  placeholder={`Reply to ${comment.commentCreator.name}...`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                />

                <button
                  onClick={() => handleReplySubmit(comment._id)}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            )}

            {/* Replies */}
            {visibleRepliesCommentId === comment._id && (
              <div className="ml-4 mt-3 space-y-3 border-l border-white/10 pl-4">
                {replies[comment._id]?.length > 0 ? (
                  replies[comment._id].map((reply) => (
                    <div
                      key={reply._id}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-md"
                    >
                      <div className="flex items-start gap-3">

                        <img src={reply.commentCreator.photo} alt={reply.commentCreator.name} className="w-8 h-8 rounded-full object-cover"/>

                        <div className="flex-1">
                          <p className="text-sm text-white">
                            <span className="font-semibold mr-2">
                              {reply.commentCreator.name}
                            </span>
                            {reply.content}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {new Date(reply.createdAt).toLocaleString("en-EG")}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">
                    No replies yet
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Like Button */}
          <button
            onClick={() => handleLike(comment._id)}
            className="text-slate-400 hover:text-red-400 transition"
          >
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      ))}
    </div>
  );
}