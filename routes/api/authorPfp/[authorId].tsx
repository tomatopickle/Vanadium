// import { PageProps } from "$fresh/server.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

// export default async function Greet(props: PageProps) {
//   let res = await fetch(
//     `https://yt.funami.tech/api/v1/channels/${props.params.authorId}`,
//   );
//   const data = await res.json();

//   return data.authorThumnails;
// }
export const handler: Handlers = {
  async GET(_, ctx) {
    const authorId = ctx.params.authorId;
    const resp = await fetch(
      `https://yt.funami.tech/api/v1/channels/${authorId}`,
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const data = await resp.json();
    console.log(data);
    return ctx.render(data);
  },
};

export default function Page({ data }: PageProps) {
  if (!data) {
    return <h1>User not found</h1>;
  }

  return (
    data.authorThumbnails[1].url
  );
}
