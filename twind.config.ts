import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
    colors: {
      // Build your palette here
      gray: colors.coolGray,
      blue: colors.violet,
      white: colors.white,
    },
  },
} as Options;
