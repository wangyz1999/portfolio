import type { CollectionEntry } from "astro:content";

export function sortResearchByDate(posts: CollectionEntry<"research">[] = []) {
	return posts
		.filter(post => !post.data.hidden)
		.sort(
			(a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
		);
}

export function selectedResearch(posts: CollectionEntry<"research">[] = []) {
	return sortResearchByDate(posts).filter(post => post.data.selected === true);
}
