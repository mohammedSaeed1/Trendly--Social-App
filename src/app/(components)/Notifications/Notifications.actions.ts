"use server"
import { getToken } from "@/app/lib/auth";
import { revalidateTag } from "next/cache";


export async function getNotifications(){
    const token = await getToken();
   const res = await fetch(`https://route-posts.routemisr.com/notifications`,{
        headers:{
            Token : token || ""
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data.notifications;
    }
}

export async function getUnreadCount(){
    const token = await getToken();
   const res = await fetch(`https://route-posts.routemisr.com/notifications/unread-count`,{
        headers:{
            Token : token || ""
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
    const token = await getToken();

   const res = await fetch(`https://route-posts.routemisr.com/notifications/${notificationId}/read`,{
    method: "PATCH",
    headers:{
        Token : token || ""
    }
   })
    if(res.ok) revalidateTag("getUnreadCount","max");
}

export async function markAllAsRead(){
    const token = await getToken();
   const res = await fetch(`https://route-posts.routemisr.com/notifications/read-all`,{
        method: "PATCH",
    headers:{
        Token : token || ""
    }
    })
    if(res.ok) revalidateTag("getUnreadCount","max");
}