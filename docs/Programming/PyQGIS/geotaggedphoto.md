import os
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

def get_exif_data(image):
    exif_data = {}
    try:
        info = image._getexif()
        if not info:
            return exif_data

        for tag, value in info.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == "GPSInfo":
                gps_data = {}
                for key in value:
                    gps_tag = GPSTAGS.get(key, key)
                    gps_data[gps_tag] = value[key]
                exif_data["GPSInfo"] = gps_data
            else:
                exif_data[tag_name] = value
    except Exception as e:
        print(f"Error reading EXIF data: {e}")
    return exif_data

def has_gps_info(exif_data):
    return "GPSInfo" in exif_data and exif_data["GPSInfo"]

def rename_with_gps_suffix(directory):
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)

        if not os.path.isfile(filepath):
            continue

        try:
            with Image.open(filepath) as img:
                exif_data = get_exif_data(img)
                if has_gps_info(exif_data):
                    name, ext = os.path.splitext(filename)
                    if not name.endswith("_GPS"):
                        new_name = f"{name}_GPS{ext}"
                        new_path = os.path.join(directory, new_name)
                        os.rename(filepath, new_path)
                        print(f"Renamed to: {new_name}")
        except Exception as e:
            print(f"Skipping {filename}: {e}")

# Example usage
folder_path = "path_to_your_folder"  # Replace with your actual folder path
rename_with_gps_suffix(folder_path)
