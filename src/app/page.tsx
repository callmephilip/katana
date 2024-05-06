"use client";

import NoSSR from "./NoSSR";
import { FFmpegProvider, useFFmpeg } from "@/context/FFmpeg";
import { PlayerProvider } from "@/context/Player";
import { AppStateProvider, useAppState } from "@/context/AppState";
import { Separator } from "@/components/ui/separator";
import { PlayerControls } from "@/components/PlayerControls";
import { Waveform } from "@/components/WaveForm";
import { Slices } from "@/components/Slices";
import { FileUpload } from "@/components/FileUpload";
import { FileAudio, Slice } from "lucide-react";

function Home() {
  const { slices, source, loading } = useAppState();
  const { loading: loadingFFmpeg } = useFFmpeg();

  return loadingFFmpeg || loading ? (
    <strong>loading ffmpeg...</strong>
  ) : (
    <>
      {!source?.url ? (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Create audio clips
            </h2>
            <p className="text-muted-foreground">
              All local and organic, nothing leaves your browser
            </p>
          </div>
          <FileUpload />
        </>
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
