import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact";

export default function Header(
  actions: JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <>
      <nav class="sticky z-10 top-0 bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Vanadium Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Vanadium
            </span>
          </a>
          <div class="flex" {...actions}></div>
        </div>
      </nav>
    </>
  );
}
