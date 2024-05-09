export const add = (a: number, b: number) => a + b;

export const getVideoIdFromURL = (url: string): string | null => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return urlParams.get("v");
};
