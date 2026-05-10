export interface User{
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
  followers?:  {
                    "_id": string,
                    "name": string,
                    "photo": string,
                    "followersCount": number,
                    "followingCount": number,
                    "bookmarksCount": number,
                    "id": string
                }[] | undefined,
                following?:  {
                    "_id": string,
                    "name": string,
                    "photo": string,
                    "followersCount": number,
                    "followingCount": number,
                    "bookmarksCount": number,
                    "id": string
                }[] | undefined
}

export interface LoggedUserProfile {
  user : User
}
export interface UserProfile{
  isFollowing: boolean,
  user: User
}

export interface SuggestedUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
  mutualFollowersCount: number;
  followersCount: number;
};