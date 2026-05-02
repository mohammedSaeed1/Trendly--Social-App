"use client";

import { NotificationActor, NotificationPanelProps } from "@/app/types/notification.types";
import Image from "next/image";
import { avatarColor, getTypeConfig, initials, relativeTime } from "./Notifications.helpers";

function TypeBadge({ type }: { type: string }) {
  const { bg, symbol } = getTypeConfig(type);
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: bg,
        border: "2.5px solid #fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1,
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {symbol}
    </span>
  );
}

function ActorAvatar({ actor, type }: { actor: NotificationActor; type: string }) {
  const colors = avatarColor(actor._id);
  const isDefault = actor.photo.includes("default-profile");
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {isDefault ? (
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: colors.bg,
            color: colors.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {initials(actor.name)}
        </div>
      ) : (
        <Image
          src={actor.photo}
          alt={actor.name}
          width={44}
          height={44}
          style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", display: "block" }}
        />
      )}
      <TypeBadge type={type} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NotificationPanel({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationPanelProps) {
  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        width: "100%",
        maxWidth: 400,
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #DBDBDB",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <header style={{ padding: "16px 16px 0", borderBottom: "1px solid #EFEFEF" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#262626" }}>
            Notifications
          </h2>

          {/* Mark all as read — only shown when there are unread notifications */}
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              style={{
                background: "none",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                color: "#0095F6",
                cursor: "pointer",
                padding: "4px 0",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {/* Double-checkmark icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0095F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12l5 5L17 5" />
                <path d="M8 12l5 5L23 5" />
              </svg>
              Mark all as read
            </button>
          )}
        </div>
      </header>

      {/* ── List ── */}
      <div style={{ paddingTop: 4 }}>

        {notifications.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 24px", color: "#8E8E8E", fontSize: 14 }}>
            No notifications yet
          </div>

        /* Notification rows */
        ) : (
          notifications.map((n, i) => {
            const { label } = getTypeConfig(n.type);
            const preview = n.entity?.body
              ? n.entity.body.slice(0, 55) + (n.entity.body.length > 55 ? "…" : "")
              : null;

            return (
              <div key={n._id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onMarkAsRead(n._id)}
                  onKeyDown={(e) => e.key === "Enter" && onMarkAsRead(n._id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "9px 16px",
                    position: "relative",
                    cursor: "pointer",
                    background: n.isRead ? "transparent" : "rgba(0,149,246,0.04)",
                    transition: "background 0.12s ease",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#fafafa")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = n.isRead ? "transparent" : "rgba(0,149,246,0.04)")}
                >
                  {/* Unread dot */}
                  {!n.isRead && (
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 5,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#0095F6",
                        flexShrink: 0,
                      }}
                    />
                  )}

                  <ActorAvatar actor={n.actor} type={n.type} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        lineHeight: 1.45,
                        color: "#262626",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{n.actor.name}</span>{" "}
                      <span>{label}</span>
                      {preview && <span style={{ color: "#8E8E8E" }}> · {preview}</span>}{" "}
                      <span style={{ color: "#8E8E8E", fontSize: 12, fontWeight: 400 }}>
                        {relativeTime(n.createdAt)}
                      </span>
                    </p>
                  </div>
                </div>

                {i < notifications.length - 1 && (
                  <div style={{ height: "0.5px", background: "#EFEFEF", margin: "0 16px" }} />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
