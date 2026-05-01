"use client"
import { Post } from "@/app/types/post.types";
import Comments from "./Comments";
import SendComment from "./SendComment";
import { Comment } from "@/app/types/comment.types";

export default function CommentCard({ comments , post}: { comments: Comment[] , post : Post }) {
    return (
      <div className="md:w-1/3 mx-auto">
      <SendComment post = {post}/>
      <Comments post = {post} comments= {comments}/>
      </div>
    )
}
