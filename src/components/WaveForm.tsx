"use client";

import difference from "lodash.difference";
import { useRef, useMemo, useEffect } from "react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { useWavesurfer } from "@wavesurfer/react";
import { usePlayer } from "@/context/Player";
import { useAppState } from "@/context/AppState";

// Give regions a random color when they are created
const random = (min: number, max: number) => Math.random() * (max - min) + min;

const randomColor = () =>
  `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

export const Waveform = () => {
  const { slices, addSlice, updateSlice, deactiveSlice } = useAppState();
  const { audio } = usePlayer();
  const containerRef = useRef(null);
  const regions = useMemo(() => RegionsPlugin.create(), []);
  const { wavesurfer, isReady } = useWavesurfer({
    container: containerRef,
    height: 50,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    media: audio,
    autoplay: false,
    plugins: useMemo(
      () => [
        regions,
        TimelinePlugin.create({
          height: 10,
          timeInterval: 30,
          primaryLabelInterval: 60,
          style: {
            fontSize: "8px",
            color: "#6A3274",
          },
        }),
      ],
      []
    ),
  });

  useEffect(() => {
    if (!isReady) return;

    regions.on("region-created", (region) => {
      if (slices.map((s) => s.id).includes(region.id)) {
        return;
      }
      const color = randomColor();
      // @ts-ignore
      region.setOptions({ color });
      addSlice({
        id: region.id,
        isActive: false,
        start: region.start,
        end: region.end,
        color,
      });
    });

    regions.on("region-updated", (region) => {
      updateSlice({
        id: region.id,
        isActive: true,
        start: region.start,
        end: region.end,
        color: region.color,
      });
    });

    regions.on("region-clicked", (region, e) => {
      e.stopPropagation();

      updateSlice({
        id: region.id,
        isActive: true,
        start: region.start,
        end: region.end,
        color: region.color,
      });
    });

    regions.enableDragSelection({
      color: "rgba(255, 0, 0, 0.1)",
      drag: true,
      resize: true,
    });

    slices.forEach((slice) => {
      console.log(">>>> adding slices", slice);
      regions.addRegion({
        id: slice.id,
        start: slice.start,
        end: slice.end,
        color: slice.color,
        content: slice.isActive ? "▶️" : undefined,
      });
    });

    wavesurfer?.on("click", () => {
      deactiveSlice();
    });
  }, [isReady]);

  useEffect(() => {
    const regionsToDelete = difference(
      regions.getRegions().map((r) => r.id),
      slices.map((s) => s.id)
    );
    regionsToDelete.forEach((id: string) => {
      const r = regions.getRegions().find((r) => r.id === id);
      if (r) {
        r.remove();
      }
    });

    const regionsToAdd = difference(
      slices.map((s) => s.id),
      regions.getRegions().map((r) => r.id)
    );

    console.log(">>>> regionsToAdd", regionsToAdd);

    // region to activate
    const activeRegionId = slices.find((s) => s.isActive)?.id;

    if (activeRegionId) {
      regions
        .getRegions()
        .forEach((r) =>
          r.setContent(r.id === activeRegionId ? "▶️" : undefined)
        );
    } else {
      regions.getRegions().forEach((r) => r.setContent(undefined));
    }
  }, [slices]);

  wavesurfer?.on("redrawcomplete", () => {
    // setLoading(false);
  });

  return (
    <div data-cy="application-waveform" id="waveform" ref={containerRef} />
  );
};
