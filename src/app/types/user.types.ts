export interface UserProfile {
  isFollowing: boolean,
  user : UserProfilee
}
export interface UserProfilee {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  cover: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  createdAt: string;
}