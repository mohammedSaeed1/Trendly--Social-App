import { Post } from "@/app/types/post.types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import PostCardUI from "./PostCardUI";


export default async function PostCard({ post }: { post: Post }) {
  const cookie = await cookies();
  const token = cookie.get("usertoken")?.value;
  const { user }: { user: string } = jwtDecode(token);

  return (
     <PostCardUI post={post} userId={user}/>
  );
}