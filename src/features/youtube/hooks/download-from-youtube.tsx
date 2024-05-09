import { z } from "zod";

interface Youtube {
  getVideoInfo: (videoId: string) => Promise<{
    itag: number;
  } | null>;
  downloadAudio: (videoId: string, itag: number) => Promise<ArrayBuffer | null>;
}

export const useYoutube = (): Youtube => {
  return {
    getVideoInfo: async (videoId: string) => {
      try {
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
        return audio ? { itag: audio.itag } : null;
      } catch (error) {
        return null;
      }
    },
    downloadAudio: async (videoId: string, itag: number) => {
      try {
        const response = await fetch("/api/download-youtube-audio", {
          method: "POST",
          body: JSON.stringify({ videoId, itag }),
        });

        return await (await response.blob()).arrayBuffer();
      } catch (error) {
        console.error("Error downloading audio", error);
        return null;
      }
    },
  };
};
