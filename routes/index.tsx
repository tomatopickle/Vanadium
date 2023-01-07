import { Head } from "$fresh/runtime.ts";
import Body from "../components/Body.tsx";
import Header from "../components/Header.tsx";
import Videos from "../islands/Videos.tsx";
import Api from "../lib/api.tsx";
import ui from "../ui/index.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { useState } from "preact/hooks";
import SearchBar from "../components/SearchBar.tsx";
import * as c from "https://deno.land/std@0.171.0/http/cookie.ts";

export const handler: Handlers<Array<Video>> = {
  async GET(_, ctx) {
    const h = new Headers(_.headers);
    const cookies = c.getCookies(h);
    const url = (cookies["settings_instance_url"] &&
      ("https://" + cookies["settings_instance_url"] + "/api/v1")) ||
      "https://invidious.baczek.me/api/v1";
    const api = new Api(
      url,
    );
    const data = await api.getPopular();
    return ctx.render(data);
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
          <SearchBar q="" />
          <br />
          <h1 class="text-2xl font-semibold">Trending</h1>
          <br />
          <Videos data={data == null ? [] : data} />
        </p>
      </Body>
    </>
  );
}
