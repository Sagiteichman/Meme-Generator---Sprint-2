"use strict";

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };

  if (TOUCH_EVS.includes(ev.type)) {
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

function onDown(ev) {
  gStartPos = getEvPos(ev);
  gMouseDown = true;
}

function onMove(ev) {
  if (!gMouseDown) return;

  const pos = getEvPos(ev);
  const m = getMovement(ev);
  draw(pos.x, pos.y, m);

  gStartPos = pos;
}

function onUp() {
  gMouseDown = false;
}

const getRandomId = () => Math.random().toString();
