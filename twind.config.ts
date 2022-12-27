import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";
import { apply } from 'twind'

export default {
  selfURL: import.meta.url,
  preflight: {
    a: apply`text-blue-500 text-no-underline active:(opacity-80)`,
  },
  theme: {
    colors: {
      // Build your palette here
      gray: colors.coolGray,
      blue: colors.purple,
      white: colors.white,
    },
  },
} as Options;
