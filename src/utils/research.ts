import type { CollectionEntry } from "astro:content";

export function sortResearchByDate(posts: CollectionEntry<"research">[] = []) {
    return posts.sort(
        (a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
    );
}
