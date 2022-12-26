import "../ui/index.tsx";
import ui from "../ui/index.tsx";
import formatNumber from "../lib/formatNumber.ts";

export default function videoCard(video: Video) {
  console.log(video.videoThumbnails);
  return (
    video.videoId
      ? (
        <a href={`/video/${video.videoId}`} key={video.videoId}>
          <div class="w-full dark:(hover:bg-gray-700 active:bg-gray-600) flex transition-all  hover:bg-gray-100 active:bg-gray-200 p-2 rounded-lg">
            <div class="relative mr-3 w-1/5">
              <img
                class="rounded-lg object-cover h-28 w-full"
                src={video.videoThumbnails
                  ? video.videoThumbnails[2].url
                  : "../noVid.jpg"}
                alt="Video Thumbnail"
              />
              <div class="px-2 py-1 bg-black bg-opacity-60 w-min rounded-lg text-sm absolute bottom-1 right-2">
                {fancyTimeFormat(Number(video.lengthSeconds))}
              </div>
            </div>
            <div class="py-5 pt-3 flex-col">
              <h5 class="text-base font-semibold tracking-tight ">
                {video.title}
              </h5>
              <div class="flex mt-0.5 block">
                <small class="opacity-60">
                  {formatNumber(video.viewCount)} views
                </small>
              </div>
              <small class="opacity-90">{video.author}</small>
            </div>
          </div>
        </a>
      )
      : <div></div>
  );
}

function fancyTimeFormat(duration: number) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
