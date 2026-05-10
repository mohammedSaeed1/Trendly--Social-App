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
  "restaurant",
  "cooking",
  "food vlog",
  "delicious food",
  "dessert",
  "coffee",
  "breakfast",
  "pizza",
  "burgers",
  "travel",
  "city life",
  "sunset",
  "night city",
  "nature",
  "mountains",
  "beach",
  "vacation",
  "gym",
  "fitness",
  "workout",
  "bodybuilding",
  "running",
  "motivation",
  "people",
  "street portrait",
  "daily life",
  "walking",
  "friends",
  "cars",
  "luxury car",
  "driving",
  "supercar",
  "traffic",
  "aesthetic",
  "cinematic",
  "slow motion",
  "neon lights",
  "viral video",
];

/* ===================== HELPERS ===================== */

function pickFile(files: VideoFile[]): VideoFile | undefined {
  return (
    files.find(
      (f) =>
        f.file_type === "video/mp4" &&
        (f.height ?? 0) <= 720
    ) ||
    files.find(
      (f) =>
        f.file_type === "video/mp4" &&
        (f.height ?? 0) <= 1080
    ) ||
    files.find((f) => f.file_type === "video/mp4") ||
    files[0]
  );
}

/* ===================== COMPONENT ===================== */

export default function ReelsPro() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pageRef = useRef(1);

  /* ===================== LOAD SAVED MUTE ===================== */

  useEffect(() => {
    const saved = localStorage.getItem("reels-muted");
    if (saved !== null) {
      setIsMuted(saved === "true");
    }
  }, []);

  /* ===================== SYNC MUTE ===================== */

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === activeIndex) {
        video.muted = isMuted;
      } else {
        video.muted = true;
      }
    });
  }, [activeIndex, isMuted]);

  /* ===================== FETCH VIDEOS ===================== */

  const fetchVideos = useCallback(async () => {
    if (loading || !API_KEY) return;

    setLoading(true);

    try {
      const q =
        queries[Math.floor(Math.random() * queries.length)];

      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(
          q
        )}&orientation=portrait&per_page=6&page=${pageRef.current}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (!res.ok) {
        console.error("Pexels API Error:", res.status);
        return;
      }

      const data = await res.json();

      const filtered: VideoItem[] = (data.videos || []).filter(
        (v: VideoItem) =>
          v.duration <= 30 &&
          v.video_files?.length > 0
      );

      setVideos((prev) => [...prev, ...filtered]);
      pageRef.current += 1;
    } catch (error) {
      console.error("Fetch videos error:", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  /* ===================== VIDEO OBSERVER ===================== */

  useEffect(() => {
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          const idx = Number(video.dataset.index);

          if (entry.isIntersecting) {
            setActiveIndex(idx);

            video.currentTime = 0;
            video
              .play()
              .catch(() => {
                // autoplay may fail on some browsers
              });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.85,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  /* ===================== INFINITE SCROLL ===================== */

  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            fetchVideos();
          }
        },
        {
          rootMargin: "1000px",
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [fetchVideos, loading]
  );

  /* ===================== TOGGLE SOUND ===================== */

  const toggleSound = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem(
      "reels-muted",
      String(newMuted)
    );
  };

  /* ===================== UI ===================== */

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 pl-0 sm:pl-[80px]">
      <div className="relative h-[92vh] w-full max-w-[420px] overflow-y-scroll snap-y snap-mandatory rounded-[28px] border border-white/10 bg-black shadow-[0_0_40px_rgba(0,0,0,0.6)] scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* No API key */}
        {!API_KEY && (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-red-400">
            Pexels API key is missing.
          </div>
        )}

        {/* Empty state */}
        {API_KEY && videos.length === 0 && !loading && (
          <div className="flex h-full items-center justify-center text-sm text-white/60">
            No videos found.
          </div>
        )}

        {videos.map((video, index) => {
          const file = pickFile(video.video_files);

          if (!file) return null;

          const isLoaded = loadedVideos[video.id];

          return (
            <div
              key={`${video.id}-${index}`}
              ref={
                index === videos.length - 1
                  ? lastRef
                  : null
              }
              className="relative flex h-screen snap-start items-center justify-center bg-black"
            >
              {/* Poster Image */}
              <img
                src={video.image}
                alt={video.user.name}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  isLoaded ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Skeleton */}
              {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-zinc-900" />
              )}

              {/* Video */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                data-index={index}
                src={file.link}
                poster={video.image}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                loop
                autoPlay
                playsInline
                muted
                preload="metadata"
                onLoadedData={() =>
                  setLoadedVideos((prev) => ({
                    ...prev,
                    [video.id]: true,
                  }))
                }
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Sound Button */}
              <button
                onClick={toggleSound}
                className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-md transition hover:scale-110"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              {/* Info */}
              <div className="absolute bottom-6 left-4 z-20 text-white">
                <p className="font-semibold">
                  @{video.user.name}
                </p>
                <p className="text-xs opacity-70">
                  {video.duration}s
                </p>
              </div>
            </div>
          );
        })}

        {/* Loading More */}
        {loading && videos.length > 0 && (
          <div className="py-4 text-center text-sm text-white/60">
            Loading videos...
          </div>
        )}
      </div>
    </div>
  );
}