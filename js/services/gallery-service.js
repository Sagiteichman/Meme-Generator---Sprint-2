"use strict";

const GALLERY_STORAGE_KEY = "gallery";

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
    id: 1,
    url: "./imgs/meme-imgs-square/17.jpg",
    tags: "politic,vladimir,putin",
  },
  { id: 1, url: "./imgs/meme-imgs-square/18.jpg", tags: "movie,toys" },
];

let gImgs;

function getImages() {
  const images = [];
  for (const image of DEFAULT_IMAGES) {
    images.push(_createImage(image));
  }
  gImgs = images;
  return images;
}

function getImageById(imageId) {
  const image = gImgs.find((image) => image.id === imageId);
  if (!image) {
    console.log("Could not find image");
  }
  return image;
}

function imageClicked(imageId) {
  setMeme(imageId);
  openEditor();
}

function _createImage(image) {
  return { id: image.id, url: image.url, tags: image.tags };
}
