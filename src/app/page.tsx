import { getAllPosts } from "./services/post.service";
import PostCard from "./(components)/PostCard/PostCard";
import CreatePost from "./(components)/CreatePost/CreatePost";
import { getFollowSuggestions, getMyProfile } from "./services/user.service";
import SuggestedUsers from "./(components)/SuggestedUsers/SuggestedUsers";

export default async function Home() {

  const loggedUser = await getMyProfile();
  const posts = await getAllPosts();
  const followSuggestions = await getFollowSuggestions();
  


  return (
    <>
    <section>
      <header>
      <CreatePost user = {loggedUser}/>
      <SuggestedUsers suggestions = {followSuggestions} />
      </header>
      <main className="flex justify-between">
        <div className="w-1/3">
    {posts?.map(post => <PostCard key={post._id} post = {post}/> )}
        </div>
      </main>
    </section>    
    </>
    
  );
}
