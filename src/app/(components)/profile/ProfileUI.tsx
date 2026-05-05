import Image from "next/image";
import { UserProfile} from "@/app/types/user.types";
import { Post } from "@/app/types/post.types";
import BookmarkPosts from "../Bookmark/BookmarkPosts";
import PostCard from "../PostCard/PostCard";
import { UploadProfilePhoto } from "./UploadProfilePhoto";


function joinedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function ProfileUI({userProfile , userPosts , loggedInUserId} : {userProfile : UserProfile , userPosts : Post[] , loggedInUserId : string}) {

  const hasCover =
    userProfile?.cover &&
    userProfile?.cover.trim() !== "";

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8">
   
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
   
           {/* Sidebar */}
           <aside className="lg:col-span-4">
             <div className="sticky top-6 space-y-6">
   
               {/* Profile Card */}
               <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
   
                 {/* Cover */}
                 <div className="relative h-28 bg-white/5">
                   {hasCover && (
                     <Image
                       src={userProfile.cover}
                       alt="cover"
                       fill
                       className="object-cover"
                     />
                   )}
                 </div>
   
                 {/* Content */}
                 <div className="relative px-5 pb-6">
   
                   {/* Avatar */}
                   <div className="absolute -top-10 left-5">
                     <UploadProfilePhoto user={userProfile} loggedInUserId = {loggedInUserId} />
                   </div>
   
                   <div className="pt-14">
   
                     {/* Name */}
                     <div className="mb-4 flex items-start justify-between">
                       <div>
                         <p className="text-lg font-semibold text-white">
                           {userProfile.name}
                         </p>
                         <p className="text-sm text-slate-400">
                           @{userProfile.username}
                         </p>
                       </div>
   
                       <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs text-slate-300 capitalize">
                         {userProfile.gender}
                       </span>
                     </div>
   
                     {/* Stats */}
                     <div className="grid grid-cols-3 gap-3 mb-5">
                       {[
                         { label: "Followers", value: userProfile.followersCount },
                         { label: "Following", value: userProfile.followingCount },
                         { label: "Bookmarks", value: userProfile.bookmarksCount },
                       ].map(({ label, value }) => (
                         <div
                           key={label}
                           className="rounded-xl bg-white/5 border border-white/10 py-3 text-center"
                         >
                           <p className="text-white font-semibold">
                             {value}
                           </p>
                           <p className="text-xs text-slate-400">
                             {label}
                           </p>
                         </div>
                       ))}
                     </div>
   
                     {/* Meta */}
                     <div className="space-y-2 border-t border-white/10 pt-4 text-sm text-slate-400">
                       
                       <div className="flex items-center gap-2">
                         <i className="fa-solid fa-envelope text-indigo-400"></i>
                         {userProfile.email}
                       </div>
   
                       <div className="flex items-center gap-2">
                         <i className="fa-solid fa-cake-candles text-indigo-400"></i>
                         {userProfile?.dateOfBirth?.slice(0, 10)}
                       </div>
   
                       <div className="flex items-center gap-2">
                         <i className="fa-solid fa-calendar text-indigo-400"></i>
                         Joined {joinedDate(userProfile.createdAt)}
                       </div>
   
                     </div>
                   </div>
                 </div>
               </div>
   

               {/* Bookmarks */}
               {loggedInUserId === userProfile._id && <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4">
                 <BookmarkPosts />
               </div> }
               
             </div>
           </aside>
   
           {/* Posts */}
           <main className="lg:col-span-8 space-y-6">
             {userPosts?.map((post) => (
               <PostCard key={post._id} post={post} />
             ))}
           </main>
   
         </div>
       </section>
  )
}
