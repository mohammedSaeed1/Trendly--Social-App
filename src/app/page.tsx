import { getAllPosts } from "./services/post.service";
import PostCard from "./(components)/PostCard/PostCard";
import CreatePost from "./(components)/CreatePost/CreatePost";

export default async function Home() {


  const allPosts = await getAllPosts();
  


  return (
    <>
    <section className="">
      <CreatePost/>
    {allPosts?.map(post => <PostCard key={post._id} post = {post}/> )}
    </section>
    
    </>
    
  );
}
