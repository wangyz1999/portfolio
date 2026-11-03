import type { CollectionEntry } from "astro:content";

// Returns the projects whose slug is in `slugs`, in the order of `slugs`.
export function selectBySlug(data: CollectionEntry<"project">[] = [], slugs: string[] = []) {
	return data
		.filter((item) => slugs.includes(item.id))
		.sort((a, b) => slugs.indexOf(a.id) - slugs.indexOf(b.id));
}
