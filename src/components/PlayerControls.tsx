import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/Player";
import { Time } from "@/components/Time";

export const PlayerControls = () => {
  const { togglePlayback, currentTime, duration, playbackState } = usePlayer();
  return (
    <center>
      <div>
        <Button onClick={togglePlayback}>
          {playbackState === "playing" ? "⏸" : "▶️"}
        </Button>
      </div>
      <div>
        <Time time={currentTime} /> {"/"} <Time time={duration} />
      </div>
    </center>
  );
};
