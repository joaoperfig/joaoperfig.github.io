
import os
import argparse
import random
from os import listdir
from os.path import isfile, join
from PIL import Image

parser = argparse.ArgumentParser(description='Generate block of html for a gallery from an image folder')
parser.add_argument('path', metavar='N', type=str,
                    help='path to image folder')

args = parser.parse_args()

path = args.path

if not os.path.isdir(path):
    print("Error, invalid folder path")
    raise ValueError

onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]

# make compressed folder
compresspath = join(path,"compressed")

if not os.path.exists(compresspath):
    os.makedirs(compresspath)

random.shuffle(onlyfiles)

with open("imageblock.txt", "r") as f:
    imageblock = f.read()

result = ""
for i, file in enumerate(onlyfiles):
    filepath = join(path, file)

    #compress
    compfilepath = join(compresspath, str(i)+".jpg")
    im = Image.open(filepath)
    width, height = im.size
    if width > 1000:
        newh = int((1000 * height)/width)
        im = im.resize((1000, newh))

    try:
        exif = im.info['exif']
        im.save(compfilepath, exif=exif)
    except:
        print("No exif")
        im.save(compfilepath)

    result += "\n" + imageblock.replace("#filename", file).replace("#filepath", filepath).replace("#compresspath", compfilepath)

print(result)
