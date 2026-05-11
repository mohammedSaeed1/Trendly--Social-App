import { Post } from "@/app/types/post.types";
import PostCardUI from "./PostCardUI";


export default async function PostCard({ post }: { post: Post }) {
  return (
     <PostCardUI post={post}/>
  );
}