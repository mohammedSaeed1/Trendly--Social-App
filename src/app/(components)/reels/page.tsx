"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Types ──────────────────────────────────────── */

type VideoFile = { file_type: string; link: string; height?: number };
type VideoUser = { name: string };
type VideoItem = {
  id: number;
  image: string;
  duration: number;
  video_files: VideoFile[];
  user: VideoUser;
};

/* ─── Constants ──────────────────────────────────── */

const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY as string;

const videoKeywords = [
  // Technology & Coding
  "technology",
  "coding",
  "programming",
  "web development",
  "software development",
  "developer workspace",
  "laptop coding",
  "typing on keyboard",
  "computer screen",
  "dark office",
  "startup office",

  // Social Media & Mobile Apps
  "social media",
  "mobile app",
  "smartphone scrolling",
  "chat messages",
  "notifications",
  "online communication",
  "people using phone",
  "digital connection",

  // Lifestyle
  "lifestyle",
  "daily life",
  "city life",
  "morning routine",
  "walking street",
  "coffee shop",
  "friends talking",
  "young people smiling",
  "work from cafe",

  // Egypt
  "Egypt",
  "Cairo",
  "Alexandria Egypt",
  "Nile River",
  "Egyptian street",
  "Egyptian market",
  "Khan El Khalili",
  "Cairo skyline",
  "Pyramids of Giza",
  "Egyptian culture",

  // Egyptian Food
  "koshari",
  "falafel Egypt",
  "foul medames",
  "Egyptian breakfast",
  "Egyptian food",
  "street food Egypt",
  "traditional Egyptian food",

  // Fitness & Gym
  "gym workout",
  "weight lifting",
  "fitness training",
  "running treadmill",
  "bodybuilding",
  "exercise",
  "healthy lifestyle",
  "personal training",

  // Gaming
  "gaming",
  "video games",
  "playing PlayStation",
  "gaming setup",
  "RGB keyboard",
  "esports",
  "game controller",
  "streamer setup",

  // Travel
  "travel",
  "airplane window",
  "beach",
  "mountains",
  "road trip",
  "hotel view",

  // Nature
  "sunset",
  "ocean waves",
  "forest",
  "rain",
  "sky clouds",

  // Business & Productivity
  "business meeting",
  "teamwork",
  "office work",
  "remote work",
  "freelancer working",

  // Education
  "studying",
  "student laptop",
  "online learning",
  "university campus",

  // Music & Entertainment
  "concert",
  "headphones",
  "listening to music",
  "DJ",

  // Cars
  "driving car",
  "luxury car",
  "city driving",

  // High-Quality Search Terms
  "4k",
  "cinematic",
  "slow motion",
  "aesthetic",
  "professional"
];

/* ─── Helpers ─────────────────────────────────────── */

function pickFile(files: VideoFile[]): VideoFile | undefined {
  return (
    files.find((f) => f.file_type === "video/mp4" && (f.height ?? 0) <= 720) ||
    files.find((f) => f.file_type === "video/mp4" && (f.height ?? 0) <= 1080) ||
    files.find((f) => f.file_type === "video/mp4") ||
    files[0]
  );
}

/* ─── Keyframes not in Tailwind defaults ─────────── */
const Keyframes = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes fadeUp     { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulseRing  { 0%,100%{transform:scale(.85);opacity:.7} 60%{transform:scale(1.1);opacity:0} }
    .animate-spin-fast  { animation:spin .8s linear infinite }
    .animate-float      { animation:float 3s ease-in-out infinite }
    .animate-fade-up    { animation:fadeUp .5s ease forwards }
    .animate-pulse-ring { animation:pulseRing 1.8s ease-out infinite }
    .shimmer-text {
      background:linear-gradient(90deg,#f0f0ff 20%,#6c63ff 40%,#ff6b9d 60%,#f0f0ff 80%);
      background-size:200% auto;
      -webkit-background-clip:text;
      background-clip:text;
      -webkit-text-fill-color:transparent;
      animation:shimmer 3s linear infinite;
    }
    .snap-container {
      overflow-y:auto;
      scroll-snap-type:y mandatory;
      scroll-behavior:smooth;
      -webkit-overflow-scrolling:touch;
      scrollbar-width:none;
    }
    .snap-container::-webkit-scrollbar { display:none }
    .snap-item { scroll-snap-align:start; scroll-snap-stop:always }
  `}</style>
);

/* ─── App Loading Screen ──────────────────────────── */

function AppLoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-7 bg-[#080810]">
      <div className="relative animate-float">
        <div
          className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] text-4xl text-white"
          style={{
            background: "linear-gradient(135deg,#6c63ff,#ff6b9d)",
            boxShadow: "0 0 40px rgba(108,99,255,.4)",
          }}
        >
          ▶
        </div>
        <span className="animate-pulse-ring pointer-events-none absolute inset-[-8px] rounded-[24px] border-2 border-[#6c63ff]" />
      </div>

      <div className="text-center">
        <h1 className="shimmer-text font-['Syne'] text-[28px] font-extrabold tracking-tight">
          ReelsPro
        </h1>
        <p className="mt-1.5 font-['DM_Sans'] text-[13px] text-white/45">
          Fetching your feed…
        </p>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-pulse-ring h-2 w-2 rounded-full"
            style={{
              background: i === 0 ? "#6c63ff" : "rgba(255,255,255,.08)",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Video Skeleton ──────────────────────────────── */

function VideoSkeleton() {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-[#0f0f1a]">
      <div className="animate-spin-fast h-12 w-12 rounded-full border-[3px] border-[#6c63ff]/20 border-t-[#6c63ff]" />
      <p className="font-['DM_Sans'] text-xs text-white/45">Loading video…</p>
    </div>
  );
}

/* ─── Icon Button ─────────────────────────────────── */

function IconBtn({
  onClick,
  liked,
  children,
}: {
  onClick?: () => void;
  liked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-[17px] text-[#f0f0ff]",
        "backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95",
        liked
          ? "border-[#ff6b9d]/50 bg-[#ff6b9d]/35"
          : "border-white/[.08] bg-black/45 hover:bg-[#6c63ff]/35",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ─── Info Tag ────────────────────────────────────── */

function InfoTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[.08] px-2.5 py-0.5 font-['DM_Sans'] text-[11px] tracking-wide text-white/45 backdrop-blur-sm">
      {children}
    </span>
  );
}

/* ─── Main Component ──────────────────────────────── */

export default function ReelsPro() {
  const [videos, setVideos]             = useState<VideoItem[]>([]);
  const [activeIndex, setActiveIndex]   = useState(0);
  const [isMuted, setIsMuted]           = useState(true);
  const [loading, setLoading]           = useState(false);
  const [appReady, setAppReady]         = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});
  const [likedVideos, setLikedVideos]   = useState<Record<number, boolean>>({});

  const videoRefs        = useRef<(HTMLVideoElement | null)[]>([]);
  const pageRef          = useRef(1);
  const fetchObserverRef = useRef<IntersectionObserver | null>(null);

  /* restore mute */
  useEffect(() => {
    const saved = localStorage.getItem("reels-muted");
    if (saved !== null) setIsMuted(saved === "true");
  }, []);

  /* fetch page of videos */
  const fetchVideos = useCallback(async () => {
    if (loading || !API_KEY) return;
    setLoading(true);
    try {
      const q = videoKeywords[Math.floor(Math.random() * videoKeywords.length)];
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&orientation=portrait&per_page=6&page=${pageRef.current}`,
        { headers: { Authorization: API_KEY } }
      );
      if (!res.ok) return;
      const data = await res.json();
      const filtered: VideoItem[] = (data.videos ?? []).filter(
        (v: VideoItem) => v.duration <= 30 && v.video_files?.length > 0
      );
      setVideos((prev) => {
        const next = [...prev, ...filtered];
        if (!appReady && next.length > 0) setAppReady(true);
        return next;
      });
      pageRef.current += 1;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loading, appReady]);

  useEffect(() => { fetchVideos(); }, []); 

  /* play active, pause others */
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex) {
        v.muted = isMuted;
        v.play().catch(() => setTimeout(() => v.play().catch(() => {}), 100));
      } else {
        v.pause();
        v.currentTime = 0;
        v.muted = true;
      }
    });
  }, [activeIndex, isMuted]);

  /* intersection observer → active index */
  useEffect(() => {
    if (!videos.length) return;

    const obs = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        let best: IntersectionObserverEntry | null = null;

        entries.forEach((e) => {
          if (
            e.isIntersecting &&
            (!best || e.intersectionRatio > best.intersectionRatio)
          ) {
            best = e;
          }
        });

        // ✅ Fix: copy to a new const so TypeScript narrows the type correctly
        const winner = best as IntersectionObserverEntry | null;
        if (winner) {
          const el  = winner.target as HTMLElement;
          const idx = el.dataset.index;
          if (idx !== undefined) setActiveIndex(Number(idx));
        }
      },
      { threshold: [0.5, 0.75, 1] }
    );

    videoRefs.current.forEach((v) => v && obs.observe(v));
    return () => obs.disconnect();
  }, [videos]);

  /* infinite-scroll sentinel on last card */
  const lastVideoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      fetchObserverRef.current?.disconnect();
      fetchObserverRef.current = new IntersectionObserver(
        (entries) => { if (entries[0]?.isIntersecting) fetchVideos(); },
        { rootMargin: "600px" }
      );
      if (node) fetchObserverRef.current.observe(node);
    },
    [loading, fetchVideos]
  );

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    localStorage.setItem("reels-muted", String(next));
  };

  const toggleLike = (id: number) =>
    setLikedVideos((prev) => ({ ...prev, [id]: !prev[id] }));

  /* ── Initial loading ── */
  if (!appReady)
    return (
      <>
        <Keyframes />
        <AppLoadingScreen />
      </>
    );

  const activeVideo = videos[activeIndex];

  /* ─────────────────────────── RENDER ─────────────────────────── */

  return (
    <>
      <Keyframes />
      <div className="min-h-svh bg-[#080810] sm:flex sm:items-center sm:justify-center">
        <div className="flex items-center gap-8">

          {/* ════════ PHONE / FEED FRAME ════════ */}
          <div
            className={[
              "fixed inset-0 overflow-hidden bg-black",
              "sm:relative sm:inset-auto",
              "sm:h-[780px] sm:w-[370px]",
              "sm:rounded-[40px]",
              "sm:border sm:border-white/[.12]",
              "xl:h-[840px] xl:w-[400px]",
            ].join(" ")}
          >
            <style>{`
              @media(min-width:640px){
                .phone-frame{
                  box-shadow:0 40px 100px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.05),inset 0 0 60px rgba(0,0,0,.3);
                }
              }
            `}</style>

            {/* Phone notch */}
            <div className="absolute left-1/2 top-0 z-[100] hidden h-[22px] w-[100px] -translate-x-1/2 rounded-b-[14px] bg-black sm:block" />

            {/* ── Scroll container ── */}
            <div className="snap-container h-full w-full phone-frame">
              {videos.map((video, index) => {
                const file     = pickFile(video.video_files);
                if (!file) return null;
                const isLoaded = loadedVideos[video.id] ?? false;
                const isLiked  = likedVideos[video.id]  ?? false;

                return (
                  <div
                    key={`${video.id}-${index}`}
                    ref={index === videos.length - 1 ? lastVideoRef : undefined}
                    className="snap-item relative h-svh w-full flex-shrink-0 bg-black"
                  >
                    {!isLoaded && <VideoSkeleton />}

                    <img
                      src={video.image}
                      alt=""
                      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`}
                    />

                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      data-index={index}
                      src={index <= activeIndex + 2 ? file.link : undefined}
                      poster={video.image}
                      className={`h-full w-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                      autoPlay={index === activeIndex}
                      loop
                      muted={index === activeIndex ? isMuted : true}
                      playsInline
                      preload={index <= activeIndex + 1 ? "auto" : "none"}
                      onCanPlay={() => {
                        setLoadedVideos((prev) => ({ ...prev, [video.id]: true }));
                        if (index === activeIndex)
                          videoRefs.current[index]?.play().catch(() => {});
                      }}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" />

                    {/* Sound toggle */}
                    <div className="absolute right-3.5 top-12 z-50">
                      <IconBtn onClick={toggleSound}>
                        {isMuted ? "🔇" : "🔊"}
                      </IconBtn>
                    </div>

                    {/* Like */}
                    <div className="absolute bottom-24 right-3.5 z-50 flex flex-col items-center gap-[18px]">
                      <button
                        onClick={() => toggleLike(video.id)}
                        className="flex cursor-pointer flex-col items-center gap-1 border-none bg-transparent"
                      >
                        <IconBtn liked={isLiked}>
                          {isLiked ? "❤️" : "🤍"}
                        </IconBtn>
                        <span
                          className="font-['DM_Sans'] text-[10px]"
                          style={{ color: isLiked ? "#ff6b9d" : "rgba(240,240,255,.45)" }}
                        >
                          {isLiked ? "Liked" : "Like"}
                        </span>
                      </button>
                    </div>

                    {/* Creator info */}
                    <div className="animate-fade-up absolute bottom-7 left-4 right-[72px] z-50 text-[#f0f0ff]">
                      <p className="mb-1.5 truncate font-['Syne'] text-[15px] font-bold tracking-tight [text-shadow:0_2px_8px_rgba(0,0,0,.6)]">
                        @{video.user.name}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <InfoTag>⏱ {video.duration}s</InfoTag>
                        <InfoTag>📹 HD</InfoTag>
                      </div>
                    </div>

                    {/* Progress dots */}
                    <div className="absolute top-3.5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-[5px]">
                      {videos
                        .slice(Math.max(0, index - 2), index + 3)
                        .map((_, di) => {
                          const realIdx = Math.max(0, index - 2) + di;
                          const isActive = realIdx === activeIndex;
                          return (
                            <span
                              key={realIdx}
                              className="rounded-full transition-all duration-300"
                              style={{
                                width:  isActive ? "7.5px" : "5px",
                                height: isActive ? "7.5px" : "5px",
                                background: isActive ? "#6c63ff" : "rgba(255,255,255,.08)",
                              }}
                            />
                          );
                        })}
                    </div>
                  </div>
                );
              })}

              {/* Loading-more indicator */}
              {loading && videos.length > 0 && (
                <div className="flex flex-col items-center gap-2.5 bg-[#080810] py-6">
                  <div className="animate-spin-fast h-8 w-8 rounded-full border-2 border-[#6c63ff]/20 border-t-[#6c63ff]" />
                  <p className="font-['DM_Sans'] text-xs text-white/45">Loading more…</p>
                </div>
              )}
            </div>
          </div>

          {/* ════════ DESKTOP SIDEBAR (lg+) ════════ */}
          <div className="hidden lg:flex lg:flex-col lg:gap-6 lg:min-w-[180px] text-[#f0f0ff]">
            <div>
              <h2 className="shimmer-text mb-1 font-['Syne'] text-[22px] font-extrabold tracking-tight">
                ReelsPro
              </h2>
              <p className="font-['DM_Sans'] text-[13px] text-white/45">Scroll to discover</p>
            </div>

            {activeVideo && (
              <div className="flex flex-col gap-2">
                <p className="max-w-45 truncate font-['Syne'] text-base font-bold">
                  @{activeVideo.user.name}
                </p>
                <InfoTag>⏱ {activeVideo.duration}s</InfoTag>
              </div>
            )}

            <div className="flex flex-col gap-3.5">
              <p className="font-['DM_Sans'] text-[12px] uppercase tracking-widest text-white/45">
                {activeIndex + 1} / {videos.length}
              </p>
              <div className="h-0.75 w-full rounded-full bg-white/8">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((activeIndex + 1) / videos.length) * 100}%`,
                    background: "linear-gradient(90deg,#6c63ff,#ff6b9d)",
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
