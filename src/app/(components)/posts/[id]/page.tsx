import PostCard from "../../PostCard/PostCard";
import { getSinglePost } from "@/app/services/post.service";
import { toast } from "@heroui/react";
import { getPostComments } from "../../PostCard/PostCard.actions";
import CommentCard from "../../CommentCard/CommentCard";


export default async function SinglePost({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  console.log("from iddddddddddd",id);
  
  const post = await getSinglePost(id);
  const comments = await getPostComments(id);
  if (!post) toast.danger("Failed to load post");
  if (!comments) toast.danger("Failed to load comments");
  return (
    <>
      <PostCard post={post} />
     <CommentCard post = {post} comments ={comments}/>
    </>
  )
}
