"use strict";

let gCanvas = document.querySelector("#memeCanvas");
let gCtx = gCanvas.getContext("2d");

let gPos;

let isRendered;
let isSized;

let gIsMoving;

function onInitMeme() {
  onDisplayEditor();

  isRendered = false;
  isSized = false;

  // gCanvas = document.querySelector("#memeCanvas");
  // gCtx = gCanvas.getContext("2d");

  addEventListeners();

  gPos = {
    x: gCanvas.width / 2,
    y: gCanvas.height / 2,
  };

  // window.addEventListener("resize", resizeCanvas)

  renderMeme();
}

function renderMeme() {
  const meme = getMeme();
  const image = getImageById(meme.selectedImgId);
  if (!image) {
    console.error("Image not found!");
    return;
  }
  drawImgFromRemote(image.url);
}

function drawImgFromRemote(url) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    isRendered = true;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawTxt();
  };
}

function drawRect() {
  const meme = getMeme();
  let lineIdx = meme.selectedLineIdx;
  let y = meme.lines[lineIdx].pos.y;
  let ySize = meme.lines[lineIdx].size;
  gCtx.strokeStyle = "black";
  gCtx.strokeRect(0, y - ySize / 2, gCanvas.width, ySize);
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

function onAddLine() {
  if (!isRendered) return;
  createLine();
  renderMeme();
  drawRectAfterSeconds(1);
  updateInputLine();
}

function drawRectAfterSeconds(sec) {
  setTimeout(() => {
    drawRect();
  }, sec);
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
  drawRectAfterSeconds(1);
  updateInputLine();
}

function moveVertical(value) {
  if (!isRendered) return;
  const meme = getMeme();
  meme.lines[meme.selectedLineIdx].pos.y += value;
  renderMeme();
  drawRectAfterSeconds(1);
}

function getCanvas() {
  return gCanvas;
}
