import { getUserProfile } from "@/app/services/user.service";
import { UserProfile } from "@/app/types/user.types";
import Image from "next/image";
import Link from "next/link";

export default async function Following({params}:{params: Promise<{id : string}>}) {

  const userId = (await params).id;
  const userFollowwing : UserProfile = await getUserProfile(userId);
  if(userFollowwing?.user?.following?.length)

  return (
        <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 lg:pl-72">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-white">Following</h1>
          <p className="mt-2 text-sm text-slate-400">
            People who you are following.
          </p>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {userFollowwing?.user?.following?.length > 0 ?  userFollowwing?.user?.following?.map((user) => (
            <div key={user.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:bg-white/10"
            >
            <Link href={`/profile/${user._id}`}>
              <div className="flex items-center justify-between gap-4">
                {/* User Info */}
                <div className="flex min-w-0 items-center gap-4">
                  <Image
                    src={user.photo}
                    alt={user.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover border border-white/10"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-white">
                      {user.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          )) : <h2 className="text-white text-xl text-center py-7">No following yet !</h2> }  
        </div>
      </div>
    </section>
  );
}