
import os
import argparse
import random
from os import listdir
from os.path import isfile, join

parser = argparse.ArgumentParser(description='Generate block of html for a gallery from an image folder')
parser.add_argument('path', metavar='N', type=str,
                    help='path to image folder')

args = parser.parse_args()

path = args.path

if not os.path.isdir(path):
    print("Error, invalid folder path")
    raise ValueError

onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]

random.shuffle(onlyfiles)

with open("imageblock.txt", "r") as f:
    imageblock = f.read()

result = ""
for file in onlyfiles:
    filepath = join(path, file)
    result += "\n" + imageblock.replace("#filename", file).replace("#filepath", filepath)

print(result)
