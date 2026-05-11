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

            { feedPosts?.length && feedPosts?.length > 0 ?  feedPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            )) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center backdrop-blur-xl">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-slate-400">
                <i className="fa-regular fa-image text-2xl"></i>
              </div>

              <h3 className="text-lg font-semibold text-white">
                No posts yet
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Add post or follow users to show posts.
              </p>
            </div>
          )}

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