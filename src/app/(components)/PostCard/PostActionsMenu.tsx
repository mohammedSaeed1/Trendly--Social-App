"use client";
import { Description, Label, ListBox, Separator, Surface } from "@heroui/react";
import { RefObject, useRef, useState } from "react";
import { deletePost, updatePost } from "./PostCard.actions";
import { Avatar, Modal, TextArea, toast } from "@heroui/react";
import Image from "next/image";
import { Post } from "@/app/types/post.types";

export default function PostActionsMenu({ post }: { post: Post }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isElipsModal, setIsElipsModal] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const postContent = useRef<RefObject>();
    const postImage = useRef<RefObject>();

    function handleElipsModal() {
        setIsElipsModal((prev) => !prev);
    }
    function handleOpenModal() {
        setIsOpen((prev) => !prev);
    }
    function handleImageChange(e) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    function handleRemoveImage() {
        setImagePreview(null);
        postImage.current.value = "";
    }
    async function handleDeletePost() {
        const isDeletedSuccessfully = await deletePost(post._id);
        if (isDeletedSuccessfully) {
            setIsOpen(false);
            toast.success("Post deleted successfully");
        }
        else toast.danger("Failed to delete post");
    }
    async function handleEditPost() {
        const postObj = new FormData();
        if (postContent.current?.value) {
            postObj.append("body", postContent.current.value);
        }
        if (postImage.current?.value) {
            postObj.append("image", postImage.current.files[0]);
        }
        const isUpdatedSuccessfully = await updatePost(post._id, postObj);
        if (isUpdatedSuccessfully) {
            setIsOpen(false);
            setIsElipsModal(false);
            if (postContent.current?.value) postContent.current.value = "";
            if (postImage.current?.value) postImage.current.value = "";
            toast.success("Post updated successfully");
        }
        else toast.danger("Failed to update post");
    }


    return (
        <>
            <div className="relative inline-block">
                <i
                    onClick={handleElipsModal}
                    className="fa-solid fa-ellipsis text-[#637188] cursor-pointer"
                ></i>

                {isElipsModal && (
                    <Surface className="absolute right-0 top-full mt-2 z-50 rounded-3xl shadow-surface min-w-55 bg-white">
                        <ListBox
                            aria-label="File actions"
                            className="w-full p-2"
                            selectionMode="none"
                        >
                            <ListBox.Section>
                                <ListBox.Item id="edit-post" textValue="Edit Post">
                                    <div onClick={handleOpenModal} className="flex items-center gap-x-2">
                                        <div className="flex h-8 items-start justify-center pt-px">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </div>
                                        <div className="flex flex-col">
                                            <Label>Edit Post</Label>
                                            <Description>Make changes</Description>
                                        </div>
                                    </div>
                                </ListBox.Item>
                            </ListBox.Section>

                            <Separator />

                            <ListBox.Section>
                                <ListBox.Item
                                    id="delete-post"
                                    textValue="Delete Post"
                                    variant="danger"
                                >
                                    <div className="flex h-8 items-start justify-center pt-px">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </div>
                                    <div className="flex flex-col" onClick={handleDeletePost}>
                                        <Label>Delete Post</Label>
                                        <Description>Move to trash</Description>
                                    </div>
                                </ListBox.Item>
                            </ListBox.Section>
                        </ListBox>
                    </Surface>
                )}
                {/* Modal */}

                <Modal
                    isOpen={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                >
                    <Modal.Backdrop variant="blur">
                        <Modal.Container>
                            <Modal.Dialog className="sm:max-w-90 bg-[#3A4960]">
                                <Modal.CloseTrigger />
                                <Modal.Header>
                                    <Avatar>
                                        <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
                                        <Avatar.Fallback>JD</Avatar.Fallback>
                                    </Avatar>
                                </Modal.Header>
                                <Modal.Body>
                                    <TextArea ref={postContent} className=" w-full focus:ring-0 resize-none bg-[#3A4960] text-white placeholder:text-gray-100">{post.body}</TextArea>
                                    {post.image && <> {setImagePreview(post.image)} <div className="relative"><Image src={post.image} alt="Image" width={300} height={300} />
                                        <i onClick={handleRemoveImage} className="fa-solid fa-close absolute top-1 right-2 bg-gray-100 cursor-pointer "></i>
                                    </div> </>}
                                </Modal.Body>
                                <Modal.Footer className="flex justify-between items-center">
                                    <label>
                                        <i className="fa-regular fa-image text-2xl text-[#4651ea] ps-12 cursor-pointer"></i>
                                        <input type="file" ref={postImage} onChange={handleImageChange} hidden />
                                    </label>
                                    {/* Update Button */}
                                    <button
                                        onClick={handleEditPost}
                                        className="rounded-md bg-[#4651EA] hover:bg-[#4651EA] text-white font-semibold px-6 py-2 text-sm transition-colors cursor-pointer border-none"
                                    >
                                        Update
                                    </button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>

        </>
    )
}
