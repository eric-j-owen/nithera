// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  experimental: {
    svg: true,
  },
  site: "https://neuroimpacttx.com",
  integrations: [sitemap()],
});
