import {defineConfig} from "vitest/config";
import {backend} from "vitest-config-silverwind";
import {yamlPlugin} from "./index.ts";

// @ts-expect-error: vite and vitest incompatible
export default defineConfig(backend({
  url: import.meta.url,
  plugins: [yamlPlugin()],
}));
