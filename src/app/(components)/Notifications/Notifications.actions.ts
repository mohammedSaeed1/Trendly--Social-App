"use server"
import { getToken } from "@/app/lib/auth";
import { revalidateTag } from "next/cache";


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
        },
        next: {
            tags: ["getUnreadCount"]
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data.unreadCount;
    }
}

export async function markNotificationAsRead(notificationId : string){
   const res = await fetch(`https://route-posts.routemisr.com/notifications/${notificationId}/read`,{
    method: "PATCH",
    headers:{
        Token : await getToken() || ""
    }
   })
    if(res.ok) revalidateTag("getUnreadCount");
}

export async function markAllAsRead(){
   const res = await fetch(`https://route-posts.routemisr.com/notifications/read-all`,{
        method: "PATCH",
    headers:{
        Token : await getToken() || ""
    }
    })
    if(res.ok) revalidateTag("getUnreadCount");
}