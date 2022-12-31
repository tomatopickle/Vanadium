// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/api/authorPfp/[authorId].tsx";
import * as $2 from "./routes/api/cc.ts";
import * as $3 from "./routes/api/joke.ts";
import * as $4 from "./routes/channel/[id].jsx";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/search.tsx";
import * as $7 from "./routes/watch.tsx";
import * as $$0 from "./islands/ChannelVideos.jsx";
import * as $$1 from "./islands/Comments.tsx";
import * as $$2 from "./islands/Counter.tsx";
import * as $$3 from "./islands/Tabs.jsx";
import * as $$4 from "./islands/VideoUI.tsx";
import * as $$5 from "./islands/Videos.tsx";
import * as $$6 from "./islands/VideosList.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/api/authorPfp/[authorId].tsx": $1,
    "./routes/api/cc.ts": $2,
    "./routes/api/joke.ts": $3,
    "./routes/channel/[id].jsx": $4,
    "./routes/index.tsx": $5,
    "./routes/search.tsx": $6,
    "./routes/watch.tsx": $7,
  },
  islands: {
    "./islands/ChannelVideos.jsx": $$0,
    "./islands/Comments.tsx": $$1,
    "./islands/Counter.tsx": $$2,
    "./islands/Tabs.jsx": $$3,
    "./islands/VideoUI.tsx": $$4,
    "./islands/Videos.tsx": $$5,
    "./islands/VideosList.tsx": $$6,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
