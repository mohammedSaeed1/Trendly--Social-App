import { Notification } from "@/app/types/notification.types";
import { getNotifications } from "./Notifications.actions";
import NotificationItem from "./NotificationItem";

export default async function NotificationsPage() {
  const notifications: Notification[] = await getNotifications();
  
  return <NotificationItem notifications={notifications} />;
}