import { Handlers, PageProps } from "$fresh/server.ts";
import Api from "../lib/api.tsx";
import VideosList from "../islands/VideosList.tsx";
import { Head } from "$fresh/runtime.ts";
import Body from "../components/Body.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Header from "../components/Header.tsx";

interface Data {
  results: string[];
  q: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const q: string = url.searchParams.get("q") || "";
    const api = new Api("https://invidious.baczek.me/api/v1");
    const results = await api.searchVideos(q);
    return ctx.render({ results, q });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, q } = data;
  return (
    <>
      <Header />

      <Body>
        <Head>
          <title>{q} | Vanadium</title>
        </Head>
        <SearchBar q={q} />
        <br />

        <VideosList data={results == null ? [] : results} />
      </Body>
    </>
  );
}
