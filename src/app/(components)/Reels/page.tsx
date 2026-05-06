"use client";
import { getReels } from "@/app/services/reels.service";
import { useEffect, useRef, useState } from "react";

type VideoFile = {
  quality: string;
  link: string;
};

type ReelVideo = {
  id: string | number;
  video_files: VideoFile[];
};

export default function Reels() {
  const [videos, setVideos] = useState<ReelVideo[]>([]);
  const containerRef = useRef(null);

 async function getReeels(){
    const data = await getReels();
    setVideos(data);
 }

  useEffect(() => {
    getReeels();
  }, []);

  // 🔹 Auto play when in view
  useEffect(() => {
    const videosEl = document.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videosEl.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      {videos.map((video) => {
        const videoUrl = video.video_files.find(
          (v: { quality: string; }) => v.quality === "sd"
        )?.link;

        return (
          <div
            key={video.id}
            className="h-screen w-full snap-start flex items-center justify-center bg-black"
          >
            <video
              src={videoUrl}
              className="h-full w-full object-cover"
              loop
              muted
              playsInline
            />
          </div>
        );
      })}
    </div>
  );
}