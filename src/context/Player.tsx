"use client";

import debounce from "lodash.debounce";
import React, { createContext, useContext, useRef, useState } from "react";

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

const debounceTime = 500;

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

  return (
    <PlayerContext.Provider
      value={{
        audio: audioRef.current!,
        duration,
        currentTime,
        playbackState,
        setCurrentTime(time) {
          console.log("player: setting time", time);
          audioRef.current!.currentTime = time;
          setCurrentTime(time);
        },
        play: debounce(() => {
          audioRef.current!.play();
          setPlaybackState("playing");
        }, debounceTime),
        togglePlayback: debounce(() => {
          if (playbackState === "playing") {
            audioRef.current!.pause();
            setPlaybackState("paused");
          } else {
            audioRef.current!.play();
            setPlaybackState("playing");
          }
        }, debounceTime),
      }}
    >
      <audio
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current!.currentTime);
          // console.log("timeupdate", range.current.length);
          // if (range.current.length === 2) {
          //   if (audioRef.current!.currentTime >= range.current[1]) {
          //     audioRef.current!.pause();
          //     audioRef.current!.currentTime = range.current[0];
          //     audioRef.current!.play();
          //   }
          // }
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
