"use client"
import { Avatar, Input, Modal, TextArea, toast } from "@heroui/react";
import Image from "next/image";
import { useState, useRef, RefObject } from "react";
import { createPost } from "./CreatePost.actions";

export default function CreatePost() {

    const [isOpen, setIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const postContent = useRef<RefObject>();
    const postImage = useRef<RefObject>();



    function handleImageChange(e) {
        console.log("changed", e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    function handleRemoveImage() {
        setImagePreview(null);
        postImage.current.value = "";
    }
    function handleOpenModal() {
        setIsOpen(true);
    }

    async function handleCreatePost() {
        const postObj = new FormData();
        if (postContent.current?.value) {
            postObj.append("body", postContent.current.value);
        }
        if (postImage.current?.value) {
            postObj.append("image", postImage.current.files[0]);
        }
        const createdPost = await createPost(postObj);
        if (createdPost) {
            setImagePreview(null);
            if (postContent.current?.value) postContent.current.value = "";
            if (postImage.current?.value) postImage.current.value = "";
            toast.success("Post created successfully");
        }
        else toast.danger("Failed to create post");
    }

    return (
        <>
            <div className="bg-[#1D354F] mx-auto w-1/3 p-4">
                <header className="flex gap-x-1.5">
                    <Avatar>
                        <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
                        <Avatar.Fallback>JD</Avatar.Fallback>
                    </Avatar>
                    {/* <h2 className="text-gray-100">Mohamed Saeed</h2> */}
                    <Input onClick={handleOpenModal} aria-label="Post Content" className=" w-full bg-[#3A4960] text-gray-100" placeholder="Create Post " />
                </header>
                <footer className="flex items-center justify-between py-2.5">
                    <label>
                        <i className="fa-regular fa-image text-white ps-12 cursor-pointer"></i>
                        <input type="file" hidden />
                    </label>
                    {/* Post Button */}
                    <button
                        onClick={handleCreatePost}
                        className="rounded-md bg-[#4651EA] hover:bg-[#4651EA] text-white font-semibold px-6 py-2 text-sm transition-colors cursor-pointer border-none"
                    >
                        Post
                    </button>
                </footer>
                {/* Modal */}

                <Modal
                    isOpen={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                >
                    <Modal.Backdrop variant="blur">
                        <Modal.Container>
                            <Modal.Dialog className="sm:max-w-90">
                                <Modal.CloseTrigger />
                                <Modal.Header>
                                    <Avatar>
                                        <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
                                        <Avatar.Fallback>JD</Avatar.Fallback>
                                    </Avatar>
                                </Modal.Header>
                                <Modal.Body>
                                    <TextArea ref={postContent} className=" w-full bg-[#3A4960] text-white placeholder:text-gray-100" placeholder="What do you think about? " />
                                    {imagePreview && <div className="relative"><Image src={imagePreview} alt="Image" width={300} height={300} />
                                        <i onClick={handleRemoveImage} className="fa-solid fa-close absolute top-1 right-2 bg-gray-100 cursor-pointer "></i>
                                    </div>}
                                </Modal.Body>
                                <Modal.Footer className="flex justify-between items-center">
                                    <label>
                                        <i className="fa-regular fa-image text-2xl text-[#4651ea] ps-12 cursor-pointer"></i>
                                        <input type="file" ref={postImage} onChange={handleImageChange} hidden />
                                    </label>
                                    {/* Post Button */}
                                    <button
                                        onClick={() => {
                                            handleCreatePost();
                                            setIsOpen(false);
                                        }}
                                        className="rounded-md bg-[#4651EA] hover:bg-[#4651EA] text-white font-semibold px-6 py-2 text-sm transition-colors cursor-pointer border-none"
                                    >
                                        Post
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
