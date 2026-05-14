// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
//
// Vercel: use Nitro (official TanStack + Vercel path). Cloudflare worker output conflicts
// with static-only Vercel deploys and causes NOT_FOUND for the whole site.
const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  cloudflare: isVercel ? false : undefined,
  plugins: isVercel ? [nitro({ preset: "vercel" })] : [],
  tanstackStart: {
    server: { entry: "server" },
  },
});