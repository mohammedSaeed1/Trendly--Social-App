"use client"

import { toast } from "@heroui/react";
import {sharePost} from "./PostCard.actions"
import { Avatar,  Modal, TextArea} from "@heroui/react";
import { useRef, useState } from "react";
import { Post } from "@/app/types/post.types";


 export default function Share({post} : {post: Post}){

      const [isOpen, setIsOpen] = useState(false);
      const sharedContent = useRef();

        function handleOpenModal() {
        setIsOpen(true);
    }
  

  async function handleShare(){
    
    const isSuccessfully = await sharePost(post._id , sharedContent.current?.value);
    if(isSuccessfully) toast.success("post shared successfully");
    else toast.danger("Post already shared!");
  }
  
  return (
    <>
    <i onClick={handleOpenModal} className="fa-solid fa-share cursor-pointer ms-auto text-[#637188]"></i>
      <Modal    
                         isOpen={isOpen}
                         onOpenChange={(open) => setIsOpen(open)}
                    
                     >
                         <Modal.Backdrop variant="blur">
                             <Modal.Container>
                                 <Modal.Dialog className="sm:max-w-90 bg-[#1E2A47] border-none">
                                     <Modal.CloseTrigger />
                                     <Modal.Header>
                                         <Avatar>
                                             <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
                                             <Avatar.Fallback>JD</Avatar.Fallback>
                                         </Avatar>
                                     </Modal.Header>
                                     <Modal.Body>
                                         <TextArea ref={sharedContent}  className=" w-full bg-[#3A4960] text-white placeholder:text-gray-100" placeholder="Add a comment to your share...">
                                          </TextArea>
                                           <TextArea className=" w-full bg-[#3A4960] text-white placeholder:text-gray-100">
                                            {post.body}
                                          </TextArea>
                                
                                     </Modal.Body>
                                     <Modal.Footer className="ms-auto">
                                         {/* Share Button */}
                                         <button
                                             onClick={() => {
                                                handleShare();
                                             }}
                                             className="rounded-md bg-[#4651EA] hover:bg-[#4651EA] text-white font-semibold px-6 py-2 text-sm transition-colors cursor-pointer border-none"
                                         >
                                             Share
                                         </button>
                                     </Modal.Footer>
                                 </Modal.Dialog>
                             </Modal.Container>
                         </Modal.Backdrop>
                     </Modal>
    </>
  )
}
