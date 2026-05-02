"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { followAndUnfollowUser } from "./SuggestedUsers.actions";
import { toast } from "@heroui/react";

type SuggestedUser = {
  _id: string;
  name: string;
  username: string;
  photo: string;
  mutualFollowersCount: number;
  followersCount: number;
};

type SuggestedUsersSectionProps = {
  suggestions: SuggestedUser[];
};

export default function SuggestedUsersSection({
  suggestions,
}: SuggestedUsersSectionProps) {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const handleFollowToggle = (id: string) => {
    setFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  async function handleFollowUnfollowUser(userId : string , username : string){
    const isSuccessfully = await followAndUnfollowUser(userId);
    if(isSuccessfully) toast.success(`Now you are following ${username}`);
    else toast.danger(`something went wrong while following ${username}`);
  }

  return (
    <section className="max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Suggested for you
        </h2>
        <button className="text-sm font-medium text-blue-500 hover:text-blue-400">
          See All
        </button>
      </div>

      {/* Suggested Users List */}
      <div className="space-y-4">
        {suggestions.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between"
          >
            {/* User Info */}
            <Link
              href={`/profile/${user._id}`}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
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
                <p className="truncate text-sm text-zinc-400">
                  {user.name}
                </p>

                <p className="text-xs text-zinc-500">
                  {user.mutualFollowersCount > 0
                    ? `${user.mutualFollowersCount} mutual followers`
                    : `${user.followersCount} followers`}
                </p>
              </div>
            </Link>

            {/* Follow Button */}
            <button
              onClick={() =>{  handleFollowToggle(user._id)
                handleFollowUnfollowUser(user._id , user.name)}}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition cursor-pointer ${
                following[user._id]
                  ? "bg-zinc-800 text-white hover:bg-zinc-700"
                  : "bg-blue-600 text-white hover:bg-blue-500"
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