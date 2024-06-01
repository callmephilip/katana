"use client";

import { useState } from "react";
import { useFFmpeg } from "@/features/ffmpeg/hooks/ffmpeg";

export const FFMpegTest = () => {
  const { loading, ffmpeg } = useFFmpeg();
  const [output, setOutput] = useState("");
  const [logs, setLogs] = useState("");

  return loading ? (
    <strong>loading...</strong>
  ) : (
    <>
      <strong data-cy="ffmpeg-loaded">loaded</strong>
      <button
        data-cy="download-mp3-from-url"
        onClick={async () => {
          if (!ffmpeg) {
            return;
          }

          const { url, filename } = await ffmpeg.saveFile({
            source: "/sample.mp3",
            filename: "sample.mp3",
            type: "audio/mp3",
          });

          setOutput(JSON.stringify({ url, filename }));
        }}
      >
        Download file from URL (mp3)
      </button>
      <button
        data-cy="download-txt-from-url"
        onClick={async () => {
          if (!ffmpeg) {
            return;
          }

          const { url, filename } = await ffmpeg.saveFile({
            source: "/sample.txt",
            filename: "sample.txt",
            type: "text/plain",
          });

          setOutput((await ffmpeg.readFile(filename, "utf8")) as string);
        }}
      >
        Download file from URL (text)
      </button>
      <button
        data-cy="read-file-as-object-url"
        onClick={async () => {
          if (!ffmpeg) {
            return;
          }

          const { filename } = await ffmpeg.saveFile({
            source: "/sample.mp3",
            filename: "sample.mp3",
            type: "audio/mp3",
          });

          setOutput(await ffmpeg.readFileAsObjectURL(filename, "audio/mp3"));
        }}
      >
        Download file from URL (text)
      </button>
      <button
        data-cy="slice-audio"
        onClick={async () => {
          if (!ffmpeg) {
            return;
          }

          const { filename } = await ffmpeg.saveFile({
            source: "/sample.mp3",
            filename: "sample.mp3",
            type: "audio/mp3",
          });

          const slice = await ffmpeg.sliceAudio({
            inputFilename: filename,
            start: 0,
            end: 10,
            outputFilename: "test-slice.mp3",
          });
          await ffmpeg.downloadFile(slice, "audio/mp3");
          setLogs((await ffmpeg.getLatestExecutionReport()) || "");
        }}
      >
        Slice audio
      </button>
      <hr />
      <div data-cy="output" dangerouslySetInnerHTML={{ __html: output }} />
      <div data-cy="logs" dangerouslySetInnerHTML={{ __html: logs }} />
    </>
  );
};
