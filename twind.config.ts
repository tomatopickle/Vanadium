import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";
import { apply } from 'twind'

export default {
  selfURL: import.meta.url,
  preflight: {
    // 'p a': apply`text-blue-500 text-no-underline active:(opacity-80)`,
  },
  theme: {
    colors: {
      // Build your palette here
      gray: colors.coolGray,
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
    },
  },
} as Options;
