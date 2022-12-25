// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/api/authorPfp/[authorId].tsx";
import * as $2 from "./routes/api/joke.ts";
import * as $3 from "./routes/index.tsx";
import * as $4 from "./routes/search/[query].tsx";
import * as $5 from "./routes/video/[id].tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/VideoUI.tsx";
import * as $$2 from "./islands/Videos.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/api/authorPfp/[authorId].tsx": $1,
    "./routes/api/joke.ts": $2,
    "./routes/index.tsx": $3,
    "./routes/search/[query].tsx": $4,
    "./routes/video/[id].tsx": $5,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/VideoUI.tsx": $$1,
    "./islands/Videos.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;