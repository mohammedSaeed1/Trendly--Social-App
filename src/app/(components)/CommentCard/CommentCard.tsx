"use client"
import { Post } from "@/app/types/post.types";
import Comments from "./Comments";
import SendComment from "./SendComment";
import { Comment } from "@/app/types/comment.types";
import { UserProfile } from "@/app/types/user.types";

export default function CommentCard({ comments , post , loggedUser}: { comments: Comment[] , post : Post , loggedUser : UserProfile }) {
    return (
        <div className="space-y-6">

      <h3 className="text-white font-semibold text-lg">
        Comments
      </h3>

      <SendComment post = {post} loggedUser = {loggedUser} />

      <Comments post={post} comments={comments} loggedUserId = {loggedUser._id} />

    </div>
    )
}
