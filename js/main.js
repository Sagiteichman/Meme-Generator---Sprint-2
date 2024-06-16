"use strict";

const gBaseFontSize = 16;

const navLogo = document.getElementById("logo");
const elAbout = document.getElementById("about");
const elMemes = document.getElementById("memes");
const galleryNavItem = document.getElementById("gallery");

function init() {
  galleryNavItem.onclick = onInitGallery;
  navLogo.onclick = onInitGallery;
  // elAbout.onclick = renderAbout
  // elMemes.onclick = renderMemes
}

init();

function onDisplayEditor() {
  const elEditor = document.querySelector(".meme-section");
  const elGallery = document.querySelector(".gallery-section");
  const elAbout = document.querySelector(".about-section");

  elEditor.classList.remove("hide");
  elGallery.classList.add("hide");
  elAbout.classList.add("hide");
}

function onDisplayAbout() {
  const elAbout = document.querySelector(".about-section");
  const elEditor = document.querySelector(".meme-section");
  const elGallery = document.querySelector(".gallery-section");

  elAbout.classList.remove("hide");

  elGallery.classList.add("hide");
  elEditor.classList.add("hide");
}
