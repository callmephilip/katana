"use client";

import React, { createContext, useContext, useRef, useState } from "react";
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
}

interface AppStateContextValue {
  source: Source | null;
  setSource: (source: Source) => void;
  slices: Slice[];
  addSlice: (slice: Slice) => void;
  activateSlice: (slice: Slice) => void;
  sliceAudioToFile: ({
    start,
    end,
  }: {
    start: number;
    end: number;
  }) => Promise<void>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(
  undefined
);

export const AppStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { sliceAudioToFile } = useFFmpeg();
  const [source, setSource] = useState<Source | null>(null);
  const [slices, setSlices] = useState<Slice[]>([]);
  return (
    <AppStateContext.Provider
      value={{
        source,
        slices,
        setSource(source) {
          setSource(source);
        },
        addSlice(slice) {
          setSlices([
            ...slices.map((s) => ({ ...s, isActive: false })),
            {
              id: new Date().getTime().toString(),
              start: 0,
              end: 10,
              isActive: true,
            },
          ]);
        },
        activateSlice(slice) {
          setSlices([
            ...slices.map((s) => ({
              ...s,
              isActive: s.id === slice.id,
            })),
          ]);
        },
        async sliceAudioToFile({ start, end }) {
          if (source!.filename) {
            await sliceAudioToFile({
              input: source!.filename,
              start,
              end,
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
