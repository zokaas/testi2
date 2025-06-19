import type { Config } from "@react-router/dev/config";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default {
  appDirectory: "app",
  buildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
    envPrefix: ["VITE_", "PUBLIC_"],
    server: {
      port: 5000,
    },
  },
} satisfies Config;