"use client";
import { Avatar, Input, Modal, TextArea, toast, Button } from "@heroui/react";
import Image from "next/image";
import { useState, useRef } from "react";
import { createPost } from "./CreatePost.actions";
import { UserProfilee } from "@/app/types/user.types";

export default function CreatePost({ user }: { user: UserProfilee }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const postContent = useRef<HTMLTextAreaElement | null>(null);
  const postImage = useRef<HTMLInputElement | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleRemoveImage() {
    setImagePreview(null);
    if (postImage.current) {
      postImage.current.value = "";
    }
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  async function handleCreatePost() {
    const postObj = new FormData();

    if (postContent.current?.value.trim()) {
      postObj.append("body", postContent.current.value);
    }

    if (postImage.current?.files?.[0]) {
      postObj.append("image", postImage.current.files[0]);
    }

    const createdPost = await createPost(postObj);

    if (createdPost) {
      setImagePreview(null);

      if (postContent.current) postContent.current.value = "";
      if (postImage.current) postImage.current.value = "";

      toast.success("Post created successfully ✅");
      setIsOpen(false);
    } else {
      toast.danger("Failed to create post ❌");
    }
  }

  return (
    <>
      {/* Main Create Box */}
      <div className="w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-4">

        <header className="flex items-center gap-3">
          <Avatar className="shrink-0">
            <Avatar.Image
              alt={user.name}
              src={user.photo}
            />
            <Avatar.Fallback>{user.name.slice(0, 1).toUpperCase()}</Avatar.Fallback>
          </Avatar>

          <Input
            onClick={handleOpenModal}
            aria-label="Post Content"
            placeholder={`What's on your mind , ${user.name} ?`}
            readOnly
            className="cursor-pointer w-full bg-white/5 border border-white/10 hover:border-indigo-400 transition text-white placeholder:text-slate-400"/>
        </header>

        <footer className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
          <label onClick={handleOpenModal} className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition cursor-pointer">
            <i className="fa-regular fa-image text-lg"></i>
            <span className="text-sm font-medium">Photo</span>
          </label>

          <Button
            onClick={handleOpenModal}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6"
          >
            Post
          </Button>
        </footer>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-2xl shadow-2xl">

              <Modal.CloseTrigger />

              {/* Header */}
              <Modal.Header className="border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <Avatar.Image
                      alt={user.name}
                      src={user.photo}
                    />
                    <Avatar.Fallback>{user.name.slice(0,1).toUpperCase()}</Avatar.Fallback>
                  </Avatar>

                  <div>
                    <h3 className="text-white font-semibold">
                      Create Post
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Share your thoughts with your community
                    </p>
                  </div>
                </div>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="space-y-4 py-6">

                <TextArea
                  ref={postContent}
                  placeholder="What do you want to talk about?"
                  className="w-full resize-none bg-white/5 border border-white/10 hover:border-indigo-400 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/30 transition text-white placeholder:text-slate-400 min-h-30"/>

                {imagePreview && (
                  <div className="relative rounded-xl overflow-hidden border border-white/10 h-64">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />

                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                    >
                      <i className="fa-solid fa-xmark cursor-pointer"></i>
                    </button>
                  </div>
                )}
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="flex items-center justify-between border-t border-white/10">

                <label className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 cursor-pointer transition">
                  <i className="fa-regular fa-image text-xl"></i>
                  <span>Add Photo</span>
                  <input
                    type="file"
                    ref={postImage}
                    onChange={handleImageChange}
                    hidden
                  />
                </label>

                <Button
                  onClick={handleCreatePost}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 shadow-lg shadow-indigo-500/30"
                >
                  Publish
                </Button>

              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}