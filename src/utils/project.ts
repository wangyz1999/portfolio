import type { CollectionEntry } from "astro:content";


export function selectBySlug(data: CollectionEntry<"project">[] = [], slugs: string[] = []) {
    return data.filter(item => slugs.includes(item.slug));
}