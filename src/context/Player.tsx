"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { useAppState } from "@/context/AppState";

interface PlayerContextValue {
  audio: HTMLAudioElement;
  duration: number;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  togglePlayback: () => void;
  play: () => void;
  playbackState: PlaybackState;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

type PlaybackState = "playing" | "paused";

export const PlayerProvider = ({
  sourceURL,
  children,
}: {
  sourceURL: string;
  children: React.ReactNode;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("paused");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const { slices } = useAppState();

  useEffect(() => {
    const activeSlice = slices.find((s) => s.isActive);

    if (activeSlice) {
      audioRef.current!.currentTime = activeSlice.start;
      audioRef.current!.play();
      setPlaybackState("playing");
    } else {
      audioRef.current!.pause();
      setPlaybackState("paused");
    }
  }, [slices]);

  return (
    <PlayerContext.Provider
      value={{
        audio: audioRef.current!,
        duration,
        currentTime,
        playbackState,
        setCurrentTime(time) {
          audioRef.current!.currentTime = time;
          setCurrentTime(time);
        },
        play: () => {
          audioRef.current!.play();
          setPlaybackState("playing");
        },
        togglePlayback: () => {
          if (playbackState === "playing") {
            audioRef.current!.pause();
            setPlaybackState("paused");
          } else {
            audioRef.current!.play();
            setPlaybackState("playing");
          }
        },
      }}
    >
      <audio
        onTimeUpdate={() => {
          const activeSlice = slices.find((s) => s.isActive);
          const ct = audioRef.current!.currentTime;

          setCurrentTime(ct);

          if (activeSlice && ct >= activeSlice.end) {
            audioRef.current!.currentTime = activeSlice.start;
          }
        }}
        onLoadedMetadata={() => {
          // audioRef.current.duration
          setDuration(audioRef.current!.duration);
          setLoading(false);
        }}
        src={sourceURL}
        ref={audioRef}
        controls={false}
      />
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
