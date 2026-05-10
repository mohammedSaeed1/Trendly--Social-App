import { getAllPosts } from "@/app/services/post.service";
import PostCard from "../PostCard/PostCard";
import TrendingHashtags from "../TrendingHashtags/TrendingHashtags";

export default async function Explore() {
  const posts = await getAllPosts();

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 lg:pl-72">
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Content */}
        <main className="space-y-6 lg:col-span-8">
          {/* Header */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-2xl">
              🌍
            </span>

            <h1 className="mb-2 text-2xl font-bold text-white">Explore</h1>

            <p className="text-sm leading-relaxed text-slate-400">
              Discover trending posts, popular hashtags.
            </p>
          </div>

          {/* Posts */}
          {posts?.length ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
              <h2 className="mb-2 text-xl font-semibold text-white">
                No posts found
              </h2>
              <p className="text-slate-400">
                Check back later to discover new content.
              </p>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="sticky top-24 hidden self-start space-y-6 lg:col-span-4 lg:block">
          <TrendingHashtags />
        </aside>
      </div>
    </section>
  );
}