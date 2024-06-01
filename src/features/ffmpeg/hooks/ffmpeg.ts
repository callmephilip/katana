import { useEffect, useState } from "react";
import { FFmpeg } from "@/features/ffmpeg/lib/ffmpeg";

interface UseFFmpeg {
  ffmpeg: FFmpeg | null;
  loading: boolean;
}

export const useFFmpeg = (): UseFFmpeg => {
  const [state, setState] = useState<UseFFmpeg>({
    ffmpeg: null,
    loading: true,
  });
  useEffect(() => {
    const load = async () => {
      const ffmpeg = await FFmpeg.getInstance();
      setState({ ffmpeg, loading: false });
    };
    load();
  }, []);
  return state;
};
