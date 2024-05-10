"use client";

import { z } from "zod";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFFmpeg } from "@/context/FFmpeg";
import { useAppState } from "@/context/AppState";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export const FileUpload = () => {
  const { setSource, setLoading, loadSampleProject } = useAppState();
  const { loadSource } = useFFmpeg();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 0) {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        setSource(await loadSource(reader.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
    },
  });

  const downloadFromYoutube = async () => {
    const videoId = "Z8OVUUkzVeg";
    const data = await fetch("/api/get-youtube-video-info", {
      method: "POST",
      body: JSON.stringify({ videoId }),
    });
    const { formats } = z
      .object({
        success: z.literal(true),
        formats: z
          .object({
            itag: z.number(),
            mimeType: z.string(),
          })
          .array(),
      })
      .parse(await data.json());
    const audio = formats.find((f) => f.mimeType.match(/^audio/gi));

    if (!audio) {
      alert("No audio found");
      return;
    }

    const response = await fetch("/api/download-youtube-audio", {
      method: "POST",
      body: JSON.stringify({ videoId, itag: audio.itag }),
    });

    setSource(
      await loadSource(
        new Uint8Array(await (await response.blob()).arrayBuffer())
      )
    );
  };

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full"
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop OR
          </p>
          <Button
            data-cy="load-sample"
            variant="ghost"
            onClick={async (e) => {
              e.stopPropagation();
              setLoading(true);
              await loadSampleProject();
            }}
          >
            Load sample
          </Button>
          <Button
            variant="ghost"
            onClick={async (e) => {
              e.stopPropagation();
              // setLoading(true);
              await downloadFromYoutube();
            }}
          >
            Youtube
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">MP3, WAV</p>
        </div>
        <input data-cy="upload-file" {...getInputProps()} />
      </label>
    </div>
  );
};
