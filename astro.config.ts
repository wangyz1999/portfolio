import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// Pages reachable from the nav. Everything else (posts, tags, hobbies, snowball)
// stays deployed but hidden: excluded from the sitemap and disallowed in robots.txt.
const HIDDEN_PATHS = ["/posts", "/tags", "/hobbies", "/snowball"];

// https://astro.build/config
export default defineConfig({
	site: "https://yunzhe.wang",
	markdown: {
		shikiConfig: {
			theme: "dracula",
			wrap: true,
		},
	},
	integrations: [
		mdx({}),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap({
			filter: (page) => !HIDDEN_PATHS.some((path) => new URL(page).pathname.startsWith(path)),
		}),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
	compressHTML: true,
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
	prefetch: {
		prefetchAll: true,
	},
});
