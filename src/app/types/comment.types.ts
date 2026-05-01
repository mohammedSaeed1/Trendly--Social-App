export interface Comment{
    _id : string;
    content:string;
    commentCreator : commentCreator;
    post: string;
    parentComment? : boolean;
    createdAt : string;
    likesCount : number;
    repliesCount : number;
    likes: string[];
}
export interface commentCreator{
    _id : string;
    name : string;
    photo : string;
    username : string;
    followersCount : number;
    followingCount : number;
    bookmarksCount : number;
}
