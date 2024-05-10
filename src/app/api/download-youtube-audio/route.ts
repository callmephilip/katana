import { NextResponse, NextRequest } from "next/server";

const ytdl = require("ytdl-core");

export const POST = async (req: NextRequest) => {
  const { videoId, itag } = await req.json();

  if (!videoId || !itag) {
    return NextResponse.json(
      {
        success: false,
        error: "Provide videoId and itag parameters.",
      },
      {
        status: 400,
      }
    );
  }

  if (!ytdl.validateID(videoId)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid videoId parameter.",
      },
      {
        status: 400,
      }
    );
  }

  const { itagExists } = await ytdl
    .getBasicInfo(`https://www.youtube.com/watch?v=${videoId}`)
    // @ts-ignore
    .then((info) => ({
      videoName: info.player_response.videoDetails.title,
      // @ts-ignore
      itagExists: info.formats.filter((item) => item.itag == itag),
    }));

  if (!itagExists) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid quality/format selected.",
      },
      {
        status: 400,
      }
    );
  }

  var responseHeaders = new Headers();

  let contentLength = 0;
  const data = ytdl(videoId, {
    quality: itag,
    // @ts-ignore
    filter: (format) =>
      format.audioTrack ? format.audioTrack.audioIsDefault : format,
  });

  responseHeaders.set("Total-Bytes", `${contentLength}`);

  return new Response(data, {
    headers: responseHeaders,
  });
};
