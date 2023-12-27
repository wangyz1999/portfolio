import { promises as fs } from "fs";
import { join } from "path";

export async function getImages(folder: string, prefix: string) {
    const directoryPath = join(process.cwd(), `public/imgs/${folder}`);

    const files = await fs.readdir(directoryPath);
    let images = [];
    for (let i = 0; i < files.length; i++) {
        images.push(`/imgs/${folder}/${prefix}${i}.jpeg`);
    }
    return images;
};
