import { usePlayer } from "@/context/Player";
import { Button } from "@/components/ui/button";
import { Time } from "@/components/Time";
import { Play, Pause } from "lucide-react";

export const PlayerControls = () => {
  const { togglePlayback, currentTime, duration, playbackState } = usePlayer();
  return (
    <center>
      <div>
        <Button
          className="rounded-full"
          onClick={(e) => {
            togglePlayback();
          }}
          variant="ghost"
          size="icon"
        >
          {playbackState === "playing" ? (
            <>
              <Pause className="h-12 w-12" />
              <span className="sr-only">Pause</span>
            </>
          ) : (
            <>
              <Play className="h-12 w-12" />
              <span className="sr-only">Play</span>
            </>
          )}
        </Button>
      </div>
      <div className="text-xs">
        <Time time={currentTime} /> {"/"} <Time time={duration} />
      </div>
    </center>
  );
};
