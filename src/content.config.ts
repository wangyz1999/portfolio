import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.string().transform((str) => new Date(str)),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		ogImage: z.string().optional(),
	}),
});

const research = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		publishDate: z.string().transform((str) => new Date(str)),
		feature: z.string().optional(),
		authors: z.array(z.string()).default([]).optional(),
		author_idx: z.number().optional(),
		selected: z.boolean().optional(),
		hidden: z.boolean().optional(),
		category: z.enum(["preprint", "conference", "journal", "workshop"]).optional(),
		venue: z.string().optional(),
		tldr: z.string().optional(),
		tags: z.array(z.string()).default([]).optional(),
		links: z.record(z.string(), z.string()).default({}).optional(),
	}),
});

const project = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/project" }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		imglink: z.string().optional(),
		description: z.string().optional(),
		feature: z.string().optional(),
	}),
});

export const collections = { post, research, project };
