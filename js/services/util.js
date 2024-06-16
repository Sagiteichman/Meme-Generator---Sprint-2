"use strict";

const TOUCH_EVENTS = ["touchstart", "touchmove", "touchend"];

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };

  if (TOUCH_EVENTS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault();
    // Gets the first touch point
    ev = ev.changedTouches[0];
    // Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function onDown(event) {
  gStartPos = getEvPos(event);
  gMouseDown = true;
}

function onMove(event) {
  if (!gMouseDown) return;

  const meme = getMeme();
  const { offsetX, offsetY } = event;

  meme.lines[meme.selectedLineIdx].pos.x = offsetX;
  meme.lines[meme.selectedLineIdx].pos.y = offsetY;
  renderMeme();
}

function onUp() {
  gMouseDown = false;
}

const getRandomId = () => Math.random().toString();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
