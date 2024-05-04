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
  slices: Slice[];
  addSlice: (slice: Slice) => void;
  removeSlice: (slice: Slice) => void;
  updateSlice: (slice: Slice) => void;
  deactiveSlice: () => void;
  sliceAudioToFile: (slice: Slice) => Promise<void>;
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
  const { sliceAudioToFile } = useFFmpeg();
  const [source, setSource] = useState<Source | null>(null);
  const [slices, setSlices] = useState<Slice[]>(
    JSON.parse(
      localStorage.getItem(localStorageKey) || JSON.stringify({ slices: [] })
    ).slices
  );

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
            await sliceAudioToFile({
              input: source!.filename,
              start: slice.start,
              end: slice.end,
            });
          }
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
