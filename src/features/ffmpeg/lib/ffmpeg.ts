import { FFmpeg as FFmpegBase } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import FileSaver from "file-saver";

export class FFmpeg {
  public static async getInstance() {
    if (!FFmpeg.instance) {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

      await FFmpeg.ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });

      FFmpeg.instance = new FFmpeg(FFmpeg.ffmpeg);
    }

    return FFmpeg.instance;
  }

  /**
   * Downloads file from URL or ArrayBuffer and returns local object URL + full file path within FFMpeg file system
   */
  public async saveFile({
    source,
    filename,
    type, // e.g. "audio/mp3"
  }: {
    source: string | ArrayBuffer;
    filename: string;
    type: string;
  }): Promise<{ filename: string; url: string }> {
    const fullPath = `${this.basePath}/${filename}`;

    await this.ffmpeg.writeFile(
      fullPath,
      typeof source === "string"
        ? await fetchFile(source)
        : new Uint8Array(source)
    );

    const data = (await this.ffmpeg.readFile(fullPath)) as any;

    return {
      filename,
      url: URL.createObjectURL(new Blob([data.buffer], { type })),
    };
  }

  /**
   * Reads file from FFMpeg file system
   *
   **/
  public async readFile(
    fileName: string,
    encoding: "binary" | "utf8" = "binary"
  ): Promise<Uint8Array | string> {
    return this.ffmpeg.readFile(`${this.basePath}/${fileName}`, encoding);
  }

  /**
   * Read file as object URL
   **/
  public async readFileAsObjectURL(
    fileName: string,
    type: string
  ): Promise<string> {
    const data = (await this.readFile(fileName)) as any;
    return URL.createObjectURL(new Blob([data.buffer], { type }));
  }

  /**
   * Returns dump of the latest ffmpeg run report
   *
   */
  public async getLatestExecutionReport(): Promise<string | null> {
    const entries = await this.ffmpeg.listDir(this.ffmpegCwd);

    const logFiles = entries
      .filter((e) => !e.isDir)
      .filter((e) => e.name.match(/ffmpeg-[0-9-]+\.log/gi));

    if (logFiles.length === 0) {
      return null;
    }

    return (await this.ffmpeg.readFile(
      `/${logFiles.sort()[logFiles.length - 1].name}`,
      "utf8"
    )) as string;
  }

  /**
   * Slice audio file
   *
   */
  public async sliceAudio({
    inputFilename,
    start,
    end,
    outputFilename,
  }: {
    inputFilename: string;
    start: number;
    end: number;
    outputFilename: string;
  }): Promise<string> {
    const output = `${this.basePath}/${outputFilename}`;
    const r = await this.ffmpeg.exec([
      "-i",
      `${this.basePath}/${inputFilename}`,
      "-report",
      // "-vn",
      // "-acodec",
      // "copy",
      "-ss",
      start.toString(),
      "-to",
      end.toString(),
      output,
    ]);
    return outputFilename;
  }

  /**
   * Download file from FFmpeg file system
   *
   */
  public async downloadFile(filename: string, type: string) {
    const data = (await this.readFile(filename)) as any;
    FileSaver.saveAs(new Blob([data.buffer], { type }), filename);
  }

  private constructor(ffmpeg: FFmpegBase) {
    this.ffmpeg = ffmpeg;
  }

  private static instance: FFmpeg;
  private static ffmpeg: FFmpegBase = new FFmpegBase();
  private ffmpeg: FFmpegBase;
  // this is what we consider base for content
  private basePath: string = "/home";
  // this is cwd for ffmpeg: useful for grabbing reports, for example
  private ffmpegCwd: string = "/";
}
