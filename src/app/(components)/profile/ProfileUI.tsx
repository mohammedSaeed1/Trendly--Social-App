import Image from "next/image";
import { LoggedUserProfile, UserProfile } from "@/app/types/user.types";
import { Post } from "@/app/types/post.types";
import BookmarkPosts from "../Bookmark/BookmarkPosts";
import PostCard from "../PostCard/PostCard";
import { UploadProfilePhoto } from "./UploadProfilePhoto";
import Link from "next/link";
import FollowUnFollowBtn from "./FollowUnFollowBtn";

function joinedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function ProfileUI({
  userProfile,
  userPosts,
  loggedInUserId,
}: {
  userProfile: UserProfile | LoggedUserProfile;
  userPosts: Post[];
  loggedInUserId: string;
}) {
  const hasCover =
    userProfile?.user.cover &&
    userProfile?.user.cover.trim() !== "";

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-6 pb-24 lg:ml-67.5">
      <div className="mx-auto max-w-5xl">

        {/* Cover */}
        <div className="relative h-52 overflow-hidden rounded-3xl border border-white/10 bg-white/5">

          {hasCover ? (
            <Image
              src={userProfile?.user?.cover}
              alt="cover"
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-white/5" />
          )}
        </div>

        {/* Profile Card */}
        <div className="relative mt-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <UploadProfilePhoto
              user={userProfile}
              loggedInUserId={loggedInUserId}
            />
          </div>

          {/* Content */}
          <div className="pt-20 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

            {/* Left */}
            <div className="flex-1">

              {/* Name */}
              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-3xl font-bold text-white">
                  {userProfile?.user.name}
                </h1>

                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 capitalize">
                  {userProfile?.user.gender}
                </span>
              </div>

              {/* Username */}
              <p className="mt-2 text-slate-400">
                @{userProfile?.user.username}
              </p>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                {/* Owner Actions */}
                {loggedInUserId === userProfile?.user._id ? (
                  <>
                  <Link href={`/changePassword`}>
                    <button className="flex items-center gap-2 cursor-pointer rounded-2xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400">
                      <i className="fa-solid fa-key"></i>
                      Change Password
                    </button>
                  </Link>
                  </>
                ) : (
                  <>
                    {/* Follow State */}
                   <FollowUnFollowBtn userProfile = {userProfile}/>
                  </>
                )}
              </div>


              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-3">

                {[
                  {
                    label: "Followers",
                    value: userProfile?.user.followersCount,
                  },
                  {
                    label: "Following",
                    value: userProfile?.user.followingCount,
                  },
                  {
                    label: "Bookmarks",
                    value: userProfile?.user.bookmarksCount,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 py-4 text-center"
                  >
                    <p className="text-lg font-semibold text-white">
                      {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-slate-400">

                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-indigo-400"></i>

                  <span>{userProfile?.user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-cake-candles text-indigo-400"></i>

                  <span>
                    {userProfile?.user.dateOfBirth?.slice(0, 10)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-calendar text-indigo-400"></i>

                  <span>
                    Joined {joinedDate(userProfile?.user.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            {loggedInUserId === userProfile?.user._id && (
              <div className="w-full lg:w-[320px]">

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-white">
                      Saved Posts
                    </h2>

                    <p className="text-sm text-slate-400">
                      Manage your bookmarks
                    </p>
                  </div>

                  <BookmarkPosts />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="mx-auto mt-8 max-w-3xl space-y-6">

          {userPosts?.length > 0 ? (
            userPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
              />
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center backdrop-blur-xl">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-slate-400">
                <i className="fa-regular fa-image text-2xl"></i>
              </div>

              <h3 className="text-lg font-semibold text-white">
                No posts yet
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                This user hasn’t shared anything yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}