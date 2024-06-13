"use strict";

const GALLERY_STORAGE_KEY = "gallery";

const DEFAULT_IMAGES = [
  { url: "./imgs/meme-imgs-square/2.jpg", tags: "politic,trump" },
  // { url: "./Images/Gallery/Fixed/2.jpg", tags: "animal,dog" },
  // { url: "./Images/Gallery/Fixed/3.jpg", tags: "animal,dog,baby" },
  // { url: "./Images/Gallery/Fixed/4.jpg", tags: "animal,cat" },
  // { url: "./Images/Gallery/Fixed/5.jpg", tags: "kid,baby,power" },
  // { url: "./Images/Gallery/Fixed/6.jpg", tags: "crazy" },
  // { url: "./Images/Gallery/Fixed/7.jpg", tags: "funny,baby" },
  // { url: "./Images/Gallery/Fixed/8.jpg", tags: "pensive,actor" },
  // { url: "./Images/Gallery/Fixed/10.jpg", tags: "politic,obama,barak" },
  // { url: "./Images/Gallery/Fixed/11.jpg", tags: "love" },
  // { url: "./Images/Gallery/Fixed/12.jpg", tags: "funny" },
  // { url: "./Images/Gallery/Fixed/13.jpg", tags: "actor,di,caprio" },
  // { url: "./Images/Gallery/Fixed/14.jpg", tags: "movie,matrix" },
  // { url: "./Images/Gallery/Fixed/15.jpg", tags: "movie,lord,ring" },
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
    throw new Error("Could not find image");
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
