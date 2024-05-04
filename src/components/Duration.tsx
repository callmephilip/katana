const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const withZero = (n: number) => (n < 10 ? `0${n}` : n);
  return `${withZero(minutes)}:${withZero(seconds)}`;
};

export const Duration = ({ start, end }: { start: number; end: number }) => {
  const d = end - start;
  return <span>{formatTime(d)}</span>;
};
