"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTranscribe } from "@/features/transcribe/hooks/transcribe";
import { FFmpegProvider, useFFmpeg } from "@/context/FFmpeg";
import { AppStateProvider, useAppState } from "@/context/AppState";
import { parseSilenceDetectReport } from "@/lib/ffmpeg";

const downloadAudioFromUrl = async (
  audioDownloadUrl: string,
  requestAbortController: AbortController
) => {
  if (audioDownloadUrl) {
    try {
      // setAudioData(undefined);
      // setProgress(0);
      const { data, headers } = (await axios.get(audioDownloadUrl, {
        signal: requestAbortController.signal,
        responseType: "arraybuffer",
        // onDownloadProgress(progressEvent) {
        //   setProgress(progressEvent.progress || 0);
        // },
      })) as {
        data: ArrayBuffer;
        headers: { "content-type": string };
      };

      let mimeType = headers["content-type"];
      if (!mimeType || mimeType === "audio/wave") {
        mimeType = "audio/wav";
      }
      // setAudioFromDownload(data, mimeType);
      return data;
    } catch (error) {
      console.log("Request failed or aborted", error);
    } finally {
      // setProgress(undefined);
    }
  }
};

export const TestTranscribe = () => {
  const { transcribe } = useTranscribe();
  const { source, addSlice } = useAppState();
  const {
    getAudioBufferForFile,
    exec,
    getLatestExecutionReport,
    sliceAudioToFile,
  } = useFFmpeg();

  return (
    <>
      <strong>TestTranscribe</strong>
      <button
        onClick={async () => {
          // const requestAbortController = new AbortController();
          // const d = await downloadAudioFromUrl(
          //   "/test.wav",
          //   requestAbortController
          // );
          //   const blobUrl = URL.createObjectURL(
          //     new Blob([d], { type: "audio/*" })
          //   );

          console.log(
            ">>>>>>>>>>>>>>>> split >>>>>>>>>>>",
            await exec([
              "-i",
              "/home/source/TEST.mp3",
              "-report",
              "-af",
              "silencedetect=n=-60dB:d=1", // "silencedetect=d=0.8",
              "-f",
              "null",
              "-",
            ])
          );

          const { silence, sound } = parseSilenceDetectReport(
            (await getLatestExecutionReport()) || ""
          );

          await sliceAudioToFile({
            input: source!.filename,
            start: sound[0].start,
            end: sound[0].end,
          });

          //slices.forEach((slice) => {
          // console.log(">>>>>>>>>>>>>>>>", slice);
          // addSlice({
          //   id: `${new Date().getTime()}`,
          //   isActive: false,
          //   start: slice.start,
          //   end: slice.end,
          //   color: "red",
          // });
          //});

          // id: string;
          // isActive: boolean;
          // start: number;
          // end: number;
          // color?: string;

          // const audioCTX = new AudioContext({
          //   sampleRate: 16000, // Constants.SAMPLING_RATE,
          // });
          // const d = await getAudioBufferForFile(source!.filename);
          // // @ts-ignore
          // const decoded = await audioCTX.decodeAudioData(d);

          // let audio;
          // if (decoded.numberOfChannels === 2) {
          //   const SCALING_FACTOR = Math.sqrt(2);

          //   let left = decoded.getChannelData(0);
          //   let right = decoded.getChannelData(1);

          //   audio = new Float32Array(left.length);
          //   for (let i = 0; i < decoded.length; ++i) {
          //     audio[i] = (SCALING_FACTOR * (left[i] + right[i])) / 2;
          //   }
          // } else {
          //   // If the audio is not stereo, we can just use the first channel:
          //   audio = decoded.getChannelData(0);
          // }

          // console.log(">>>>>>>> input size", audio.length);
          // // @ts-ignore
          // console.log(">>>>>>>>>>>>>>>>", await transcribe(audio));
        }}
      >
        Test
      </button>
    </>
  );
};
