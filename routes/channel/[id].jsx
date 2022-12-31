import Header from "../../components/Header.tsx";
import { Head } from "$fresh/runtime.ts";
import Videos from "../../islands/Videos.tsx";
import ChannelVideos from "../../islands/ChannelVideos.jsx";
import Body from "../../components/Body.tsx";
import Api from "../../lib/api.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import formatNumber from "../../lib/formatNumber.ts";
import Video from "../../components/Video.jsx";
import ui from "../../ui/index.tsx";
import Tabs from "../../islands/Tabs.jsx";

function formatTime(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleTimeString("en-us", options);
}

export const handler = {
  async GET(_, ctx) {
    const api = new Api("https://invidious.baczek.me/api/v1");
    const author = await api.getAuthor(ctx.params.id);
    const video = await api.getVideo(author.latestVideos[0].videoId);
    author.video = video;
    author.latestVideosFull = author.latestVideos;
    author.latestVideos.shift();
    author.latestVideos.length = 8;
    return ctx.render(author);
  },
};

export default function Page({ data }) {
  return (
    <>
      <Head>
        <title>{data.author} | Vanadium</title>
      </Head>
      <Header></Header>
      <Body class="p-0 overflow-x-hidden">
        <div
          class="w-full h-[9.6rem] bg-fixed bg-contain  flex justify-center items-center"
          style={`background-image:url(${data.authorBanners[0].url})`}
        >
        </div>
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
              "Channels",
              "About",
            ]}
            start={0}
          >
          </Tabs>

          <br />
          <div class="h-full w-full overflow-auto whitespace-nowrap overflow-x-hidden flex">
            <div class="whitespace-break-spaces inline-block h-full " id="Home">
              <div class="w-screen pr-14">
                <div class="flex gap-5 h-full">
                  <div class="w-1/3">
                    <Video
                      video={data.video}
                      class="min-w-[25%] w-full bg-black rounded-lg h-full max-h-[250px]"
                    >
                    </Video>
                  </div>
                  <div class="w-10/12 max-h-[50vh]">
                    <h2 class="font-semibold text-xl whitespace-nowrap">
                      {data.video.title}
                    </h2>
                    <div class="h-full">
                      <small class="opacity-70 truncate">
                        {formatNumber(data.video.likeCount)} Likes{" • "}
                        {data.video.publishedText}
                      </small>
                      <br />
                      <p class="w-3/4 h-3/5 truncate whitespace-break-spaces my-1">
                        {data.video.description}
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <h3 class="text-xl font-semibold">Latest Videos</h3>
                <br />
                <Videos data={data.latestVideos}></Videos>
              </div>
            </div>
            <div
              class="whitespace-break-spaces inline-block  h-full"
              id="Videos"
            >
              <div class="w-screen pr-14">
                <ChannelVideos id={data.authorId} />
              </div>
            </div>
            <div
              class="whitespace-break-spaces inline-block  h-full"
              id="Playlists"
            >
              <div class="w-screen">
                <h4 class="m-auto">Coming Soon...</h4>
              </div>
            </div>
            <div
              class="whitespace-break-spaces inline-block  h-full"
              id="Channels"
            >
              <div class="w-screen">
                <div>
                  {data.relatedChannels.map((channel) => (
                    <a href={`./${channel.authorId}`} class="inline-block p-5">
                      <img
                        src={`https://${channel.authorThumbnails[2].url}`}
                        class="rounded-full m-auto"
                      />
                      <h5 class="text-center mt-2 truncate">
                        {channel.author}
                      </h5>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div
              class="whitespace-break-spaces inline-block  h-full"
              id="About"
            >
              <div class="w-screen">
                <div class="flex">
                  <div class="w-3/4 border-r-1 border-gray-700">
                    <h5 class="text-xl font-semibold">Description</h5>
                    <br />
                    <p>{data.description}</p>
                  </div>
                  <div class="w-1/4 pl-4">
                    <h5 class="text-xl font-semibold mb-1">Info</h5>
                    <div>
                      {!data.isFamilyFriendly && <div>Not</div>}
                      {""}
                      <div>Family Friendly</div>
                    </div>
                    <div>
                      {formatNumber(data.totalViews)} views
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}
