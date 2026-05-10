"use client";

import { Comment } from "@/app/types/comment.types";
import {
  addLikeAndUnlikeComment,
  createReply,
  deleteComment,
  getCommentReplies,
  updateComment,
} from "../PostCard/PostCard.actions";
import { toast } from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { Post } from "@/app/types/post.types";
import { UserContext } from "@/app/Context/UserContext";
import { useRouter } from "next/navigation";

export default function Comments({
  comments,
  post,
}: {
  comments: Comment[];
  post: Post;
}) {
  const userContext = useContext(UserContext);

  const [activeEditCommentId, setActiveEditCommentId] = useState<string | null>(null);
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);
  const [visibleRepliesCommentId, setVisibleRepliesCommentId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, Comment[]>>({});

  const editContentInput = useRef<HTMLInputElement>(null);
  const replyContentInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  if (!userContext) return null;
  const { loggedUser } = userContext;

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

    if (ok) toast.success("Comment deleted");
    else toast.danger("Failed to delete");
  }

  async function handleLike(commentId: string) {
    const ok = await addLikeAndUnlikeComment(post._id, commentId);
    if(ok) router.refresh();
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
      setReplies((prev) => ({ ...prev, [commentId]: data }));
    }

    setVisibleRepliesCommentId(commentId);
  }

  return (
    <div className="space-y-6 w-full">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex gap-2 sm:gap-3 items-start"
        >

          {/* Avatar */}
          <img
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
            className="rounded-full w-8 h-8 sm:w-9 sm:h-9 object-cover shrink-0"
          />

          <div className="flex-1 min-w-0">

            {/* Comment */}
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md">
              <p className="text-sm text-white leading-relaxed wrap-break-word">
                <span className="font-semibold mr-2">
                  {comment.commentCreator.name}
                </span>
                {comment.content}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-[11px] sm:text-xs text-slate-400">

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

              {loggedUser.user._id === comment.commentCreator._id && (
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
                    : `Replies (${comment.repliesCount})`}
                </button>
              )}
            </div>

            {/* Edit */}
            {activeEditCommentId === comment._id && (
              <div className="flex gap-2 mt-3">
                <input
                  ref={editContentInput}
                  placeholder="Update comment..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none min-w-0"
                />
                <button
                  onClick={() => handleUpdateComment(comment._id)}
                  className="text-indigo-400 hover:text-indigo-300 shrink-0"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            )}

            {/* Reply */}
            {activeReplyCommentId === comment._id && (
              <div className="flex gap-2 mt-3 ml-0 sm:ml-2">
                <input
                  ref={replyContentInput}
                  placeholder={`Reply to ${comment.commentCreator.name}...`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none min-w-0"
                />
                <button
                  onClick={() => handleReplySubmit(comment._id)}
                  className="text-indigo-400 hover:text-indigo-300 shrink-0"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            )}

            {/* Replies */}
            {visibleRepliesCommentId === comment._id && (
              <div className="ml-2 sm:ml-4 mt-3 space-y-3 border-l border-white/10 pl-3 sm:pl-4">
                {replies[comment._id]?.length > 0 ? (
                  replies[comment._id].map((reply) => (
                    <div
                      key={reply._id}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-md"
                    >
                      <div className="flex gap-2 sm:gap-3">

                        <img
                          src={reply.commentCreator.photo}
                          alt={reply.commentCreator.name}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white wrap-break-word">
                            <span className="font-semibold mr-2">
                              {reply.commentCreator.name}
                            </span>
                            {reply.content}
                          </p>

                          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
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
          {/* Like */}
          <button
            onClick={() => handleLike(comment._id)}
            className="text-slate-400 transition shrink-0 pt-3"
          >
            <i className="fa-regular fa-heart text-md cursor-pointer"></i>
          </button>

        </div>
      ))}
    </div>
  );
}