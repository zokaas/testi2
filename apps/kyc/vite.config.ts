import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
    server: {
        port: 5000,
    },
    plugins: [remix(), tsconfigPaths(), tailwindcss()],
    envPrefix: ["VITE_", "PUBLIC_"],
    // define: {
    //   "import.meta.env.APP_ENV": JSON.stringify(process.env.APP_ENV),
    // },
});
