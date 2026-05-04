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
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-6 space-y-4">
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
              <h2 className="text-white font-semibold text-lg">
                Welcome 👋
              </h2>
              <p className="text-slate-400 text-sm">
                {loggedUser?.name}
              </p>
            </div>

          </div>
        </aside>

        {/* Main Feed */}
        <main className="lg:col-span-6 space-y-6">

          {/* Create Post */}
          <CreatePost user={loggedUser} />

          {/* Posts */}
          <div className="space-y-6">
            {posts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3">
          <div className="sticky top-6">
            <SuggestedUsers suggestions={followSuggestions} />
          </div>
        </aside>

      </div>
    </section>
  );
}