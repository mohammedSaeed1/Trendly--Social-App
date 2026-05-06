"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

const queries = ["egypt",
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
"random people",
"street moments",
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
"viral video"
];

function pickFile(files) {
  return (
    files.find(f => f.file_type === "video/mp4" && f.height <= 720) ||
    files.find(f => f.file_type === "video/mp4") ||
    files[0]
  );
}

export default function ReelsPro() {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [loading, setLoading] = useState(false);

  const videoRefs = useRef([]);
  const observerRef = useRef(null);
  const pageRef = useRef(1); 

  
  /* 🔊 load saved mute state */
  useEffect(() => {
    const saved = localStorage.getItem("reels-muted");
    if (saved !== null) setIsMuted(saved === "true");
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.muted = i !== activeIndex ? true : isMuted;
    });
  }, [activeIndex, isMuted]);

  const fetchVideos = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const q = queries[Math.floor(Math.random() * queries.length)];
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${q}&orientation=portrait&per_page=6&page=${pageRef.current}`,
        { headers: { Authorization: API_KEY } }
      );

      if (!res.ok) {
        console.error("Pexels API error:", res.status, await res.text());
        return;
      }

      const data = await res.json();
      const filtered = (data.videos || []).filter(
        v => v.duration <= 30 && v.video_files?.length
      );

      setVideos(prev => [...prev, ...filtered]);
      pageRef.current += 1;
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target;
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

    videoRefs.current.forEach(v => v && observer.observe(v));
    return () => observer.disconnect();
  }, [videos]);

  /* 🔄 infinite scroll sentinel */
  const lastRef = useCallback(node => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) fetchVideos();
    });
    if (node) observerRef.current.observe(node);
  }, [fetchVideos]);

  /* 🔊 toggle sound */
  const toggleSound = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("reels-muted", String(newMuted));
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 pl-0 sm:pl-[80px] items-center justify-center">
      <div
        className="
          relative
          w-full max-w-[420px]
          h-[92vh]
          overflow-y-scroll
          snap-y snap-mandatory
          bg-black
          rounded-[28px]
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
          border border-white/10
          scroll-smooth
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        {videos.length === 0 && !loading && (
          <div className="flex items-center justify-center h-full text-white/50 text-sm">
            No videos loaded. Check your API key.
          </div>
        )}

        {videos.map((v, i) => {
          const file = pickFile(v.video_files);
          if (!file) return null;

          return (
            <div
              key={v.id}
              ref={i === videos.length - 1 ? lastRef : null}
              className="relative h-screen snap-start flex items-center justify-center"
            >
              {/* 🖼 thumbnail */}
              <img
                src={v.image}
                className="absolute w-full h-full object-cover"
                alt=""
              />

              {/* 🎥 video */}
              <video
                ref={el => (videoRefs.current[i] = el)}
                data-index={i}
                src={file.link}
                className="h-full w-full object-cover"
                loop
                playsInline
                muted
                preload="metadata"
                onLoadedData={e => {
                  const img = e.target.previousSibling;
                  if (img) img.style.opacity = "0";
                }}
              />

              {/* 🌫 overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* 🔊 sound button */}
              <button
                onClick={toggleSound}
                className="absolute top-5 right-5 z-20 bg-black/40 backdrop-blur-md text-white p-2 rounded-full border border-white/20 hover:scale-110 transition"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              {/* 👤 user info */}
              <div className="absolute bottom-6 left-4 z-20 text-white">
                <p className="font-semibold">@{v.user.name}</p>
                <p className="text-xs opacity-70">{v.duration}s</p>
              </div>
            </div>
          );
        })}

        {/* ⏳ loader */}
        {loading && (
          <div className="text-white text-center py-4 opacity-60 text-sm">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
