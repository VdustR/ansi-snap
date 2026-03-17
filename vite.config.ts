import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: "/ansi-snap/",
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [vue()],
  test: {
    environment: "jsdom",
  },
});
