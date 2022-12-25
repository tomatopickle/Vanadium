// import { PageProps } from "$fresh/server.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Body from "../../components/Body.tsx";
import Header from "../../components/Header.tsx";
import Videos from "../../islands/Videos.tsx";
import Api from "../../lib/api.tsx";
import ui from "../../ui/index.tsx";
import formatNumber from "../../lib/formatNumber.ts";
import IconThumbUp from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/thumb-up.tsx";
import IconThumbDown from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/thumb-down.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const videoId = ctx.params.id;
    const api = new Api("https://yt.funami.tech/api/v1");
    const video = await api.getVideo(videoId);
    const author = await api.getAuthor(video.authorId);
    console.log(video);
    return ctx.render({ video, author });
  },
};

export default function Page({ data }: PageProps) {
  return (
    <>
      <Header>
        <button class={ui.btnPrimary}>Log in</button>
      </Header>

      <Body class="p-3">
        <Head>
          <title>Vanadium</title>
        </Head>

        {!data.error
          ? (
            <p class="my-6">
              <div class="flex h-full">
                <div class="w-3/4 h-4/5 h-screen">
                  <video
                    src={`https://vid.puffyan.us/latest_version?id=${data.video.videoId}&itag=22`}
                    controls
                    class="h-3/5 w-full"
                  >
                  </video>
                  <h1 class="text-xl font-bold my-3">{data.video.title}</h1>
                  <div class="flex my-3 gap-2 align-middle">
                    <img
                      class="rounded-full "
                      src={data.author.authorThumbnails[1].url}
                      alt="Channel Photo"
                      srcset=""
                    />
                    <div class="block">
                      <h2 class="font-semibold">
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
                </div>
                <div class="w-1/4"></div>
              </div>
            </p>
          )
          : (
            <div>
              <h1 class="text-2xl p-10 font-bold text-center">
                Video not found
              </h1>
              <a href="../">
                <button class={ui.btnPrimary + " block m-auto"}>Go Home</button>
              </a>
            </div>
          )}
      </Body>
    </>
  );
}
