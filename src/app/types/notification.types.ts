export interface NotificationActor {
  _id: string;
  name: string;
  photo: string;
}

export interface NotificationRecipient {
  _id: string;
  name: string;
  photo: string;
}

export interface NotificationEntity {
  _id: string;
  body: string;
  user: string;
  commentsCount: number;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

export type NotificationType =
  | "like_post"
  | "comment_post"
  | "follow"
  | "mention"
  | "share_post"
  | "like_comment"
  | string;

export interface Notification {
  _id: string;
  recipient: NotificationRecipient;
  actor: NotificationActor;
  type: NotificationType;
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
  entity?: NotificationEntity;
}

export interface PaginationMeta {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
}

export interface NotificationPanelProps {

  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}
