"use client";

import { useEffect } from "react";
import NoSSR from "./NoSSR";
import { FFmpegProvider, useFFmpeg } from "@/context/FFmpeg";
import { PlayerProvider } from "@/context/Player";
import { AppStateProvider, useAppState } from "@/context/AppState";
import { Separator } from "@/components/ui/separator";
import { PlayerControls } from "@/components/PlayerControls";
import { Waveform } from "@/components/WaveForm";
import { Slices } from "@/components/Slices";
import { FileAudio, Slice } from "lucide-react";

function Home() {
  const { slices, source, setSource } = useAppState();
  const { loading: loadingFFmpeg, loadSource } = useFFmpeg();

  useEffect(() => {
    const doLoadSource = async () => {
      setSource(
        await loadSource(
          "https://qvpozsgvtxumtvszyujr.supabase.co/storage/v1/object/public/tldl-episodes-audio/SEnuWRLMI88.mp3"
        )
      );
    };
    if (!loadingFFmpeg) {
      doLoadSource();
    }
  }, [loadingFFmpeg]);

  console.log(">>>>>>>>> slices >>>>>>>>>>>>>>>>", slices);

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
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            <div className="flex items-center">
              <div className="w-8 flex-none">
                <FileAudio />
              </div>
              <div className="flex-grow">{source.filename}</div>
            </div>
          </h2>

          <div className="flex py-4 items-center">
            <div className="flex-none w-32">
              <PlayerControls />
            </div>

            <div className="grow">
              <Waveform />
            </div>
          </div>

          <Slices />
        </PlayerProvider>
      )}
    </>
  );
}

export default function HomePage() {
  return (
    <NoSSR>
      <div className="h-full flex flex-col">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">
            <div className="flex">
              <div className="w-8 flex-none">
                <Slice />
              </div>
              <div className="flex-grow">Katana</div>
            </div>
          </h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end"></div>
        </div>

        <Separator />

        <div className="container h-full py-6">
          <div className="grid h-full items-stretch">
            <div>
              <FFmpegProvider>
                <AppStateProvider>
                  <Home />
                </AppStateProvider>
              </FFmpegProvider>
            </div>
          </div>
        </div>
      </div>
    </NoSSR>
  );
}
