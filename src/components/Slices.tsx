"use client";

import sortBy from "lodash.sortby";
import { usePlayer } from "@/context/Player";
import { useAppState, Slice } from "@/context/AppState";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Time } from "@/components/Time";
import { Duration } from "@/components/Duration";
import { Trash2, Download, Play, Pause } from "lucide-react";

const SlicePlaybackControl = ({ slice }: { slice: Slice }) => {
  const { updateSlice } = useAppState();
  const { playbackState, togglePlayback } = usePlayer();

  if (!slice.isActive) {
    return (
      <Button
        onClick={(e) => {
          updateSlice(Object.assign({}, slice, { isActive: true }));
        }}
        variant="ghost"
        size="icon"
      >
        <Play className="h-4 w-4" />
        <span className="sr-only">Play</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={(e) => {
        togglePlayback();
      }}
      variant="ghost"
      size="icon"
    >
      {playbackState === "playing" ? (
        <>
          <Pause className="h-4 w-4" />
          <span className="sr-only">Pause</span>
        </>
      ) : (
        <>
          <Play className="h-4 w-4" />
          <span className="sr-only">Play</span>
        </>
      )}
    </Button>
  );
};

export const Slices = () => {
  const { removeSlice, slices, sliceAudioToFile } = useAppState();
  return slices.length === 0 ? null : (
    <Table>
      <TableBody>
        {sortBy(slices, "start").map((slice) => (
          <TableRow
            style={{
              fontWeight: slice.isActive ? "bold" : "normal",
            }}
            key={slice.id}
          >
            <TableCell className="w-[50px]">
              <SlicePlaybackControl slice={slice} />
            </TableCell>
            <TableCell className="w-[200px]">
              <div className="flex">
                <div className="flex-none w-8 pt-2">
                  <div
                    className="w-4 h-4 ring-2 rounded-full"
                    style={{ backgroundColor: slice.color }}
                  />
                </div>
                <div className="grow">
                  <Time time={slice.start} />
                  {"-"}
                  <Time time={slice.end} />
                  <div className="text-xs text-muted-foreground">
                    <Duration start={slice.start} end={slice.end} />
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSlice(slice);
                }}
                variant="ghost"
                size="icon"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button
                data-role="download-slice-button"
                onClick={(e) => {
                  e.stopPropagation();
                  sliceAudioToFile(slice);
                }}
                variant="ghost"
                size="icon"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
