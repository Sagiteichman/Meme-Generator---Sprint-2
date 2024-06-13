"use strict";

let gCanvas;
let gCtx;

let gCurrectLine = 0;
let gPos;
let isRendered;
let imageUrl = "imgs/meme-imgs (square)/1.jpg";
let text = "Your Meme Text";

function onInitMeme() {
  gCanvas = document.querySelector("#memeCanvas");
  gCtx = gCanvas.getContext("2d");
  isRendered = false;
  addEventListeners();

  gPos = {
    x: gCanvas.width / 2,
    y: gCanvas.height / 2,
  };

  window.addEventListener("resize", resizeCanvas);

  renderMeme();
}

function renderMeme() {
  const meme = getMeme();
  const image = getImageById(meme.selectedImgId);
  onClearCanvas();
  drawImgFromRemote(image);
}

function drawImgFromRemote(image) {
  const img = new Image();
  img.src = image.url;
  img.onload = () => {
    isRendered = true;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawTxt();
  };
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
  if (!isRendered) return;
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
  meme.lines[gCurrentLine].color = value;
  renderMeme();
}

function setTextStrokeColor(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[gCurrentLine].strokeColor = value;
  renderMeme();
}

function changeSize(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[gCurrentLine].size += value;
  renderMeme();
}
