import { vercelEdgeAdapter } from "@builder.io/qwik-city/adapters/vercel-edge/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";
import {loadEnv} from "vite";

export default extendConfig(baseConfig, () => {
    const env = loadEnv("production", process.cwd(), '')
  return {

      // vite config
      define: {
        __APP_ENV__: JSON.stringify(env.APP_ENV),
      },

    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.vercel-edge.tsx", "@qwik-city-plan"],
      },
      outDir: ".vercel/output/functions/_qwik-city.func",
    },
    plugins: [vercelEdgeAdapter()],
  };
});
