import { getToken } from "../lib/auth";


export async function getUserProfile(userId : string){
    const res = await fetch(`https://route-posts.routemisr.com/users/${userId}/profile`,{
        headers:{
            Token: await getToken() || ""
        },
        next:{
            tags: [`getUserProfile${userId}`]
        }
    })
    if(res.ok){
        const data = await res.json();
        console.log(data.data.user);
        return data.data;
    }
}

export async function getFollowSuggestions(){
    const res = await fetch(`https://route-posts.routemisr.com/users/suggestions`,{
        headers:{
            Token: await getToken() || ""
        },
        next:{
            tags: ["getFollowSuggestions"]
        }
    })
    if(res.ok){
        const data = await res.json();
        console.log(data.data.suggestions);
        return data.data.suggestions;
    }
}



export async function getUserPosts(userId : string){
    const res = await fetch(`https://route-posts.routemisr.com/users/${userId}/posts`,{
        headers:{
            Token: await getToken() || ""
        },
        next:{
            tags: ["getUserPosts"]
        }
    })
    if(res.ok){
        const data = await res.json();
        console.log(data.data.posts);
        return data.data.posts;
    }
}

export async function getBookmarks(){
    const res = await fetch(`https://route-posts.routemisr.com/users/bookmarks`,{
        headers:{
            Token: await getToken() || ""
        },
        next:{
            tags: ["getBookmarks"]
        }
    })
    if(res.ok){
        const data = await res.json();
        console.log(data.data.bookmarks);
        return data.data.bookmarks;
    }
}


