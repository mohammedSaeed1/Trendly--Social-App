import { getMyProfile, getUserPosts, getUserProfile } from "@/app/services/user.service";
import { UserProfile} from "@/app/types/user.types";
import { Post } from "@/app/types/post.types";
import ProfileUI from "../ProfileUI";

export default async function ProfileCard({params}: {params: Promise<{ id: string }>}) {
  const id = (await params).id;
  const userProfile: UserProfile = await getUserProfile(id);
  const loggedInUserProfile : UserProfile = await getMyProfile();
  const userPosts: Post[] = await getUserPosts(id);

  const profileData = loggedInUserProfile._id === id ? loggedInUserProfile : userProfile ;

  return (
      <ProfileUI  userProfile = {profileData} userPosts = {userPosts} loggedInUserId = {loggedInUserProfile._id}/>
  );
}