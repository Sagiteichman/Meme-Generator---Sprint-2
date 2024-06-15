"use strict";

const elLogo = document.getElementById("logo");
const elAbout = document.getElementById("about");
const elMemes = document.getElementById("memes");
const elGallery = document.getElementById("gallery");

function init() {
  elGallery.onclick = renderGallery;
  elLogo.onclick = renderGallery;
  elAbout.onclick = renderAbout;
  elMemes.onclick = renderMemes;
}

init();
