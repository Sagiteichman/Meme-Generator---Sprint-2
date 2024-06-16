"use strict";

let gCanvas = document.querySelector("#memeCanvas");
let gCtx = gCanvas.getContext("2d");

let gPos;

let isRendered;
let isSized;

let gIsMoving;
let gStartPos;

function onInitMeme() {
  onDisplayEditor();

  isRendered = false;
  isSized = false;

  addEventListeners();

  gPos = {
    x: gCanvas.width / 2,
    y: gCanvas.height / 2,
  };

  renderMeme();
  updateInputLine();
}

async function renderMeme(showSelection = true) {
  const meme = getMeme();
  const image = getImageById(meme.selectedImgId);
  if (!image) {
    console.error("Image not found!");
    return;
  }
  return await drawImageFromUrl(image.url, showSelection);
}

function drawSelectedLineRect() {
  const meme = getMeme();
  let lineIdx = meme.selectedLineIdx;
  let y = meme.lines[lineIdx].pos.y;
  let ySize = meme.lines[lineIdx].size;
  gCtx.strokeStyle = "black";
  gCtx.strokeRect(0, y - ySize / 2, gCanvas.width, ySize);
}

async function drawImageFromUrl(url, showSelection) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    const drawImage = () => {
      isRendered = true;
      gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
      drawTxt();
      if (showSelection) {
        drawSelectedLineRect();
      }
      resolve();
    };

    img.onload = drawImage;
  });
}

function drawTxt() {
  if (!isRendered) return;
  const meme = getMeme();

  let lines = meme.lines;
  lines.forEach((line) => {
    const { txt, size, color, strokeColor, align, pos } = line;
    const { x, y } = pos;

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = color;
    gCtx.font = size + "px impact";
    gCtx.textAlign = align;
    gCtx.textBaseline = "middle";
    gCtx.fillText(txt, x, y); // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y); // Draws (strokes) a given text at the given (x, y) position.
  });
}

function onClearCanvas() {
  if (!isRendered) return;

  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  console.log("Canvas is Cleared");
}

function addEventListeners() {
  addMouseListeners();
  addTouchListeners();
}

function addMouseListeners() {
  // if (!isRendered) return;
  gCanvas.addEventListener("mousedown", onDown);
  gCanvas.addEventListener("mousemove", onMove);
  gCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
  if (!isRendered) return;
  gCanvas.addEventListener("touchstart", onDown);
  gCanvas.addEventListener("touchmove", onMove);
  gCanvas.addEventListener("touchend", onUp);
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetHeight;
}

function setTextColor(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[meme.selectedLineIdx].color = value;
  renderMeme();
}

function setTextStrokeColor(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[meme.selectedLineIdx].strokeColor = value;
  renderMeme();
}

function changeSize(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[meme.selectedLineIdx].size += value;
  renderMeme();
}

function onAddLine() {
  if (!isRendered) return;
  createLine();
  renderMeme();
  updateInputLine();
}

function updateInputLine() {
  const elInput = document.getElementById("text-input-editor");
  const currentMeme = getMeme();

  let lineValue = currentMeme.lines[currentMeme.selectedLineIdx].txt;

  elInput.value = lineValue;
}

function onDeleteLine() {
  if (!isRendered) return;
  deleteLine();
  renderMeme();
  updateInputLine();
}

function moveVertical(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[meme.selectedLineIdx].pos.y += value;
  renderMeme();
}

function getCanvas() {
  return gCanvas;
}

function changeSize(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[meme.selectedLineIdx].size += value;
  renderMeme();
}

function setTextStrokeColor(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[meme.selectedLineIdx].strokeColor = value;
  renderMeme();
}

function shareMeme() {
  console.log("share it!");
}

async function downloadMeme() {
  await renderMeme(false);
  const data = gCanvas.toDataURL();

  let memes = localStorage.getItem("savedMemes");
  memes = memes ? JSON.parse(memes) : [];
  memes.push(data);
  localStorage.setItem("savedMemes", JSON.stringify(memes));

  const anchor = document.createElement("a");
  anchor.href = data;
  anchor.download = "my-meme.jpg";
  anchor.click();
  renderMeme();
}

async function showSavedMemes() {
  const gallery = document.getElementById("memes-section");
  gallery.innerHTML = "";
  const memes = JSON.parse(localStorage.getItem("savedMemes")) || [];
  memes.forEach((meme, index) => {
    const img = document.createElement("img");
    img.src = meme;
    img.alt = `saved meme ${index + 1}`;
    img.style.width = "100px";
    gallery.append(img);
  });
}
