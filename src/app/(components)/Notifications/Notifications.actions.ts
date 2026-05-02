"use server"
import { getToken } from "@/app/lib/auth";


export async function getNotifications(){
   const res = await fetch(`https://route-posts.routemisr.com/notifications`,{
        headers:{
            Token : await getToken() || ""
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data.notifications;
    }
}

export async function getUnreadCount(){
   const res = await fetch(`https://route-posts.routemisr.com/notifications/unread-count`,{
        headers:{
            Token : await getToken() || ""
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.unreadCount;
    }
}

export async function markNotificationAsRead(notificationId : string){
   const res = await fetch(`https://route-posts.routemisr.com/notifications/${notificationId}/read`,{
        headers:{
            Token : await getToken() || ""
        },
        method: "Patch"
    })
    if(res.ok) return true;
}

export async function markAllAsRead(){
   const res = await fetch(`https://route-posts.routemisr.com/notifications/read-all`,{
        headers:{
            Token : await getToken() || ""
        },
        method: "Patch"
    })
    if(res.ok) return true;
}