import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Response => {
  const url = new URL(_req.url);
  const source: string = url.searchParams.get("url") || "";
  console.log(source);
  let e = await fetch(source);
  let file = await e.blob();

  return new Response(file);
};
