"use client"

import { UserProfile } from "@/app/types/user.types";
import { followAndUnfollowUser } from "../SuggestedUsers/SuggestedUsers.actions";
import { useState } from "react";
import { toast } from "@heroui/react";

export default function FollowUnFollowBtn({ userProfile }: { userProfile: UserProfile}) {

    const [following, setFollowing] = useState<boolean>(userProfile.isFollowing);
    async function handleFollowUnfollowUser() {
        const isfollow = await followAndUnfollowUser(userProfile.user._id);
        try {
            setFollowing(isfollow);
        }
        catch (_) {
            toast.danger("Network failed!");
        }
    }
    return (
        <button
            onClick={handleFollowUnfollowUser}
            className={`flex items-center cursor-pointer gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium transition ${following
                ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "bg-indigo-500 text-white hover:bg-indigo-400"}`}>
            <i className={`fa-solid ${following ? "fa-user-check" : "fa-user-plus"}`}></i>
            {following ? "Following" : "Follow"}
        </button>
    )
}

