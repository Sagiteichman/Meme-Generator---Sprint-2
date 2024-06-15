"use strict";

const SEARCHED_KEYWORDS_STORAGE_KEY = "searchedKeyWords";
const MEME_STORAGE_KEY = "meme";

let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

let gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: 20,
      align: "left",
      size: 40,
      align: "center",
      color: "red",
      strokeColor: "black",
      pos: { x: 225, y: 150 },
    },
    {
      txt: "My cat is the best",
      size: 30,
      align: "center",
      color: "white",
      strokeColor: "black",
      pos: { x: 225, y: 50 },
    },
  ],
};

function initMeme() {}

function openEditor() {
  const gallery = document.getElementById("gallery-section");
  gallery.style.display = "none";
  const editor = document.getElementById("editor-section");
  editor.style.display = "grid";
}

function setMeme(imageId) {
  gMeme.selectedImgId = parseInt(imageId);
  renderMeme();
}

function setLineTxt(value) {
  let currentLine = 0;
  gMeme.lines[currentLine].txt = value;
  renderMeme();
}

function getMeme() {
  return gMeme;
}

function _saveKeyWordsToStorage() {
  saveToStorage(SEARCHED_KEYWORDS_STORAGE_KEY, gKeywordSearchCountMap);
}
function _saveMemeToStorage() {
  saveToStorage(MEME_STORAGE_KEY, gMeme);
}
