"use client";

import Image from "next/image";
import { Notification } from "@/app/types/notification.types";
import {markNotificationAsRead , markAllAsRead} from "./Notifications.actions";

function formatTime(date: string) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getMessage(type: string) {
  switch (type) {
    case "like_post":
      return "liked your post";
    case "comment_post":
      return "commented on your post";
       case "share_post":
      return "shared your post";
        case "follow_user":
      return "started follow you";
    default:
      return "interacted with your content";
  }
}

export default function NotificationItem({notifications}:{notifications: Notification[]}){

async function handleReadAllNotifications(){
   await markAllAsRead();
}
async function handleReadNotification(notificationId : string){
  await markNotificationAsRead(notificationId);
}

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-6">
    
      {/* Header */}
      <div className="max-w-xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold">
          Notifications
        </h1>

        <button
          onClick={handleReadAllNotifications}
          className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
        >
           {notifications.length > 0 &&  "Mark all as read" }  
        </button>
      </div>

      {/* List */}
      <div className="max-w-xl mx-auto space-y-3">

         { notifications.length > 0 ? notifications.map((notification) => 
           <div 
              key={notification._id}
              onClick={() => handleReadNotification(notification._id)}
              className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition
                ${
                  notification.isRead
                    ? "bg-white/5 border-white/10"
                    : "bg-indigo-500/10 border-indigo-500/30"
                }`}
            >

              {/* Actor */}
              <div className="relative h-11 w-11 shrink-0">
                <Image
                  src={notification.actor.photo}
                  alt={notification.actor.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">

                <div className="text-sm text-slate-200">
                  <span className="font-semibold text-white">
                    {notification.actor.name}
                  </span>{" "}
                  <span className="text-slate-300">
                    {getMessage(notification.type)}
                  </span>
                </div>

                {/* comment preview */}
                {notification.type === "comment_post" && (
                  <div className="text-xs text-slate-400 mt-1">
                    {notification.entity?.body
                      && `"${notification.entity.body}"`
                      }
                  </div>
                )}

                <div className="text-[11px] text-slate-500 mt-1">
                  {formatTime(notification.createdAt)}
                </div>
                
              </div>

            </div> 
          ) : <p className=" text-white text-center pt-10">No notifications added yet !</p>}


      </div>
    </section>
  )
}