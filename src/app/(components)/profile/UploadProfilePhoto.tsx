"use client";

import { UserProfile } from "@/app/types/user.types";
import { Modal, toast } from "@heroui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { uploadProfilePhoto } from "./profile.actions";

export function UploadProfilePhoto({
  user,
  loggedInUserId,
}: {
  user: UserProfile;
  loggedInUserId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const postImage = useRef<HTMLInputElement>(null!);

  function handleOpenModal() {
    setIsOpen((prev) => !prev);
  }

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.files?.[0]) {
      setImagePreview(
        URL.createObjectURL(e.target.files[0])
      );
    }
  }

  function handleRemoveImage() {
    setImagePreview(null);

    if (postImage.current) {
      postImage.current.value = "";
    }
  }

  async function handleUploadProfileImage() {
    try {
      setIsLoading(true);

      const photo = new FormData();

      if (postImage.current?.files?.[0]) {
        photo.append(
          "photo",
          postImage.current.files[0]
        );
      }

      const isUploadedSuccessfully =
        await uploadProfilePhoto(photo);

      if (isUploadedSuccessfully) {
        toast.success(
          "Profile picture updated successfully"
        );

        setIsOpen(false);
        setImagePreview(null);
      } else {
        toast.danger(
          "Failed while updating profile picture"
        );
      }
    } catch {
      toast.danger("Network error happened");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Avatar */}
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-slate-950 shadow-2xl">

        <Image
          src={imagePreview || user?.photo}
          alt={user?.name}
          fill
          className="object-cover"
        />

        {/* Camera Button */}
        {loggedInUserId === user?._id && (
          <button
            onClick={handleOpenModal}
            className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg transition hover:scale-105 hover:bg-indigo-600"
          >
            <i className="fa-solid fa-camera text-sm"></i>
          </button>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-white shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">

                <div>
                  <h3 className="text-lg font-semibold">
                    Profile Photo
                  </h3>

                  <p className="text-sm text-slate-400">
                    Change your profile picture
                  </p>
                </div>

                <Modal.CloseTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white">
                  <i className="fa-solid fa-xmark"></i>
                </Modal.CloseTrigger>
              </div>

              {/* Body */}
              <Modal.Body className="px-6 py-8">

                <div className="flex flex-col items-center">

                  {/* Preview */}
                  <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/10 shadow-xl">

                    <Image
                      src={imagePreview || user?.photo}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name */}
                  <div className="mt-5 text-center">
                    <h4 className="text-xl font-semibold text-white">
                      {user?.name}
                    </h4>

                    <p className="text-sm text-slate-400">
                      @{user?.username}
                    </p>
                  </div>
                </div>
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4">

                {/* Upload */}
                <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10">

                  <i className="fa-regular fa-image"></i>

                  Choose Photo

                  <input
                    type="file"
                    ref={postImage}
                    onChange={handleImageChange}
                    accept="image/*"
                    hidden
                  />
                </label>

                <div className="flex items-center gap-3">

                  {/* Remove */}
                  {imagePreview && (
                    <button
                      onClick={handleRemoveImage}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  )}

                  {/* Save */}
                  <button
                    disabled={!imagePreview || isLoading}
                    onClick={handleUploadProfileImage}
                    className="rounded-xl bg-indigo-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-spinner animate-spin"></i>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}