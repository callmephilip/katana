"use client";

import { useEffect, useState } from "react";
import NoSSR from "./NoSSR";
import { Button } from "@/components/ui/button";
import { FFmpegProvider, useFFmpeg } from "@/context/FFmpeg";
import { PlayerProvider, usePlayer } from "@/context/Player";
import { AppStateProvider, useAppState, Slice } from "@/context/AppState";
import { Slider } from "@/components/ui/double-thumb-slider";
import { PlayerControls } from "@/components/PlayerControls";
import { Waveform } from "@/components/WaveForm";
import { Time } from "@/components/Time";

const SourcePlayer = () => {
  return (
    <div>
      <div>
        <PlayerControls />
        <hr />
      </div>
      <div>
        <Waveform />
      </div>
    </div>
  );
};

const SlicePlayer = ({ slice }: { slice: Slice }) => {
  const {
    duration,
    play,
    togglePlayback,
    playbackState,
    setCurrentTime,
    currentTime,
  } = usePlayer();
  const { activateSlice, sliceAudioToFile } = useAppState();
  const [showControls, setShowControls] = useState<boolean>(true);
  const [range, setRange] = useState<[number, number]>([
    slice.start,
    slice.end,
  ]);

  useEffect(() => {
    if (slice.isActive && currentTime >= range[1]) {
      setCurrentTime(range[0]);
    }
  }, [currentTime, range, slice.isActive]);

  return (
    <div className={!slice.isActive ? "opacity-75" : ""}>
      <strong>{slice.id}</strong>
      <Waveform />
      <>
        <div style={{ marginTop: "-100px" }}>
          <Slider
            onValueChange={(v) => {
              if (slice.isActive) {
                if (v[0] !== range[0]) {
                  // left side of the range moved
                  setCurrentTime(v[0]);
                } else {
                  // right side of the range moved
                  setCurrentTime(v[0] + 0.95 * (v[1] - v[0]));
                }
                play();
              }

              setRange(v);
            }}
            className="w-100%"
            defaultValue={range}
            max={duration}
            step={1}
            onPointerDown={() => {
              activateSlice(slice);
              if (playbackState === "playing") {
                setShowControls(false);
                togglePlayback();
              }
            }}
            onPointerUp={() => {
              setShowControls(true);
            }}
          />
          {/* offset based on the slider overall position */}
          <div
            style={{
              paddingLeft: `${Math.floor((range[0] / duration) * 100)}%`,
            }}
          >
            <div style={{ padding: "10px" }}>
              {showControls ? (
                <>
                  <Button
                    onClick={() => {
                      activateSlice(slice);
                      setCurrentTime(range[0]);
                      togglePlayback();
                    }}
                  >
                    {slice.isActive
                      ? `${playbackState === "paused" ? "Play" : "Pause"}`
                      : "Play"}
                  </Button>
                  <Button
                    onClick={async () => {
                      await sliceAudioToFile({
                        start: range[0],
                        end: range[1],
                      });
                    }}
                  >
                    Download
                  </Button>
                  <Time time={range[0]} /> {"-"} <Time time={range[1]} />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

function Home() {
  const { addSlice, slices, source, setSource } = useAppState();
  const { loading: loadingFFmpeg, loadSource } = useFFmpeg();

  // useEffect(() => {
  //   const doLoadSource = async () => {
  //     setSource(
  //       await loadSource(
  //         "https://qvpozsgvtxumtvszyujr.supabase.co/storage/v1/object/public/tldl-episodes-audio/SEnuWRLMI88.mp3"
  //       )
  //     );
  //   };
  //   if (!loadingFFmpeg) {
  //     doLoadSource();
  //   }
  // }, [loading]);

  return loadingFFmpeg ? (
    <strong>loading ffmpeg...</strong>
  ) : (
    <>
      {!source?.url ? (
        <div>
          <form>
            <input
              type="file"
              onChange={(e) => {
                if (!e.target.files) {
                  return;
                }

                const reader = new FileReader();
                reader.onload = async function () {
                  setSource(
                    await loadSource(new Uint8Array(this.result as ArrayBuffer))
                  );
                };

                reader.readAsArrayBuffer(e.target.files[0]);
              }}
            />
          </form>
        </div>
      ) : (
        <PlayerProvider sourceURL={source.url}>
          <SourcePlayer />

          {slices.map((slice) => (
            <SlicePlayer key={slice.id} slice={slice} />
          ))}

          <Button
            onClick={() => {
              addSlice({
                id: new Date().getTime().toString(),
                start: 0,
                end: 10,
                isActive: true,
              });
            }}
          >
            +Add slice
          </Button>
        </PlayerProvider>
      )}
    </>
  );
}

export default function HomePage() {
  return (
    <NoSSR>
      <FFmpegProvider>
        <AppStateProvider>
          <Home />
        </AppStateProvider>
      </FFmpegProvider>
    </NoSSR>
  );
}
