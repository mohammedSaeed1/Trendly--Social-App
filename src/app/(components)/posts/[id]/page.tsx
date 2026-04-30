import PostCard from "../../PostCard/PostCard";
import { getSinglePost } from "@/app/services/post.service";
import { toast } from "@heroui/react";


export default async function SinglePost({params} : {params: Promise <{id : string}>}) {
     const id = (await params).id;
     const post = await getSinglePost(id);
     if(!post) toast.danger("Failed to load post");     
  return (
    <>
    <PostCard post={post}/>
    </>
  )
}
