import {defineConfig, type UserConfig} from "vite";
import {qwikVite} from "@builder.io/qwik/optimizer";
import {qwikCity} from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((): UserConfig => {
    return {
        resolve: {
            alias: {
                ".prisma/client/wasm": "./node_modules/.prisma/client/wasm.js",
                ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js",
                ".prisma/client/edge": "./node_modules/.prisma/client/edge.js",
            }
        },
        plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
        server: {
            headers: {
                "Cache-Control": "public, max-age=0",
            },
        },
        preview: {
            headers: {
                "Cache-Control": "public, max-age=600",
            },
        },
        optimizeDeps: {
            include: ['@auth/core']
        }
    };
});
