export interface Post{
  _id : string,
  body : string,
  image: string,
  privacy: string,
  user : User,
  createdAt : string, 
  commentsCount : number,
  sharesCount : number,
  likesCount : number,
  isShare: boolean, 
  bookmarked: boolean,
  likes: string[],

}
export interface User{
  _id : string,
  name : string,
  username : string,    
  photo: string,    
}
export interface TopComment{
  _id : string,
  content: string,
  commentCreator : User,
  post: string,
  createdAt: string,
  likes: string[]
}
