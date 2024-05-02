"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import FileSaver from "file-saver";

class Slicer {
  private ffmpeg: FFmpeg;
  private basePath: string = "/home";
  private pathSouce: string = "source";
  private pathSlices: string = "slices";

  constructor() {
    this.ffmpeg = new FFmpeg();
  }

  public async loadSource(
    source: string | Uint8Array
  ): Promise<{ filename: string; url: string }> {
    const filename = `${new Date().getTime()}.mp3`;
    const fullPath = this.sourceFilePath(filename);
    await this.loadIFNeeded();
    await this.ffmpeg.writeFile(
      fullPath,
      typeof source === "string" ? await fetchFile(source) : source
    );
    await this.debug("Load source");
    return { filename, url: await this.getSourceAudioURL(filename) };
  }

  public async sliceAudio({
    input,
    start,
    end,
  }: {
    input: string;
    start: number;
    end: number;
  }): Promise<string> {
    const sliceFilename = `${new Date().getTime()}.mp3`;
    const r = await this.ffmpeg.exec([
      "-i",
      this.sourceFilePath(input),
      // "-vn",
      // "-acodec",
      // "copy",
      "-ss",
      start.toString(),
      "-to",
      end.toString(),
      this.slicesFilePath(sliceFilename),
    ]);
    await this.debug("Slice");
    return sliceFilename;
  }

  public async sliceAudioToFile({
    input,
    start,
    end,
  }: {
    input: string;
    start: number;
    end: number;
  }) {
    const sliceFilename = await this.sliceAudio({ input, start, end });
    await this.saveSliceToFile(sliceFilename);
  }

  public async attachSourceToAudioElement(
    filename: string,
    audio: HTMLAudioElement
  ): Promise<string> {
    return this.attachFileToAudioElement(this.sourceFilePath(filename), audio);
  }

  public async saveSliceToFile(filename: string) {
    const data = (await this.ffmpeg.readFile(
      this.slicesFilePath(filename)
    )) as any;
    FileSaver.saveAs(new Blob([data.buffer], { type: "audio/mp3" }), filename);
  }

  public async attachSliceToAudioElement(
    filename: string,
    audio: HTMLAudioElement
  ): Promise<string> {
    return this.attachFileToAudioElement(this.slicesFilePath(filename), audio);
  }

  private async attachFileToAudioElement(
    fullPath: string,
    audio: HTMLAudioElement
  ): Promise<string> {
    const data = (await this.ffmpeg.readFile(fullPath)) as any;
    const src = URL.createObjectURL(
      new Blob([data.buffer], { type: "audio/mp3" })
    );
    audio.src = src;
    return src;
  }

  public async getSourceAudioURL(filename: string): Promise<string> {
    const data = (await this.ffmpeg.readFile(
      this.sourceFilePath(filename)
    )) as any;
    return URL.createObjectURL(new Blob([data.buffer], { type: "audio/mp3" }));
  }

  public async loadIFNeeded() {
    if (!this.ffmpeg.loaded) {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await this.ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
      await Promise.all(
        ["source", "slices"].map((p) => this.makeDirIfNeeded(p))
      );
      await this.debug("Init");
    }
  }

  private async makeDirIfNeeded(directoryName: string) {
    try {
      await this.ffmpeg.listDir(`${this.basePath}/${directoryName}`);
    } catch (e) {
      await this.ffmpeg.createDir(`${this.basePath}/${directoryName}`);
    }
  }

  private sourceFilePath(filename: string) {
    return `${this.basePath}/${this.pathSouce}/${filename}`;
  }

  private slicesFilePath(filename: string) {
    return `${this.basePath}/${this.pathSlices}/${filename}`;
  }

  private async debug(groupName: string) {
    console.group(groupName);
    console.log("basePath", this.basePath);
    console.log("pathSouce", this.pathSouce);
    console.log("pathSlices", this.pathSlices);
    console.log(
      "Source",
      await this.ffmpeg.listDir(`${this.basePath}/${this.pathSouce}`)
    );
    console.log(
      "Slices",
      await this.ffmpeg.listDir(`${this.basePath}/${this.pathSlices}`)
    );
    console.groupEnd();
  }
}

interface FFmpegContextValue {
  loading: boolean;
  loadSource: (
    source: string | Uint8Array
  ) => Promise<{ filename: string; url: string }>;
  attachSourceToAudioElement: (
    filename: string,
    audio: HTMLAudioElement
  ) => Promise<string>;
  sliceAudioToFile: (args: {
    input: string;
    start: number;
    end: number;
  }) => Promise<void>;
}

const FFmpegContext = createContext<FFmpegContextValue | undefined>(undefined);

export const FFmpegProvider = ({ children }: { children: React.ReactNode }) => {
  const slicer = useRef<Slicer>(new Slicer());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      await slicer.current.loadIFNeeded();
      setLoading(false);
    };
    load();
  }, []);

  return (
    <FFmpegContext.Provider
      value={{
        loading,
        loadSource: (source: string | Uint8Array) =>
          slicer.current.loadSource(source),
        attachSourceToAudioElement(filename, audio) {
          return slicer.current.attachSourceToAudioElement(filename, audio);
        },
        sliceAudioToFile(args) {
          return slicer.current.sliceAudioToFile(args);
        },
      }}
    >
      {children}
    </FFmpegContext.Provider>
  );
};

export const useFFmpeg = () => {
  const context = useContext(FFmpegContext);
  if (!context) {
    throw new Error("useFFmpeg must be used within a FFmpegProvider");
  }
  return context;
};
