import Header from "../components/Header.tsx";
import Body from "../components/Body.tsx";
import { Head } from "$fresh/runtime.ts";
import * as c from "https://deno.land/std@0.171.0/http/cookie.ts";
import ui from "../ui/index.tsx";

const settings = { instance_url: "invidious.baczek.me" };

export const handler = {
  GET(_, ctx) {
    const s = settings;
    const e = new Headers(_.headers);
    const cookies = c.getCookies(e);
    for (const cookie in cookies) {
      if (cookie.includes("settings_")) {
        s[cookie.replace("settings_", "")] = cookies[cookie];
      }
    }
    return ctx.render(s);
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const s = settings;
    const resp = new Response("", {
      status: 303,
      headers: { Location: "/settings" },
    });
    form.forEach((e, i) => {
      s[i] = e;
      const cookie = { name: `settings_${i}`, value: s[i] };
      c.setCookie(resp.headers, cookie);
    });
    return resp;
  },
};

export default function Page({ data }) {
  return (
    <>
      <Head>
        <title>Settings | Vanadium</title>
      </Head>
      <Header></Header>
      <Body>
        <div class="px-5">
          <form action="/settings" method="POST">
            <h1 class="font-bold text-2xl py-3">Settings</h1>
            <br />
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="instance_url" class={ui.inputPlain.label}>
                  Instance
                </label>
                <input
                  name="instance_url"
                  id="instance_url"
                  class={ui.inputPlain.input}
                  value={data.instance_url}
                />
              </div>
              <div>
                <label
                  for="safe"
                  class={ui.select.label}
                >
                  Safe Search
                </label>
                <select
                  id="safe"
                  class={ui.select.input}
                  name="safe"
                >
                  <option value="false" selected={data.safe == "false"}>
                    False
                  </option>
                  <option value="true" selected={data.safe == "true"}>
                    True
                  </option>
                </select>
              </div>
            </div>
            <br />
            <div class="flex gap-2">
              <button type="submit" class={ui.btnPrimary}>Save</button>
              <button class={ui.btn}>Reset</button>
            </div>
          </form>
        </div>
      </Body>
    </>
  );
}
