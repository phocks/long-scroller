// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import svelte from "@astrojs/svelte";
import relativeLinks from "astro-relative-links";
import tailwindcss from "@tailwindcss/vite";

// bejamas:astro-fonts:start
/** @type {NonNullable<import("astro").AstroUserConfig["fonts"]>} */
const BEJAMAS_ASTRO_FONTS = [
  {
    provider: fontProviders.fontsource(),
    name: "Geist Mono",
    cssVariable: "--font-mono",
    weights: ["100 900"],
    subsets: ["latin"],
  },
];
// bejamas:astro-fonts:end

// https://astro.build/config
export default defineConfig({
  fonts: BEJAMAS_ASTRO_FONTS,
  integrations: [svelte(), relativeLinks()],
  vite: {
    plugins: [tailwindcss()],
  },
});
