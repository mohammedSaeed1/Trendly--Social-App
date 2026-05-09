"use client";
import {Description,Label,ListBox,Separator,Surface,Avatar,Modal,TextArea,toast} from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { deletePost, updatePost } from "./PostCard.actions";
import { Post } from "@/app/types/post.types";

export default function PostActionsMenu({ post }: { post: Post }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [content, setContent] = useState(post.body || "");
  const [imagePreview, setImagePreview] = useState<string | null>(post.image || null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset modal state whenever it opens
  useEffect(() => {
    if (isEditOpen) {
      setContent(post.body || "");
      setImagePreview(post.image || null);
    }
  }, [isEditOpen, post.body, post.image]);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function openEditModal() {
    setIsEditOpen(true);
    setIsMenuOpen(false);
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleDeletePost() {
    setIsLoading(true);
    const isDeletedSuccessfully = await deletePost(post._id);
    setIsLoading(false);
    setIsMenuOpen(false);
    if (isDeletedSuccessfully) {
      toast.success("Post deleted successfully");
    } else {
      toast.danger("Failed to delete post");
    }
  }

  async function handleEditPost() {
    const formData = new FormData();

    if (content.trim()) {
      formData.append("body", content.trim());
    }

    const selectedFile = fileInputRef.current?.files?.[0];
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    setIsLoading(true);

    const isUpdatedSuccessfully = await updatePost(post._id, formData);

    setIsLoading(false);

    if (isUpdatedSuccessfully) {
      setIsEditOpen(false);
      toast.success("Post updated successfully");
    } else {
      toast.danger("Failed to update post");
    }
  }

  return (
    <div className="relative">
      {/* Menu Trigger */}
      <button
        onClick={toggleMenu}
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
      >
        <i className="fa-solid fa-ellipsis" />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <Surface className="absolute right-0 top-full z-50 mt-2 min-w-56 rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
          <ListBox
            aria-label="Post actions"
            className="p-2"
            selectionMode="none"
          >
            <ListBox.Section>
              <ListBox.Item id="edit-post" textValue="Edit Post">
                <button
                  onClick={openEditModal}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
                    <i className="fa-solid fa-pen-to-square" />
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-sm font-medium text-white">
                      Edit Post
                    </Label>
                    <Description className="text-xs text-slate-400">
                      Update your caption or image
                    </Description>
                  </div>
                </button>
              </ListBox.Item>
            </ListBox.Section>

            <Separator className="bg-white/10" />

            <ListBox.Section>
              <ListBox.Item
                id="delete-post"
                textValue="Delete Post"
                variant="danger"
              >
                <button
                  onClick={handleDeletePost}
                  disabled={isLoading}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                    <i className="fa-solid fa-trash-can" />
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-sm font-medium text-red-400">
                      Delete Post
                    </Label>
                    <Description className="text-xs text-slate-400">
                      Permanently remove this post
                    </Description>
                  </div>
                </button>
              </ListBox.Item>
            </ListBox.Section>
          </ListBox>
        </Surface>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
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
                    <h3 className="text-base font-semibold">Edit Post</h3>
                    <p className="text-xs text-slate-400">
                      Update your post content
                    </p>
                  </div>
                </div>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="space-y-4 py-5">
                <TextArea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full resize-none"
                  rows={3}
                />

                {imagePreview && (
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={imagePreview}
                      alt="Post preview"
                      width={800}
                      height={500}
                      className="h-auto w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
                    >
                      <i className="fa-solid fa-xmark cursor-pointer hover:text-red-500" />
                    </button>
                  </div>
                )}
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="flex items-center justify-between border-t border-white/10 pt-4">
                <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300 transition hover:bg-indigo-500/20">
                  <i className="fa-regular fa-image text-xl" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                <button
                  onClick={handleEditPost}
                  disabled={isLoading}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Updating..." : "Update Post"}
                </button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}