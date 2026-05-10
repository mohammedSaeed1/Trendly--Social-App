"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

const queries = [
  "egypt",
  "cairo",
  "travel",
  "food",
  "street food",
  "nature",
  "gym",
  "fitness",
  "cars",
  "cinematic",
  "viral video",
];

/* ===================== HELPERS ===================== */

function pickFile(files: VideoFile[]): VideoFile | undefined {
  return (
    files.find(
      (file) =>
        file.file_type === "video/mp4" &&
        (file.height ?? 0) <= 720
    ) ||
    files.find(
      (file) =>
        file.file_type === "video/mp4" &&
        (file.height ?? 0) <= 1080
    ) ||
    files.find((file) => file.file_type === "video/mp4") ||
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
  const pageRef = useRef(1);
  const fetchObserverRef = useRef<IntersectionObserver | null>(null);

  /* ===================== LOAD SAVED MUTE STATE ===================== */

  useEffect(() => {
    const saved = localStorage.getItem("reels-muted");
    if (saved !== null) {
      setIsMuted(saved === "true");
    }
  }, []);

  /* ===================== FETCH VIDEOS ===================== */

  const fetchVideos = useCallback(async () => {
    if (loading || !API_KEY) return;

    setLoading(true);

    try {
      const query =
        queries[Math.floor(Math.random() * queries.length)];

      const response = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(
          query
        )}&orientation=portrait&per_page=6&page=${pageRef.current}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (!response.ok) {
        console.error("Pexels API Error:", response.status);
        return;
      }

      const data = await response.json();

      const filteredVideos: VideoItem[] = (data.videos || []).filter(
        (video: VideoItem) =>
          video.duration <= 30 &&
          video.video_files?.length > 0
      );

      setVideos((prev) => [...prev, ...filteredVideos]);
      pageRef.current += 1;
    } catch (error) {
      console.error("Fetch videos error:", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  /* ===================== INITIAL FETCH ===================== */

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  /* ===================== PLAY ACTIVE VIDEO ===================== */

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.muted = isMuted;

        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Retry for Safari/iPhone
            setTimeout(() => {
              video.play().catch(() => {});
            }, 100);
          });
        }
      } else {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    });
  }, [activeIndex, isMuted]);

  /* ===================== ACTIVE VIDEO OBSERVER ===================== */

  useEffect(() => {
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisibleEntry: IntersectionObserverEntry | null = null;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            (!mostVisibleEntry ||
              entry.intersectionRatio >
                mostVisibleEntry.intersectionRatio)
          ) {
            mostVisibleEntry = entry;
          }
        });

        if (mostVisibleEntry) {
          const index = Number(
            (mostVisibleEntry.target as HTMLVideoElement).dataset.index
          );

          setActiveIndex(index);
        }
      },
      {
        threshold: [0.5, 0.75, 1],
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  /* ===================== INFINITE SCROLL ===================== */

  const lastVideoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (fetchObserverRef.current) {
        fetchObserverRef.current.disconnect();
      }

      fetchObserverRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            fetchVideos();
          }
        },
        {
          rootMargin: "600px",
        }
      );

      if (node) {
        fetchObserverRef.current.observe(node);
      }
    },
    [loading, fetchVideos]
  );

  /* ===================== SOUND ===================== */

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem("reels-muted", String(nextMuted));
  };

  /* ===================== EMPTY API KEY ===================== */

  if (!API_KEY) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-red-400">
        Pexels API key is missing.
      </div>
    );
  }

  /* ===================== UI ===================== */

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 sm:pl-[80px]">
      <div className="relative h-[92vh] w-full max-w-[420px] overflow-y-auto snap-y snap-mandatory rounded-[28px] border border-white/10 bg-black shadow-2xl scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {/* Initial Loading */}
        {videos.length === 0 && loading && (
          <div className="flex h-full items-center justify-center text-white/70">
            Loading videos...
          </div>
        )}

        {/* Videos */}
        {videos.map((video, index) => {
          const file = pickFile(video.video_files);

          if (!file) return null;

          const isLoaded = loadedVideos[video.id] ?? false;

          return (
            <div
              key={`${video.id}-${index}`}
              ref={index === videos.length - 1 ? lastVideoRef : null}
              className="relative h-screen snap-start bg-black"
            >
              {/* Skeleton */}
              {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-zinc-900" />
              )}

              {/* Poster */}
              <img
                src={video.image}
                alt={video.user.name}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  isLoaded ? "opacity-0" : "opacity-100"
                }`}
              />

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
                autoPlay
                loop
                muted={index === activeIndex ? isMuted : true}
                playsInline
                preload={index === activeIndex ? "auto" : "metadata"}
                controls={false}
                onCanPlay={() => {
                  setLoadedVideos((prev) => ({
                    ...prev,
                    [video.id]: true,
                  }));

                  if (index === activeIndex) {
                    const currentVideo = videoRefs.current[index];

                    if (currentVideo) {
                      currentVideo.muted = isMuted;

                      const playPromise = currentVideo.play();

                      if (playPromise !== undefined) {
                        playPromise.catch(() => {
                          setTimeout(() => {
                            currentVideo.play().catch(() => {});
                          }, 100);
                        });
                      }
                    }
                  }
                }}
              />

              {/* Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Sound Button */}
              <button
                onClick={toggleSound}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-md transition hover:scale-110"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              {/* User Info */}
              <div className="absolute bottom-6 left-4 z-20 text-white">
                <p className="font-semibold">@{video.user.name}</p>
                <p className="text-xs opacity-70">{video.duration}s</p>
              </div>
            </div>
          );
        })}

        {/* Loading More */}
        {loading && videos.length > 0 && (
          <div className="py-4 text-center text-sm text-white/60">
            Loading more videos...
          </div>
        )}
      </div>
    </div>
  );
}