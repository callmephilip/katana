"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useFFmpeg } from "@/context/FFmpeg";

interface Source {
  filename: string;
  url: string;
}

export interface Slice {
  id: string;
  isActive: boolean;
  start: number;
  end: number;
  color?: string;
}

interface AppStateContextValue {
  source: Source | null;
  setSource: (source: Source) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  slices: Slice[];
  addSlice: (slice: Slice) => void;
  removeSlice: (slice: Slice) => void;
  updateSlice: (slice: Slice) => void;
  deactiveSlice: () => void;
  sliceAudioToFile: (slice: Slice) => Promise<void>;
  loadSampleProject: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(
  undefined
);

const localStorageKey = "katana-app-state";

export const AppStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { ffmpeg } = useFFmpeg();
  const [source, setSource] = useState<Source | null>(null);
  const [slices, setSlices] = useState<Slice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        slices,
      })
    );
  }, [slices]);

  return (
    <AppStateContext.Provider
      value={{
        loading,
        setLoading(loading) {
          setLoading(loading);
        },
        source,
        slices,
        setSource(source) {
          setSource(source);
        },
        addSlice(slice) {
          setSlices((slices) => {
            if (slices.find((s) => s.id === slice.id)) {
              // trying to add existing slice
              return slices.map((s) => {
                return s.id === slice.id
                  ? { ...slice, isActive: true }
                  : { ...s, isActive: false };
              });
            } else {
              return [
                ...slices.map((s) => ({ ...s, isActive: false })),
                { ...slice, isActive: true },
              ];
            }
          });
        },
        updateSlice(slice) {
          const isActive = slice.isActive;

          setSlices((slices) => [
            ...slices.map((s) => {
              return s.id !== slice.id
                ? isActive
                  ? { ...s, isActive: false } // there can only be one
                  : s
                : slice;
            }),
          ]);
        },
        removeSlice(slice) {
          setSlices((slices) => slices.filter((s) => s.id !== slice.id));
        },
        deactiveSlice() {
          setSlices((slices) =>
            slices.map((s) => {
              return { ...s, isActive: false };
            })
          );
        },
        async sliceAudioToFile(slice) {
          if (source!.filename) {
            const slice = await ffmpeg.sliceAudio({
              inputFilename: source!.filename,
              start: slice.start,
              end: slice.end,
              outputFilename: `${new Date().getTime()}.mp3`,
            });
            await ffmpeg.downloadFile(slice, "audio/mp3");
          }
        },
        async loadSampleProject() {
          setSource(
            await ffmpeg.saveFile({
              source:
                "https://qvpozsgvtxumtvszyujr.supabase.co/storage/v1/object/public/tldl-episodes-audio/SEnuWRLMI88.mp3",
              filename: "SEnuWRLMI88.mp3",
              type: "audio/mp3",
            })
          );
          setSlices([
            {
              id: "region-kn0h83n196g",
              isActive: false,
              start: 62.72420387606064,
              end: 137.24196626691204,
              color:
                "rgba(126.06706376821512, 53.9018078320232, 159.87745179711112, 0.5)",
            },
            {
              id: "region-k6910rgv0o",
              isActive: false,
              start: 217.0853686095044,
              end: 287.75309030387893,
              color:
                "rgba(190.82468864461202, 49.96306824495382, 173.5808003939328, 0.5)",
            },
            {
              id: "region-en4rrkq7deg",
              isActive: false,
              start: 788.4044427010555,
              end: 827.9722247616351,
              color:
                "rgba(153.89749524478503, 70.04126649364495, 127.89376108035697, 0.5)",
            },
            {
              id: "region-vqpj8s8d15",
              isActive: false,
              start: 473.0231907066041,
              end: 610.1790179306969,
              color:
                "rgba(180.69379543025715, 16.281924389786536, 13.63414441387264, 0.5)",
            },
          ]);
          setLoading(false);
        },
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return context;
};
