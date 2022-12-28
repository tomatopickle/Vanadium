import "../ui/index.tsx";
import ui from "../ui/index.tsx";
import formatNumber from "../lib/formatNumber.ts";

export default function recoTile(video: Video) {
  return (
    video.videoId
      ? (
        <a href={`/video/${video.videoId}`} key={video.videoId}>
          <div class="m-2 gap-2 w-full dark:(hover:bg-gray-700 active:bg-gray-600) flex transition-all  hover:bg-gray-100 active:bg-gray-200 p-2 rounded-lg">
            <div class="w-2/6 relative">
              <img
              class="rounded-lg object-fill w-full h-full"
                src={video.videoThumbnails
                  ? video.videoThumbnails[2].url
                  : "../noVid.jpg"}
                alt="Video Thumbnail"
              />
              <div class="px-2 py-1 bg-black bg-opacity-60 w-min rounded-lg text-sm absolute bottom-1 right-2">
                {fancyTimeFormat(Number(video.lengthSeconds))}
              </div>
            </div>
            <div class="w-2/3">
              <h3>{video.title}</h3>
              <div class="flex mt-0.5 block whitespace-nowrap">
                <small class='opacity-60'>
                  {formatNumber(video.viewCount)} views
                </small>
                <div class="w-full"></div>
                <small class='opacity-50'>
                  {video.publishedText}
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
