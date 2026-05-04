import { getAllPosts } from "./services/post.service";
import PostCard from "./(components)/PostCard/PostCard";
import CreatePost from "./(components)/CreatePost/CreatePost";
import SuggestedUsersSection from "./(components)/SuggestedUsers/SuggestedUsers";
import { getFollowSuggestions, getMyProfile } from "./services/user.service";

export default async function Home() {

  const loggedUser = await getMyProfile();
  const posts = await getAllPosts();
  const followSuggestions = await getFollowSuggestions();
  


  return (
    <>
    <section>
      <header>
      <CreatePost user = {loggedUser}/>
      <SuggestedUsersSection suggestions = {followSuggestions} />
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
