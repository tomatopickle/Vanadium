import { useState } from "preact/hooks";
import ui from "../ui/index.tsx";
import { Component } from "preact";

export default function Counter(props) {
  const [index, setIndex] = useState(props.start);
  const tabs = props.tabs;
  return (
    <div class={ui.tab.border} id="dfg">
      <ul class="flex flex-wrap -mb-px">
        {tabs.map((tab, i) => {
          return (
            <li
              class="mr-2"
              onClick={() => {
                setIndex(i);
              }}
            >
              <button
                // href={`#${tab}`}
                onClick={function (e) {
                  e.preventDefault();
                  console.log("dfg");
                  document.getElementById(tab).scrollIntoView({
                    block: "start",
                    inline :"start"
                  });
                  window.scrollTo({ top: 0 });
                }}
                class={index == i ? ui.tab.selected : ui.tab.default}
                aria-current="page"
              >
                {tab}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
