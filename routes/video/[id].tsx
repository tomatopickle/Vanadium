// import { PageProps } from "$fresh/server.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Body from "../../components/Body.tsx";
import Header from "../../components/Header.tsx";
import RecoTile from "../../components/RecoTile.tsx";

import Api from "../../lib/api.tsx";
import ui from "../../ui/index.tsx";
import formatNumber from "../../lib/formatNumber.ts";
import IconThumbUp from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/thumb-up.tsx";
import IconThumbDown from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/thumb-down.tsx";
import Comments from "../../islands/Comments.tsx";
import Linkify from "https://esm.sh/react-linkify";

export const handler: Handlers = {
  async GET(_, ctx) {
    const videoId = ctx.params.id;
    const api = new Api("https://invidious.baczek.me/api/v1");
    const video = await api.getVideo(videoId);
    const author = await api.getAuthor(video.authorId);
    // const recosData = await api.searchVideos(video.title);
    const recosData = video.recommendedVideos;
    const comments = await api.getVideoComments(videoId);
    console.log(video);
    return ctx.render({
      video,
      author,
      comments: comments.comments,
      recosData,
    });
  },
};

export default function Page({ data }: PageProps) {
  return (
    <>
      <Body class="p-0">
        <Header>
          <button class={ui.btnPrimary}>Log in</button>
        </Header>
        <Head>
          <script src="https://vjs.zencdn.net/7.20.3/video.min.js"></script>
          <link
            href="https://vjs.zencdn.net/7.20.3/video-js.css"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/@silvermine/videojs-quality-selector/dist/css/quality-selector.css"
            rel="stylesheet"
          />
          <script src="https://unpkg.com/@silvermine/videojs-quality-selector/dist/js/silvermine-videojs-quality-selector.min.js">
          </script>

          <title>
            {!data.video.error ? data.video.title : "Error"} | Vanadium
          </title>
        </Head>

        <div class="p-3">
          {!data.video.error
            ? (
              <p class="my-6">
                <div class="flex h-full gap-1">
                  <div class="w-2/3 h-4/5 h-screen">
                    <video
                      id="video"
                      preload="auto"
                      data-setup="{}"
                      controls
                      class="video-js  vjs-big-play-centered h-3/5 w-full"
                    >
                      {data.video.captions.map((source: any) => {
                        return (
                          <track
                            kind="captions"
                            src={`http://localhost:8000/api/cc?url=https://invidious.weblibre.org${source.url}`}
                            srclang={source.language_code}
                            label={source.label}
                            default
                          />
                        );
                      })}
                      {data.video.formatStreams.map((source: any) => {
                        return (
                          <source
                            label={source.qualityLabel}
                            src={source.url}
                            type={source.type}
                          />
                        );
                      })}
                    </video>
                    <h1 class="text-xl font-bold my-3">{data.video.title}</h1>
                    <div class="flex my-3 gap-2 align-middle">
                      {data.author.authorThumbnails
                        ? (
                          <img
                            class="rounded-full object-cover w-14"
                            src={data.author.authorThumbnails.at(-1).url}
                            alt="Channel Photo"
                            srcset=""
                          />
                        )
                        : <div></div>}
                      <div class="block">
                        <h2 class="font-semibold whitespace-nowrap">
                          {data.author.author}
                        </h2>
                        <small class="opacity-70 truncate">
                          {formatNumber(data.author.subCount)} subscribers
                        </small>
                      </div>
                      <div class="w-full"></div>
                      <div class="dark:( bg-gray-700) rounded-full pl-3 pr-3 flex">
                        <button class="truncate border-r border-gray-600 pr-2 font-medium ">
                          <div class="flex">
                            <IconThumbUp class="pr-1" />{" "}
                            <div>{formatNumber(data.video.likeCount)}</div>
                          </div>
                        </button>
                        <button class="truncate pl-2 font-medium">
                          <div class="flex">
                            <IconThumbDown />
                          </div>
                        </button>
                      </div>
                    </div>
                    <br />
                    <div class="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-700 p-3 dark:border-gray-700">
                      <p class="break-all">
                        <Linkify>{data.video.description}</Linkify>
                      </p>
                    </div>
                    <br />
                    <h2 class="text-lg font-semibold">Comments</h2>
                    {data.comments
                      ? (
                        <Comments
                          comments={data.comments}
                          videoId={data.video.videoId}
                        />
                      )
                      : <h4 class="text-center">No Comments Yet</h4>}
                    <br />
                  </div>
                  <div class="w-2/6">
                    <div class="w-full">
                      {data.recosData.map((reco: any) => RecoTile(reco))}
                    </div>
                  </div>
                </div>
                <script>
                  {`videojs('video', {}, function() {
   var player = this;

   player.controlBar.addChild('QualitySelector');
});`}
                </script>
                <style>
                  {`
                  .video-js .vjs-control:focus:before, .video-js .vjs-control:hover:before, .video-js .vjs-control:focus{
                    text-shadow:none;
                    opacity:0.7;
                  }
                `}
                </style>
              </p>
            )
            : (
              <div>
                <h1 class="text-2xl p-10 pb-0 font-bold text-center">
                  Error
                </h1>
                <h2 class="text-lg p-10 py-1  text-center">
                  {data.video.error}
                </h2>
                <a href="../">
                  <button class={ui.btnPrimary + " block m-auto"}>
                    Go Home
                  </button>
                </a>
              </div>
            )}
        </div>
      </Body>
    </>
  );
}
