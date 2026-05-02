import { getUserPosts, getUserProfile } from "@/app/services/user.service";
import { UserProfile } from "@/app/types/user.types";
import { UploadProfilePhoto } from "../UploadProfilePhoto";
import Image from "next/image";
import { Post } from "@/app/types/post.types";
import PostCard from "../../PostCard/PostCard";
import BookmarkPosts from "../../Bookmark/BookmarkPosts";


function joinedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default async function ProfileCard({params}:{params: Promise<{id : string}>}){

  const id = (await params).id;
  const userProfile : UserProfile = await getUserProfile(id);
  const userPosts : Post[]  = await getUserPosts(id);

  
    const hasCover = userProfile?.user?.cover && userProfile?.user?.cover.trim() !== "";

    

  return (
    <>
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-separator bg-background">

      <div className="relative h-20 bg-background-secondary">
        {hasCover && (
          <Image src={userProfile?.user?.cover} alt="cover" fill className="object-cover" />
        )}
      </div> 

      <div className="relative px-5 pb-5">                   
       <UploadProfilePhoto user={userProfile}/>

        <div className="pt-10">

          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-[17px] font-semibold text-primary">{userProfile?.user?.name}</p>
              <p className="mt-0.5 text-sm text-secondary">@{userProfile?.user?.username}</p>
            </div>
              {/* {userProfile?.isFollowing && <span className="mt-0.5 rounded-md bg-background-secondary px-2.5 py-1 text-xs capitalize text-secondary">
                  Following
            </span> } */}
           
            <span className="mt-0.5 rounded-md bg-background-secondary px-2.5 py-1 text-xs capitalize text-secondary">
              {userProfile?.user?.gender}
            </span>
          </div>

          {/* ── Stats ── */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            {[
              { label: "Followers", value: userProfile?.user?.followersCount },
              { label: "Following", value: userProfile?.user?.followingCount },
              { label: "Bookmarks", value: userProfile?.user?.bookmarksCount },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-separator bg-background-secondary px-3 py-2.5 text-center"
              >
                <p className="text-base font-semibold text-primary">{value}</p>
                <p className="mt-0.5 text-[11px] text-secondary">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Meta ── */}
          <div className="flex flex-col gap-2 border-t border-separator pt-3">
            <div className="flex items-center gap-2">
             <i className="fa-solid fa-envelope"></i>
              <span className="text-sm text-secondary">{userProfile?.user?.email}</span>
            </div>
              <div className="flex items-center gap-2">
             <i className="fa-solid fa-cake-candles"></i>
              <span className="text-sm text-secondary">{userProfile?.user?.dateOfBirth.slice(0,10)}</span>
            </div>
            <div className="flex items-center gap-2">
             <i className="fa-solid fa-calendar"></i>
              <span className="text-sm text-secondary">Joined {joinedDate(userProfile?.user?.createdAt)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <BookmarkPosts/>
      {userPosts?.map(post => <PostCard key={post._id} post={post}/> )}  
    </>
  );
}