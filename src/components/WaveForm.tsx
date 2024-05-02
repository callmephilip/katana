"use client";

import { useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { usePlayer } from "@/context/Player";

export const Waveform = () => {
  const { audio } = usePlayer();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    media: audio,
    // url,
    // plugins: useMemo(() => [Timeline.create()], []),
  });
  wavesurfer?.on("redrawcomplete", () => {
    setLoading(false);
  });

  return (
    <>
      {loading ? <strong>Loading...</strong> : null}
      <div ref={containerRef} />
    </>
  );
};
