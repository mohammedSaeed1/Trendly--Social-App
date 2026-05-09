"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

/* ===================== TYPES ===================== */

type VideoFile = {
  file_type: string;
  link: string;
  height?: number;
};

type VideoUser = {
  name: string;
};

type VideoItem = {
  id: number;
  image: string;
  duration: number;
  video_files: VideoFile[];
  user: VideoUser;
};

/* ===================== CONSTANTS ===================== */

const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY as string;

const queries: string[] = [
  "egypt",
  "cairo",
  "alexandria",
  "egypt street",
  "cairo street",
  "arab street",
  "middle east",
  "egypt bazaar",
  "local market",
  "downtown cairo",
  "night cairo",
  "nile river",
  "egypt travel",
  "egypt food",
  "egypt lifestyle",
  "food",
  "street food",
  "fast food",
  "restaurant",
  "cooking",
  "food vlog",
  "delicious food",
  "tasty food",
  "arab food",
  "dessert",
  "coffee",
  "breakfast",
  "grilled food",
  "bbq",
  "pizza",
  "burgers",
  "travel",
  "city life",
  "urban life",
  "sunset",
  "sunrise",
  "night city",
  "cinematic city",
  "beautiful places",
  "nature",
  "mountains",
  "beach",
  "vacation",
  "road trip",
  "wanderlust",
  "aesthetic travel",
  "gym",
  "fitness",
  "workout",
  "bodybuilding",
  "training",
  "weight lifting",
  "running",
  "healthy lifestyle",
  "motivation",
  "gym motivation",
  "strong body",
  "fitness lifestyle",
  "people",
  "street",
  "crowd",
  "street portrait",
  "lifestyle",
  "daily life",
  "walking",
  "city people",
  "friends",
  "social life",
  "cars",
  "luxury car",
  "driving",
  "fast car",
  "supercar",
  "traffic",
  "street cars",
  "night driving",
  "racing",
  "engine sound",
  "aesthetic",
  "cinematic",
  "slow motion",
  "neon lights",
  "vibe",
  "dreamy",
  "moody",
  "soft light",
  "creative shots",
  "viral video",
];

/* ===================== HELPERS ===================== */

function pickFile(files: VideoFile[]): VideoFile | undefined {
  return (
    files.find(
      (f) => f.file_type === "video/mp4" && (f.height ?? 0) <= 720
    ) ||
    files.find((f) => f.file_type === "video/mp4") ||
    files[0]
  );
}

/* ===================== COMPONENT ===================== */

export default function ReelsPro() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pageRef = useRef<number>(1);

  /* 🔊 load saved mute state */
  useEffect(() => {
    const saved = localStorage.getItem("reels-muted");
    if (saved !== null) setIsMuted(saved === "true");
  }, []);

  /* mute sync */
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.muted = i !== activeIndex ? true : isMuted;
    });
  }, [activeIndex, isMuted]);

  /* ===================== FETCH ===================== */

  const fetchVideos = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const q = queries[Math.floor(Math.random() * queries.length)];

      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${q}&orientation=portrait&per_page=6&page=${pageRef.current}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (!res.ok) {
        console.error("API error:", res.status);
        return;
      }

      const data = await res.json();

      const filtered: VideoItem[] = (data.videos || []).filter(
        (v: VideoItem) =>
          v.duration <= 30 && v.video_files?.length
      );

      setVideos((prev) => [...prev, ...filtered]);
      pageRef.current += 1;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  /* ===================== OBSERVER ===================== */

  useEffect(() => {
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          const idx = Number(video.dataset.index);

          if (entry.isIntersecting) {
            setActiveIndex(idx);
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.85 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));

    return () => observer.disconnect();
  }, [videos]);

  /* ===================== INFINITE SCROLL ===================== */

  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) fetchVideos();
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchVideos]
  );

  /* ===================== UI ===================== */

  const toggleSound = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("reels-muted", String(newMuted));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 pl-0 sm:pl-[80px]">
      <div className="relative h-[92vh] w-full max-w-105 overflow-y-scroll snap-y snap-mandatory rounded-[28px] border border-white/10 bg-black shadow-[0_0_40px_rgba(0,0,0,0.6)] scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {/* empty */}
        {videos.length === 0 && !loading && (
          <div className="flex h-full items-center justify-center text-sm text-white/50">
            No videos loaded. Check API key.
          </div>
        )}

        {videos.map((v, i) => {
          const file = pickFile(v.video_files);
          if (!file) return null;

          return (
            <div
              key={v.id}
              ref={i === videos.length - 1 ? lastRef : null}
              className="relative flex h-screen snap-start items-center justify-center"
            >
              <img
                src={v.image}
                className="absolute h-full w-full object-cover"
                alt=""
              />

              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                data-index={i}
                src={file.link}
                className="h-full w-full object-cover"
                loop
                playsInline
                muted
                preload="metadata"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              <button
                onClick={toggleSound}
                className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-md transition hover:scale-110"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              <div className="absolute bottom-6 left-4 z-20 text-white">
                <p className="font-semibold">@{v.user.name}</p>
                <p className="text-xs opacity-70">{v.duration}s</p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="py-4 text-center text-sm text-white/60">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}