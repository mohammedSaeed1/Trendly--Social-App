import { getToken } from "../lib/auth";

export async function getUserProfile(userId : string){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/users/${userId}/profile`,{
        headers:{
            Token: token
        },
        next:{
            tags: [`getUserProfile${userId}`]
        }
    })
    if(res.ok){
        const data = await res.json();        
        return data.data;
    }
}

export async function getMyProfile(){
    const token = await getToken();

    const res = await fetch(`https://route-posts.routemisr.com/users/profile-data`,{
        headers:{
            Token: token 
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data;
    }
}

export async function getFollowSuggestions(){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/users/suggestions`,{
        headers:{
            Token: token
        },
        cache: "force-cache",
        next:{
            revalidate: 60 * 60 * 24,
            tags: ["getFollowSuggestions"]
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data.suggestions;
    }
}



export async function getUserPosts(userId : string){
    const token = await getToken();
    const res = await fetch(`https://route-posts.routemisr.com/users/${userId}/posts`,{
        headers:{
            Token: token
        },
        next:{
            tags: [`getUserPosts${userId}`]
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data.posts;
    }
}




