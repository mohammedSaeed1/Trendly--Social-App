"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { followAndUnfollowUser } from "./SuggestedUsers.actions";
import { toast } from "@heroui/react";
import { SuggestedUser } from "@/app/types/user.types";

export default function SuggestedUsers({suggestions}: {suggestions: SuggestedUser[];}) {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const handleFollowToggle = (id: string) => {
    setFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  async function handleFollowUnfollowUser(userId: string,username: string) :Promise<boolean> {
    const isSuccessfully = await followAndUnfollowUser(userId);
    if (isSuccessfully){
      toast.success(`Now you are following ${username}`);
      return true;
    }
    else{
      toast.danger(`Something went wrong`);
      return false;
    }
  }

  return (
    <section className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Suggested for you
        </h2>
        <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition">
          See All
        </button>
      </div>

      {/* Users */}
      <div className="space-y-4">
        {suggestions.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition"
          >
            {/* User Info */}
            <Link
              href={`/profile/${user._id}`}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                <Image
                  src={user.photo}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {user.username}
                </p>
                <p className="truncate text-sm text-slate-400">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500">
                  {user.mutualFollowersCount > 0
                    ? `${user.mutualFollowersCount} mutual followers`
                    : `${user.followersCount} followers`}
                </p>
              </div>
            </Link>

            {/* Follow Button */}
            <button
              onClick={async () => {
              const isFollowedSuccessfully = await handleFollowUnfollowUser(user._id, user.name);
              if(isFollowedSuccessfully) handleFollowToggle(user._id);
              }}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition cursor-pointer ${
                following[user._id]
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md shadow-indigo-500/30"
              }`}
            >
              {following[user._id] ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}