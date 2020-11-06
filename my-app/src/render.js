const {BrowserWindow} = require('electron').remote
const newWindowBtn = document.getElementById('gesture-window')
const soundWinBtn = document.getElementById('sound-window')

const path = require('path')

newWindowBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../../my-app/src/gesture.html')
  let win = new BrowserWindow({ 
    width: 800,
    height: 600,
    frame: false })

  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})

soundWinBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../../my-app/src/gesture.html')
  let win = new BrowserWindow({ 
    idth: 800,
    height: 600,
    frame: false })

  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})