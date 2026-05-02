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
import { useRef, useState } from "react";
import { Post } from "@/app/types/post.types";

export default function Comments({
  comments,
  post,
}: {
  comments: Comment[];
  post: Post;
}) {
  const [activeEditCommentId, setActiveEditCommentId] = useState<string | null>(
    null
  );

  const [activeReplyCommentId, setActiveReplyCommentId] =
    useState<string | null>(null);

  const [visibleRepliesCommentId, setVisibleRepliesCommentId] = useState<
    string | null
  >(null);

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
    const updatedContent = new FormData();

    if (editContentInput.current?.value) {
      updatedContent.append("content", editContentInput.current.value);
    }

    const isUpdatedSuccessfully = await updateComment(
      post._id,
      commentId,
      updatedContent
    );

    if (isUpdatedSuccessfully) {
      toast.success("Comment updated successfully");
      if (editContentInput.current) editContentInput.current.value = "";
      setActiveEditCommentId(null);
    } else {
      toast.danger("Failed to update comment");
    }
  }

  async function handleDeleteComment(commentId: string) {
    const isDeletedSuccessfully = await deleteComment(post._id, commentId);

    if (isDeletedSuccessfully) {
      toast.success("Comment deleted successfully");
    } else {
      toast.danger("Comment was not deleted");
    }
  }

  async function handleAddLikeAndUnlike(commentId: string) {
    const isSuccessfully = await addLikeAndUnlikeComment(post._id, commentId);

    if (!isSuccessfully) {
      toast.danger("Can't like this comment");
    }
  }

  async function handleReplySubmit(commentId: string) {
    const formObj = new FormData();

    if (replyContentInput.current?.value) {
      formObj.append("content", replyContentInput.current.value);
    }

    const isCreatedSuccessfully = await createReply(
      post._id,
      commentId,
      formObj
    );

    if (isCreatedSuccessfully) {
      toast.success("Reply added successfully");
      if (replyContentInput.current) replyContentInput.current.value = "";
      setActiveReplyCommentId(null);
    } else {
      toast.danger("Failed to add reply to this comment!!");
    }
  }

  async function displayReplies(commentId: string) {
    if (visibleRepliesCommentId === commentId) {
      setVisibleRepliesCommentId(null);
      return;
    }

    if (!replies[commentId]) {
      const fetchedReplies: Comment[] = await getCommentReplies(
        post._id,
        commentId
      );

      setReplies((prev) => ({
        ...prev,
        [commentId]: fetchedReplies,
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
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="flex-1">
            {/* Main Comment */}
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <p className="text-sm leading-6 break-words">
                  <span className="font-semibold text-sm mr-2 cursor-pointer">
                    {comment.commentCreator.name}
                  </span>

                  <span className="text-gray-800">{comment.content}</span>
                </p>

                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                  <span>
                    {new Date(comment.createdAt).toLocaleDateString("en-EG", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>

                  <span>
                    {comment.likes.length > 0 && `${comment.likes.length} likes`}
                  </span>

                  <button
                    onClick={() => handleReplyInput(comment._id)}
                    className="font-semibold cursor-pointer"
                  >
                    Reply
                  </button>


                  {post.user._id === comment.commentCreator._id && <>
                  <button
                    onClick={() => handleInputForUpdate(comment._id)}
                    className="font-semibold cursor-pointer"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="font-semibold cursor-pointer text-red-500"
                  >
                    Delete
                  </button>
                  </>}


                  {comment.repliesCount > 0 && (
                    <button
                      onClick={() => displayReplies(comment._id)}
                      className="font-semibold cursor-pointer"
                    >
                      {visibleRepliesCommentId === comment._id
                        ? "Hide replies"
                        : `View replies (${comment.repliesCount})`}
                    </button>
                  )}
                </div>
              </div>

              {/* Like */}
              <button className="pt-1">
                <i
                  onClick={() => handleAddLikeAndUnlike(comment._id)}
                  className="fa-regular fa-heart cursor-pointer text-sm"
                ></i>
              </button>
            </div>

            {/* Update Input */}
            {activeEditCommentId === comment._id && (
              <div className="flex items-center gap-2 mt-3">
                <input
                  ref={editContentInput}
                  placeholder="Update your comment..."
                  className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                />

                <button
                  onClick={() => handleUpdateComment(comment._id)}
                  className="text-blue-500"
                >
                  <i className="fa-regular fa-paper-plane text-lg cursor-pointer"></i>
                </button>
              </div>
            )}

            {/* Reply Input */}
            {activeReplyCommentId === comment._id && (
              <div className="flex items-center gap-2 mt-3 ml-2">
                <input
                  ref={replyContentInput}
                  placeholder={`Reply to ${comment.commentCreator.name}...`}
                  className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                />

                <button
                  onClick={() => handleReplySubmit(comment._id)}
                  className="text-blue-500"
                >
                  <i className="fa-regular fa-paper-plane text-lg cursor-pointer"></i>
                </button>
              </div>
            )}

            {/* Replies */}
            {visibleRepliesCommentId === comment._id && (
              <div className="ml-4 mt-3 border-l border-gray-200 pl-4 space-y-3">
                {replies[comment._id]?.length > 0 ? (
                  replies[comment._id].map((reply) => (
                    <div
                      key={reply._id}
                      className="rounded-xl bg-gray-50 p-3 shadow-sm transition hover:bg-gray-100"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={reply.commentCreator?.photo}
                          alt={reply.commentCreator?.name}
                          className="h-10 w-10 rounded-full object-cover border border-gray-200"
                        />

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {reply.commentCreator?.name}
                              </p>

                              <p className="text-xs text-gray-400">
                                {reply.createdAt
                                  ? new Date(reply.createdAt).toLocaleString(
                                      "en-EG"
                                    )
                                  : "Just now"}
                              </p>
                            </div>
                          </div>

                          <p className="mt-2 text-sm leading-relaxed text-gray-700 break-words">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No replies yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}