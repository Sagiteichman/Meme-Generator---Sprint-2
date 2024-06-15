"use strict";

const GALLERY_STORAGE_KEY = "gallery";

const DEFAULT_IMAGES = [
  { url: "./imgs/meme-imgs-square/1.jpg", tags: "politic,trump" },
  { url: "./imgs/meme-imgs-square/2.jpg", tags: "animal,dog" },
  { url: "./imgs/meme-imgs-square/3.jpg", tags: "animal,dog,baby" },
  { url: "./imgs/meme-imgs-square/4.jpg", tags: "animal,cat" },
  { url: "./imgs/meme-imgs-square/5.jpg", tags: "kid,baby,power" },
  { url: "./imgs/meme-imgs-square/6.jpg", tags: "crazy" },
  { url: "./imgs/meme-imgs-square/7.jpg", tags: "funny,baby" },
  { url: "./imgs/meme-imgs-square/8.jpg", tags: "pensive,actor" },
  { url: "./imgs/meme-imgs-square/9.jpg", tags: "politic,obama,barak" },
  { url: "./imgs/meme-imgs-square/10.jpg", tags: "love" },
  { url: "./imgs/meme-imgs-square/11.jpg", tags: "funny" },
  { url: "./imgs/meme-imgs-square/12.jpg", tags: "actor,di,caprio" },
  { url: "./imgs/meme-imgs-square/13.jpg", tags: "movie,matrix" },
  { url: "./imgs/meme-imgs-square/14.jpg", tags: "movie,lord,ring" },
  { url: "./imgs/meme-imgs-square/15.jpg", tags: "movie,lord,ring" },
  { url: "./imgs/meme-imgs-square/16.jpg", tags: "movie,star,space" },
  { url: "./imgs/meme-imgs-square/17.jpg", tags: "politic,vladimir,putin" },
  { url: "./imgs/meme-imgs-square/18.jpg", tags: "movie,toys" },
];

let gImgs;

function onInitGallery() {
  _createImages();
}

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
  return { id: getRandomId(), url: image.url, tags: image.tags };
}
