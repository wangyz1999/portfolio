import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.string().transform((str) => new Date(str)),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		ogImage: z.string().optional(),
	}),
});

const research = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		publishDate: z.string().transform((str) => new Date(str)),
		feature: z.string().optional(),
		authors: z.array(z.string()).default([]).optional(),
		author_idx: z.number().optional(),
		links: z.record(z.string(), z.string()).default({}).optional(),
	}),
});

const project = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		description: z.string().optional(),
		feature: z.string().optional()
	}),
});

export const collections = { post, research, project };
