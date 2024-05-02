const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const withZero = (n: number) => (n < 10 ? `0${n}` : n);
  return `${withZero(minutes)}:${withZero(seconds)}`;
};

export const Time = ({ time }: { time: number }) => {
  return <strong>{formatTime(time)}</strong>;
};
