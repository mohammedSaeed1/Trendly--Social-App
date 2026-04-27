import { getAllPosts } from "./services/post.service";
import PostCard from "./(components)/PostCard/PostCard";

export default async function Home() {


  const allPosts = await getAllPosts();
  


  return (
    <>
    <section className="">
    {allPosts?.map(post => <PostCard key={post._id} post = {post}/> )}
    </section>
    
    </>
    
  );
}
