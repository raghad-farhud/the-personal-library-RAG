import type { ProxyOptions } from "vite";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const askUrl = env.VITE_ASK_WEBHOOK_URL;
  const ingestUrl = env.VITE_INGEST_WEBHOOK_URL;

  const proxy: Record<string, ProxyOptions> = {};
  if (askUrl) {
    const ask = new URL(askUrl);
    proxy["/api/ask"] = {
      target: ask.origin,
      changeOrigin: true,
      rewrite: () => ask.pathname,
    };
  }
  if (ingestUrl) {
    const ingest = new URL(ingestUrl);
    proxy["/api/ingest"] = {
      target: ingest.origin,
      changeOrigin: true,
      rewrite: () => ingest.pathname,
    };
  }

  return {
    plugins: [react(), tailwindcss()],
    base: "/the-personal-library/",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy,
    },
  };
});
