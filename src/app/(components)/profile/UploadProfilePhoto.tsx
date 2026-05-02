"use client"
import { UserProfile } from "@/app/types/user.types";
import { Modal, toast } from "@heroui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { uploadProfilePhoto } from "./profile.actions";

export function UploadProfilePhoto({ user }: { user: UserProfile }) {

    const [isOpen, setIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const postImage = useRef<HTMLInputElement>(null!);

    function handleOpenModal() {
        setIsOpen((prev) => !prev);
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleRemoveImage() {
        setImagePreview(null);
        postImage.current.value = "";
    }
    async function handleUploadProfileImage() {
        const photo = new FormData();
        if (postImage.current.value) {
            photo.append("photo", postImage.current.files[0]);
        }
        const isUploadedSuccessfully = await uploadProfilePhoto(photo);
        if (isUploadedSuccessfully) {
            setIsOpen(false);
            toast.success("Profile picture updated successfully");
        }
        else toast.danger("Failed while updating Profile picture!!");
    }

    return (
        <>
            {/* ── Avatar trigger ── */}
            <div className="absolute -top-8 left-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-[3px] border-background bg-blue-100 text-xl font-semibold text-blue-700">
                <Image
                    src={user?.user?.photo}
                    alt={user?.user?.name}
                    width={64}
                    height={64}
                    className="h-full w-full cursor-pointer object-cover"
                    onClick={handleOpenModal}
                />
            </div>

            {/* ── Modal ── */}
            <Modal
                isOpen={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
            >
                <Modal.Backdrop variant="blur">
                    <Modal.Container>
                        <Modal.Dialog className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-0 shadow-xl">

                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                                <h3 className="text-base font-semibold text-gray-800">
                                    Profile photo
                                </h3>
                                <Modal.CloseTrigger className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200">
                                    <i className="fa-solid fa-xmark text-sm" />
                                </Modal.CloseTrigger>
                            </div>

                            {/* Body — photo preview */}
                            <Modal.Body className="flex flex-col items-center gap-4 px-5 py-6">
                                <div className="relative h-52 w-52 overflow-hidden rounded-full ring-4 ring-gray-100">
                                    <Image
                                        src={imagePreview ?? user?.user?.photo}
                                        alt={user?.user?.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Name below avatar */}
                                <div className="text-center">
                                    <p className="text-base font-semibold text-gray-800">{user?.user?.name}</p>
                                    <p className="text-sm text-gray-400">@{user?.user?.username}</p>
                                </div>
                            </Modal.Body>

                            {/* Footer — actions */}
                            <Modal.Footer className="flex items-center justify-between border-t border-gray-100 px-5 py-4">

                                {/* Upload new photo */}
                                <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100">
                                    <i className="fa-regular fa-image text-base" />
                                    Upload photo
                                    <input
                                        type="file"
                                        ref={postImage}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        hidden
                                    />
                                </label>

                                {/* Remove preview — only shown when a new image is selected */}
                                {imagePreview && (
                                    <>
                                        <button
                                            onClick={handleRemoveImage}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100"
                                        >
                                            <i className="fa-solid fa-trash text-sm" />
                                            Remove
                                        </button>
                                        <br />
                                        <button
                                            onClick={handleUploadProfileImage}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100"
                                        >
                                            <i className="fa-solid fa-trash text-sm" />
                                            Change profile picture
                                        </button>
                                    </>

                                )}

                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}