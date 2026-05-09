"use client"
import { Post } from "@/app/types/post.types";
import Comments from "./Comments";
import SendComment from "./SendComment";
import { Comment } from "@/app/types/comment.types";

export default function CommentCard({ comments , post}: { comments: Comment[] , post : Post}) {
    return (
        <div className="space-y-6">

      <h3 className="text-white font-semibold text-lg">
        Comments
      </h3>

      <SendComment post = {post}/>

      <Comments post={post} comments={comments}/>

    </div>
    )
}
