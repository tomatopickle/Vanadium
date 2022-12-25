import { JSX } from "preact";

export default function Body(
  props: JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <>
      <body class="dark:(bg-gray-800 text-white)">
        <div class="p-4 mx-auto max-w-screen-lg " {...props} />
      </body>
    </>
  );
}
