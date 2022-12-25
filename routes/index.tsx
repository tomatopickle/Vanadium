import { Head } from "$fresh/runtime.ts";
import Body from "../components/Body.tsx";
import Header from "../components/Header.tsx";
import Videos from "../islands/Videos.tsx";
import Api from "../lib/api.tsx";
import ui from "../ui/index.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/search.tsx";
import { useState } from "preact/hooks";

export const handler: Handlers<Array<Video>> = {
  async GET(_, ctx) {
    // const api = new Api("https://yt.funami.tech/api/v1");
    // const data = await api.getPopular();
    return ctx.render(null);
  },
};

export default function Page({ data }: PageProps<Array<Video> | null>) {
  const [q, setQ] = useState("");
  return (
    <>
      <Header>
        <button class={ui.btnPrimary}>Log in</button>
      </Header>

      <Body>
        <Head>
          <title>Vanadium</title>
        </Head>

        <p class="my-6">
          <form action="./search">
            <label
              for="video-search"
              class={ui.input.leadingIcon}
            >
              Search
            </label>
            <div class="relative w-3/4 m-auto">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IconSearch class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="video-search"
                class={ui.input.textInput}
                placeholder="Search Videos..."
                required
                onInput={(e) => console.log(e)}
              />
              <button
                type="submit"
                class={ui.btnPrimary + " absolute right-2.5 bottom-2"}
              >
                Search
              </button>
            </div>
          </form>
          <br />
          <h1 class="text-2xl font-semibold">Trending</h1>
          <br />
          <Videos data={data == null ? [] : data} />
        </p>
      </Body>
    </>
  );
}
function printThis(e) {
  console.log(e);
}
