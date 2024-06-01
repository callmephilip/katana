"use client";

import { ReactNode } from "react";
import { FileAudio } from "lucide-react";
import { useFFmpeg as useBaseFFmpeg } from "@/features/ffmpeg/hooks/ffmpeg";
import { FFmpegProvider, useFFmpeg } from "@/context/FFmpeg";
import { PlayerProvider } from "@/context/Player";
import { AppStateProvider, useAppState } from "@/context/AppState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerControls } from "@/components/PlayerControls";
import { Waveform } from "@/components/WaveForm";
import { Slices } from "@/components/Slices";
import { FileUpload } from "@/components/FileUpload";
import { DowloadFromYoutube } from "@/features/youtube/components/Download";

function AppContent() {
  const { source, loading, setSource } = useAppState();
  const { ffmpeg } = useFFmpeg();

  return !source?.url ? (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Create audio clips
        </h2>
        <p className="text-muted-foreground">
          All local and organic, nothing leaves your browser
        </p>
      </div>
      <Tabs defaultValue="file" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file">File (wav, mp3)</TabsTrigger>
          <TabsTrigger data-cy="tab-youtube-download" value="youtube">
            Youtube
          </TabsTrigger>
        </TabsList>
        <TabsContent value="file">
          <FileUpload />
        </TabsContent>
        <TabsContent value="youtube">
          <DowloadFromYoutube
            onDownload={async (audio) => {
              const filename = `${new Date().getTime()}.mp3`;
              setSource(
                await ffmpeg.saveFile({
                  source: audio,
                  filename,
                  type: "audio/mp3",
                })
              );
            }}
          />
        </TabsContent>
      </Tabs>
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
  );
}

const FFmpegProviderWrapper = ({ children }: { children: ReactNode }) => {
  const { ffmpeg, loading } = useBaseFFmpeg();
  return loading || !ffmpeg ? (
    <strong>loading ffmpeg...</strong>
  ) : (
    <FFmpegProvider ffmpeg={ffmpeg}>{children}</FFmpegProvider>
  );
};

export default function App() {
  return (
    <FFmpegProviderWrapper>
      <AppStateProvider>
        <AppContent />
      </AppStateProvider>
    </FFmpegProviderWrapper>
  );
}
