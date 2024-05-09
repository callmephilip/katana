"use client";

import { useReducer } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useYoutube } from "@/features/youtube/hooks/download-from-youtube";
import { getVideoIdFromURL } from "@/features/youtube/data/helpers";

interface State {
  loading: boolean;
  videoURL?: string;
  videoId?: string | null;
}

type UpdateVideURL = { type: "updateVideoURL"; videoURL: string };
type DownloadAction = { type: "download" };
type ClearAction = { type: "clear" };

function reducer(
  state: State,
  action: DownloadAction | UpdateVideURL | ClearAction
) {
  if (action.type === "updateVideoURL") {
    const videoId = getVideoIdFromURL(action.videoURL);
    return { ...state, videoURL: action.videoURL, videoId };
  }
  if (action.type === "download") {
    return { ...state, loading: true };
  }
  if (action.type === "clear") {
    return { loading: false };
  }
  return state;
}

export const DowloadFromYoutube = ({
  onDownload,
}: {
  onDownload: (audio: ArrayBuffer) => Promise<void>;
}) => {
  const { getVideoInfo, downloadAudio } = useYoutube();
  const [state, dispatch] = useReducer(reducer, { loading: false });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Download audio from Youtube</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            disabled={state.loading}
            onChange={(e) => {
              dispatch({ type: "updateVideoURL", videoURL: e.target.value });
            }}
            value={state.videoURL || ""}
            id="videoURL"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={state.loading || !state.videoId}
          onClick={async () => {
            dispatch({ type: "download" });
            const videoInfo = await getVideoInfo(state.videoId!);
            const audioData =
              videoInfo &&
              (await downloadAudio(state.videoId!, videoInfo.itag));
            if (!audioData) {
              alert("Cannot pull audio for this video");
              dispatch({ type: "clear" });
              return;
            }
            await onDownload(audioData);
            dispatch({ type: "clear" });
          }}
        >
          {state.loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Get audio
        </Button>
      </CardFooter>
    </Card>
  );
};
