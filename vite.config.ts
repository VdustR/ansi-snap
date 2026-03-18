import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/ansi-snap/",
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "ansi-snap — Terminal Text to Image",
        short_name: "ansi-snap",
        description:
          "Paste rich terminal text with ANSI colors preserved, customize the frame and appearance, and export as PNG/SVG. 485+ themes, window chrome styles, and transparent background support.",
        display: "standalone",
        background_color: "#1a1a2e",
        theme_color: "#1a1a2e",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "favicon.svg", sizes: "any", type: "image/svg+xml" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        globIgnores: ["**/og-image.png"],
      },
    }),
  ],
  test: {
    environment: "jsdom",
  },
});
