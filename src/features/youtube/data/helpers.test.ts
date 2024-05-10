import { getVideoIdFromURL } from "./helpers";

describe("getVideoIdFromURL", () => {
  it("works", () => {
    expect(
      getVideoIdFromURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    ).toEqual("dQw4w9WgXcQ");
    expect(getVideoIdFromURL("www.youtube.com/watch?v=dQw4w9WgXcQ")).toEqual(
      "dQw4w9WgXcQ"
    );
    expect(
      getVideoIdFromURL("https://youtube.com/watch?v=dQw4w9WgXcQ")
    ).toEqual("dQw4w9WgXcQ");
    expect(
      getVideoIdFromURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ&foo=bar")
    ).toEqual("dQw4w9WgXcQ");
    expect(
      getVideoIdFromURL("https://www.youtube.com/watch?p=dQw4w9WgXcQ")
    ).toEqual(null);
    expect(getVideoIdFromURL("https://www.youtube.com/watch")).toEqual(null);
    expect(getVideoIdFromURL("https://www.youtube.com/watch?")).toEqual(null);
  });
});
