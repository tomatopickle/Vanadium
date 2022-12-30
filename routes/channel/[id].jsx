import Header from "../../components/Header.tsx";
import { Head } from "$fresh/runtime.ts";
import Videos from "../../islands/Videos.tsx";
import Body from "../../components/Body.tsx";
import Api from "../../lib/api.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import formatNumber from "../../lib/formatNumber.ts";
import Video from "../../components/Video.jsx";
import ui from "../../ui/index.tsx";
import Tabs from "../../islands/Tabs.jsx";

export const handler = {
  async GET(_, ctx) {
    const api = new Api("https://invidious.baczek.me/api/v1");
    const author = await api.getAuthor(ctx.params.id);
    const video = await api.getVideo(author.latestVideos[0].videoId);
    author.video = video;
    return ctx.render(author);
  },
};

export default function Page({ data }) {
  console.log(data.latestVideos[0]);
  return (
    <>
      <Head>
        <title>{data.author} | Vanadium</title>
      </Head>
      <Body class="p-0">
        <div
          class="w-full h-40 bg-fixed bg-contain bg-center flex justify-center items-center"
          style={`background-image:url(${data.authorBanners[0].url})`}
        >
        </div>
        {/* <img src={data.authorBanners[0].url} alt="" srcset="" /> */}
        <div class="p-5">
          <div class="flex gap-4">
            {data.authorThumbnails
              ? (
                <img
                  class="rounded-full object-cover w-14"
                  src={data.authorThumbnails.at(-1).url}
                  alt="Channel Photo"
                  srcset=""
                />
              )
              : <div></div>}
            <div class="block">
              <h1 class="font-semibold text-2xl whitespace-nowrap">
                {data.author}
              </h1>
              <small class="opacity-70 truncate">
                {formatNumber(data.subCount)} subscribers
              </small>
            </div>
          </div>
          <br />
          <Tabs
            tabs={[
              "Home",
              "Videos",
              "Playlists",
              "Community",
              "Channels",
              "About",
            ]}
            start={0}
          >
            <div>dfg</div>
            <div>sdf</div>
          </Tabs>
          {
            /* <div class={ui.tab.border}>
            <ul class="flex flex-wrap -mb-px">
              <li class="mr-2">
                <a
                  href="#"
                  class={ui.tab.selected}
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li class="mr-2">
                <a
                  href="#"
                  class={ui.tab.default}
                >
                  Videos
                </a>
              </li>
              <li class="mr-2">
                <a
                  href="#"
                  class={ui.tab.default}
                >
                  Playlists
                </a>
              </li>{" "}
              <li class="mr-2">
                <a
                  href="#"
                  class={ui.tab.default}
                >
                  Community
                </a>
              </li>
              <li class="mr-2">
                <a
                  href="#"
                  class={ui.tab.default}
                >
                  Channels
                </a>
              </li>{" "}
              <li class="mr-2">
                <a
                  href="#"
                  class={ui.tab.default}
                >
                  About
                </a>
              </li>
            </ul>
          </div> */
          }

          <br />
          <div class="flex gap-3 h-60">
            <div class="w-1/3">
              <Video
                video={data.video}
                class="min-w-[25%] w-full bg-black rounded-lg h-full"
              >
              </Video>
            </div>
            <div class="w-10/12">
              <h2 class="font-semibold text-xl whitespace-nowrap">
                {data.video.title}
              </h2>
              <div class="h-full">
                <small class="opacity-70 truncate">
                  {formatNumber(data.video.likeCount)} Likes{" "}
                  {data.video.publishedText}
                </small>
                <br />
                <p class="w-3/4 h-3/5 truncate whitespace-break-spaces my-1">
                  {data.video.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}
