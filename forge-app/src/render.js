const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const minBtn = document.getElementById('minBtn');

const remote = require('electron');
const ffi = require('ffi-napi');
const ref = require('ref-napi');
const StructType = require('ref-struct-di');
const ks = require('node-key-sender');

// This uses ref-struct-di
// const PointStruct = StructType({
//   x: ffi.types.long,
//   y: ffi.types.long,
// })

// const user32 = ffi.Library('user32.dll', {
//   'GetCursorPos': ['bool', [ref.refType(PointStruct)]]
// });

leftBtn.onclick = moveDesktopLeft;
rightBtn.onclick = moveDesktopRight;
minBtn.onclick = minimizeAll;

function moveDesktopLeft() {
  console.log('Left button clicked');
  // let mousePosBuffer = ref.alloc(PointStruct);
  // let success = user32.GetCursorPos(mousePosBuffer);
  // let mousePos = mousePosBuffer.deref();
  // console.log(mousePos.x, mousePos.y);
  ks.sendCombination(['control', 'windows', 'left']);
}

function moveDesktopRight() {
  console.log('Right button clicked');
  ks.sendCombination(['control', 'windows', 'right']);
}

function minimizeAll() {
  console.log('Minimizing all windows');
  ks.sendCombination(['windows', 'd']);
}