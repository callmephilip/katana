"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FFmpeg } from "@/features/ffmpeg/lib/ffmpeg";

interface FFmpegContextValue {
  ffmpeg: FFmpeg;
}

const FFmpegContext = createContext<FFmpegContextValue | undefined>(undefined);

export const FFmpegProvider = ({
  children,
  ffmpeg,
}: {
  children: React.ReactNode;
  ffmpeg: FFmpeg;
}) => {
  return (
    <FFmpegContext.Provider value={{ ffmpeg }}>
      {children}
    </FFmpegContext.Provider>
  );
};

export const useFFmpeg = () => {
  const context = useContext(FFmpegContext);
  if (!context) {
    throw new Error("useFFmpeg must be used within a FFmpegProvider");
  }
  return context;
};
