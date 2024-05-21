import chunk from "lodash.chunk";

interface SoundSlice {
  start: number;
  end: number;
  duration: number;
}

export const parseSilenceDetectReport = (
  report: string,
  minSoundSliceDurationInSeconds = 0 // 10
): { silence: SoundSlice[]; sound: SoundSlice[] } => {
  const silence: SoundSlice[] = [];
  const sound: SoundSlice[] = [];

  chunk(
    report.split("\n").filter((line) => line.includes("[silencedetect")),
    2
  ).forEach((group) => {
    const commandOutput = [group[0], group[1]].join(" ");
    const match = commandOutput.match(
      /silence_start: ([0-9.]+).+ silence_end: ([0-9.]+).+ silence_duration: ([0-9.]+)/
    );

    if (match) {
      const [_, start, end, duration] = match;
      silence.push({
        start: parseFloat(start),
        end: parseFloat(end),
        duration: parseFloat(duration),
      });
    }
  });

  let start = 0;

  silence.forEach((silenceSlice) => {
    const soundSlice: SoundSlice = {
      start,
      end: silenceSlice.start,
      duration: silenceSlice.start - start,
    };
    start = silenceSlice.end;
    sound.push(soundSlice);
  });

  // merge sound slices that are too short
  const mergedSound: SoundSlice[] = [];
  let currentSound: SoundSlice | null = null;

  sound.forEach((soundSlice) => {
    if (!currentSound) {
      currentSound = soundSlice;
    } else if (
      currentSound.end - currentSound.start <
      minSoundSliceDurationInSeconds
    ) {
      currentSound.end = soundSlice.end;
    } else {
      currentSound.duration = currentSound.end - currentSound.start;
      mergedSound.push(currentSound);
      currentSound = soundSlice;
    }
  });

  if (currentSound) {
    currentSound.duration = currentSound.end - currentSound.start;
    mergedSound.push(currentSound);
  }

  return { silence, sound: mergedSound };
};
