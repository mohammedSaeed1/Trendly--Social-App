"use server"
import { getToken } from "@/app/lib/auth";
import { updateTag } from "next/cache";
const baseURL = process.env.API_BASE_URL;



export async function getNotifications(){
    const token = await getToken();
   const res = await fetch(`${baseURL}/notifications`,{
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
   const res = await fetch(`${baseURL}/notifications/unread-count`,{
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

   const res = await fetch(`${baseURL}/notifications/${notificationId}/read`,{
    method: "PATCH",
    headers:{
        Token : token || ""
    }
   })
    if(res.ok) updateTag("getUnreadCount");
}

export async function markAllAsRead(){
  const token = await getToken();
  const res = await fetch(`${baseURL}/notifications/read-all`,{
        method: "PATCH",
    headers:{
        Token : token || ""
    }
    })
    if(res.ok) updateTag("getUnreadCount");
}