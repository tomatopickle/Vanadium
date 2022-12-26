import ui from "../ui/index.tsx";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/search.tsx";

interface Props {
  q: string;
}

export default function SearchBar(props: Props) {
  return (
    <form action="./search" type="multipart/form-data">
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
          name="q"
          type="search"
          id="video-search"
          class={ui.input.textInput}
          placeholder="Search Videos..."
          required
          value={props.q}
        />
        <button
          type="submit"
          class={ui.btnPrimary + " absolute right-2.5 bottom-2"}
        >
          Search
        </button>
      </div>
    </form>
  );
}
