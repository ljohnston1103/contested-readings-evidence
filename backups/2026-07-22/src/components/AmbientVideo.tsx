"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type AmbientVideoProps = {
  src: string;
  children?: ReactNode;
  className?: string;
  videoClassName?: string;
  overlayClassName?: string;
  playbackRate?: number;
};

export function AmbientVideo({
  src,
  children,
  className,
  videoClassName,
  overlayClassName,
  playbackRate = 1,
}: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, src]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 saturate-[0.85] motion-reduce:hidden dark:opacity-25",
          videoClassName,
        )}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={(event) => {
          event.currentTarget.playbackRate = playbackRate;
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br from-archive-paper/95 via-archive-paper/76 to-archive-gold/12 dark:from-archive-navy/95 dark:via-archive-navy/82 dark:to-archive-teal/18",
          overlayClassName,
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
