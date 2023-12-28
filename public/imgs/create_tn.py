import os
from PIL import Image

def create_thumbnails(folder_name):
    # Check if the folder exists
    if not os.path.exists(folder_name):
        print("Folder not found.")
        return

    # Process each file in the folder
    for filename in os.listdir(folder_name):
        if filename.lower().endswith(".jpg") or filename.lower().endswith(".jpeg"):
            image_path = os.path.join(folder_name, filename)
            with Image.open(image_path) as img:
                # Calculate the thumbnail size
                thumbnail_size = tuple([int(dim * 2 / 5) for dim in img.size])

                # Create and save the thumbnail
                img.thumbnail(thumbnail_size)
                thumbnail_path = image_path.split('.')[0] + '_tn.webp'
                img.save(thumbnail_path, 'WEBP')

if __name__ == '__main__':
    folders = ['snowball', 'photo', 'sketch', 'cook']
    for folder in folders:
        create_thumbnails(folder)
