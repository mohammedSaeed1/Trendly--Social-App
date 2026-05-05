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
        return data.data.user;
    }
}

export async function getMyProfile(){
    const res = await fetch(`https://route-posts.routemisr.com/users/profile-data`,{
        headers:{
            Token: await getToken() || ""
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data.user;
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



