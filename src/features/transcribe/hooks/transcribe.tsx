import { wrap } from "comlink";

interface UseTranscribe {
  transcribe: (audio: number[]) => Promise<string>;
}

export const useTranscribe = (): UseTranscribe => {
  const transcribeWorker = wrap<{
    transcribe: () => Promise<string>;
  }>(
    new Worker(new URL("../workers/transcribe.ts", import.meta.url), {
      type: "module",
    })
  );
  return {
    async transcribe(audio): Promise<string> {
      // @ts-ignore
      return transcribeWorker.transcribe(audio);
    },
  };
};
