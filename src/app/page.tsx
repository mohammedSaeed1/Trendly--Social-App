import { getHomeFeed } from "./services/post.service";
import PostCard from "./(components)/PostCard/PostCard";
import CreatePost from "./(components)/CreatePost/CreatePost";
import TrendingHashtags from "./(components)/TrendingHashtags/TrendingHashtags";



export default async function Home() {
  const feedPosts = await getHomeFeed();
 
  return (
    <>
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 lg:pl-72">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Feed */}
          <main className="lg:col-span-8 space-y-6">

            <CreatePost/>

            {feedPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}

          </main>

          {/* Right Side */}
          <aside className="hidden lg:block lg:col-span-4">
          <TrendingHashtags/>
          </aside>

        </div>
      </section>    
    </>

  );
}