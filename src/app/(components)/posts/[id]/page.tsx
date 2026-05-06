import PostCard from "../../PostCard/PostCard";
import { getSinglePost } from "@/app/services/post.service";
import { getPostComments } from "../../PostCard/PostCard.actions";
import CommentCard from "../../CommentCard/CommentCard";
import { getMyProfile } from "@/app/services/user.service";


export default async function SinglePost({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  const post = await getSinglePost(id);
  const loggedUser = await getMyProfile();
  const comments = await getPostComments(id);
  
  return (
    <>
       <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 py-10 px-4">
      
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Post */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4">
          <PostCard post={post} />
        </div>

        {/* Comments */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4">
          <CommentCard post={post} comments={comments} loggedUser={loggedUser} />
        </div>

      </div>
    </section>
    </>
  )
}
