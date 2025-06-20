import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [reactRouter(), tsconfigPaths(), tailwindcss()],
    envPrefix: ["VITE_", "PUBLIC_"],
    server: {
        port: 5000,
    },
});
