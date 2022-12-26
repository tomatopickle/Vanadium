import { JSX } from "preact";

const css = `
    *:focus {
        outline:none;
    }
`;

export default function Body(
  props: JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <>
      <body class="dark:(bg-gray-800 text-white)">
        <div class="p-4 mx-auto max-w-screen-lg " {...props} />
      </body>
      <style>{css}</style>
    </>
  );
}
