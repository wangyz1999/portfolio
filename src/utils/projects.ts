import type { CollectionEntry } from "astro:content";


export function selectBySlug(data: CollectionEntry<"projects">[] = [], slugs: string[] = []) {
    return data.filter(item => slugs.includes(item.slug));
}