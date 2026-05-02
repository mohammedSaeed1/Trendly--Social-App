export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  return new Date(iso).toLocaleDateString();
}

export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const TYPE_CONFIG: Record<string, { bg: string; symbol: string; label: string }> = {
  like_post:    { bg: "#FF3040", symbol: "♥", label: "liked your post" },
  comment_post: { bg: "#0095F6", symbol: "✦", label: "commented on your post" },
  follow:       { bg: "#8B5CF6", symbol: "+", label: "started following you" },
  mention:      { bg: "#10B981", symbol: "@", label: "mentioned you" },
  share_post:   { bg: "#F59E0B", symbol: "↗", label: "shared your post" },
  like_comment: { bg: "#EC4899", symbol: "♥", label: "liked your comment" },
};

export function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] ?? { bg: "#8E8E8E", symbol: "•", label: type.replace(/_/g, " ") };
}

const AVATAR_COLORS = [
  { bg: "#FBEAF0", text: "#993556" },
  { bg: "#E6F1FB", text: "#185FA5" },
  { bg: "#E1F5EE", text: "#0F6E56" },
  { bg: "#FAEEDA", text: "#854F0B" },
  { bg: "#EEEDFE", text: "#534AB7" },
  { bg: "#EAF3DE", text: "#3B6D11" },
  { bg: "#FAECE7", text: "#993C1D" },
];

export function avatarColor(id: string) {
  const idx = id.charCodeAt(id.length - 1) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}