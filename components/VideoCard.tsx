import "../ui/index.tsx";
import ui from "../ui/index.tsx";
import formatNumber from "../lib/formatNumber.ts";

export default function videoCard(video: Video) {
  return (
    <a href={`/video/${video.videoId}`} key={video.videoId}>
      <div class="max-w-sm dark:(hover:bg-gray-700 active:bg-gray-600) transition-all  hover:bg-gray-100 active:bg-gray-200 p-2 rounded-lg">
        <div class="relative">
          <img
            class="rounded-lg max-h-32 w-full"
            src={video.videoThumbnails[0].url}
            alt="Video Thumbnail"
          />
          <div class="px-2 py-1 bg-black bg-opacity-60 w-min rounded-lg text-sm absolute bottom-1 right-2">
            {fancyTimeFormat(Number(video.lengthSeconds))}
          </div>
        </div>
        <div class="py-5 pt-3">
          <div class="flex">
            <small class="opacity-60">{formatNumber(video.viewCount)} views</small>
          </div>
          <h5 class="text-base font-semibold tracking-tight ">
            {video.title}
          </h5>
          <small class="opacity-70">{video.author}</small>
        </div>
      </div>
    </a>
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


