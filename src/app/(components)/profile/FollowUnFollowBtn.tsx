"use client"

import { LoggedUserProfile, UserProfile } from "@/app/types/user.types";
// import { toast } from "@heroui/react";
import { followAndUnfollowUser } from "../SuggestedUsers/SuggestedUsers.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FollowUnFollowBtn({userProfile} : {userProfile : UserProfile | LoggedUserProfile}) {

    const [following, setFollowing] = useState<boolean>('isFollowing' in userProfile ? userProfile.isFollowing : false);
        const router = useRouter();
    
   async function handleFollowUnfollowUser(){
    const isfollow = await followAndUnfollowUser(userProfile.user._id);
    if(isfollow){
        setFollowing(isfollow);
         router.refresh();
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
