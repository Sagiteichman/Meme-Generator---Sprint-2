"use strict";

const GALLERY_STORAGE_KEY = "gallery";

let gImages;
let gFilterBy = { tag: "" };
let gTagClickCount = JSON.parse(localStorage.getItem("tagClickCount") ?? "{}");
let gAllTags = {};
let gIsTagsExpanded = false;

const DEFAULT_IMAGES = [
  { id: 1, url: "./imgs/meme-imgs-square/1.jpg", tags: "politic,trump" },
  { id: 2, url: "./imgs/meme-imgs-square/2.jpg", tags: "animal,dog" },
  { id: 3, url: "./imgs/meme-imgs-square/3.jpg", tags: "animal,dog,baby" },
  { id: 4, url: "./imgs/meme-imgs-square/4.jpg", tags: "animal,cat" },
  { id: 5, url: "./imgs/meme-imgs-square/5.jpg", tags: "kid,baby,power" },
  { id: 6, url: "./imgs/meme-imgs-square/6.jpg", tags: "crazy" },
  { id: 7, url: "./imgs/meme-imgs-square/7.jpg", tags: "funny,baby" },
  { id: 8, url: "./imgs/meme-imgs-square/8.jpg", tags: "pensive,actor" },
  { id: 9, url: "./imgs/meme-imgs-square/9.jpg", tags: "politic,obama,barak" },
  { id: 10, url: "./imgs/meme-imgs-square/10.jpg", tags: "love" },
  { id: 11, url: "./imgs/meme-imgs-square/11.jpg", tags: "funny" },
  { id: 12, url: "./imgs/meme-imgs-square/12.jpg", tags: "actor,di,caprio" },
  { id: 13, url: "./imgs/meme-imgs-square/13.jpg", tags: "movie,matrix" },
  { id: 14, url: "./imgs/meme-imgs-square/14.jpg", tags: "movie,lord,ring" },
  { id: 15, url: "./imgs/meme-imgs-square/15.jpg", tags: "movie,lord,ring" },
  { id: 16, url: "./imgs/meme-imgs-square/16.jpg", tags: "movie,star,space" },
  {
    id: 17,
    url: "./imgs/meme-imgs-square/17.jpg",
    tags: "politic,vladimir,putin",
  },
  { id: 18, url: "./imgs/meme-imgs-square/18.jpg", tags: "movie,toys" },
];

function getImages() {
  const images = [];
  for (const image of DEFAULT_IMAGES) {
    const parsedImage = _createImage(image);
    images.push(parsedImage);
    for (const tag of parsedImage.tags) {
      gAllTags[tag] = 0;
    }
  }
  for (const [tag, count] of Object.entries(gTagClickCount)) {
    gAllTags[tag] = count;
  }
  gImages = images;
  return images;
}

function getImageById(imageId) {
  const image = gImages.find((image) => image.id === parseInt(imageId));
  if (!image) {
    console.log("Could not find image");
  }
  return image;
}

function imageClicked(imageId) {
  console.log("entered image clicked");
  setMeme(imageId);
  onInitMeme();
}

function _createImage(image) {
  return { id: image.id, url: image.url, tags: image.tags.split(",") };
}

function getFilter() {
  return gFilterBy;
}

function saveTag(tag) {
  gFilterBy.tag = tag;
  gTagClickCount[tag] = gTagClickCount[tag] ? gTagClickCount[tag] + 1 : 1;
  localStorage.setItem("tagClickCount", JSON.stringify(gTagClickCount));

  saveToStorage(GALLERY_STORAGE_KEY, gFilterBy);
}
