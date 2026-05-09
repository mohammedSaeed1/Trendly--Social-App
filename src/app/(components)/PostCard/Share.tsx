"use client";
import { useState } from "react";
import { toast, Avatar, Modal, TextArea } from "@heroui/react";
import Image from "next/image";
import { sharePost } from "./PostCard.actions";
import { Post } from "@/app/types/post.types";

export default function Share({ post }: { post: Post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  async function handleShare() {
    try {
      setIsSharing(true);

      const sharedPost= await sharePost(post._id, content.trim());

      if (!sharedPost) {
        toast.danger("Post already shared!");
        return;
      }
      toast.success("Post shared successfully");
      setContent("");
      setIsOpen(false);
    } catch (_) {
      toast.danger("Failed to share post");
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#637188] transition hover:bg-white/10 hover:text-white"
      >
        <i className="fa-solid fa-share" />
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="border border-white/10 bg-slate-900 text-white sm:max-w-xl">
              <Modal.CloseTrigger />

              {/* Header */}
              <Modal.Header className="border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <Avatar.Image
                      src={post.user.photo}
                      alt={post.user.name}
                    />
                    <Avatar.Fallback>U</Avatar.Fallback>
                  </Avatar>

                  <div>
                    <h3 className="text-base font-semibold">Share Post</h3>
                    <p className="text-xs text-slate-400">
                      Add a comment to your share
                    </p>
                  </div>
                </div>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="space-y-4 py-5">
                {/* Optional comment */}
                <TextArea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Say something about this post..."
                  className="w-full resize-none"
                  rows={3}
                />

                {/* Original post preview */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  {post.body && (
                    <p className="whitespace-pre-wrap text-sm text-slate-200">
                      {post.body}
                    </p>
                  )}

                  {post.image && (
                    <div className="mt-3 overflow-hidden rounded-xl">
                      <Image
                        src={post.image}
                        alt="Original post image"
                        width={800}
                        height={500}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="border-t border-white/10 pt-4">
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="ml-auto rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSharing ? "Sharing..." : "Share Post"}
                </button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}