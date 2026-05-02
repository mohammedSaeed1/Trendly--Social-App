
export default function BookmarkPosts() {
  return (
    <section className="w-full px-4 py-6">
  {/* Header */}
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold text-white">Bookmarks</h1>
      <p className="text-sm text-zinc-400">
        Saved posts for later
      </p>
    </div>

    <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800">
      Manage
    </button>
  </div>

  {/* Bookmarks Grid */}
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[1, 2, 3, 4, 5, 6].map((post) => (
      <div
        key={post}
        className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-md transition hover:border-zinc-700"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src="https://via.placeholder.com/500"
            alt="Post"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-6 bg-black/50 opacity-0 transition group-hover:opacity-100">
            <div className="flex items-center gap-2 text-white">
              ❤️ <span>245</span>
            </div>

            <div className="flex items-center gap-2 text-white">
              💬 <span>32</span>
            </div>
          </div>

          {/* Bookmark Icon */}
          <button className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-yellow-400 backdrop-blur-md">
            🔖
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* User */}
          <div className="mb-3 flex items-center gap-3">
            <img
              src="https://via.placeholder.com/100"
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <h3 className="text-sm font-semibold text-white">
                username
              </h3>
              <p className="text-xs text-zinc-400">
                Full Name
              </p>
            </div>
          </div>

          {/* Caption */}
          <p className="mb-4 line-clamp-2 text-sm text-zinc-300">
            This is an example bookmarked post caption
            that the user saved for later viewing.
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              2 days ago
            </span>

            <div className="flex items-center gap-3 text-zinc-400">
              <button className="transition hover:text-white">
                ❤️
              </button>
              <button className="transition hover:text-white">
                💬
              </button>
              <button className="transition hover:text-white">
                📤
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
  )
}
