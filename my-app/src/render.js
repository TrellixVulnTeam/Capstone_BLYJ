const {BrowserWindow} = require('electron').remote
//const newWindowBtn = document.getElementById('gesture-window')
//const soundWinBtn = document.getElementById('sound-window')
const fs = require('fs');
const yaml = require('js-yaml');
//const pythoNFile = document.getElementById('script')
const { exec } = require('child_process');
const submitButton = document.getElementById("submitButton");

const path = require('path');
let fileContents = fs.readFileSync('configuration.yml');
let data = yaml.load(fileContents);
console.log(data.VOICE);
$('#fourteen option:contains(' + data.VOICE + ')').attr('selected', 'selected');
//document.querySelector('#fourteen').textContent;
//console.log(document.querySelector('#fourteen').value);
submitButton.addEventListener('click',(event)=>{

});
/*newWindowBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../../my-app/src/gesture.html')
  let win = new BrowserWindow({ 
    width: 1300, 
    height:1200,
    // kiosk: true,
    // webSecurity: false,
    // transparent: true,
    // frame: false,
    webPreferences: {
      // Allows us to call nodejs globals in the frontend code
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    
     })

  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()

  


  exec('python hello.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
  win.webContents.openDevTools();

})

soundWinBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../../my-app/src/sound.html')
  let win = new BrowserWindow({ 
    width: 1300,
    height: 1200,
    // kiosk: true,
    // webSecurity: false,
    // transparent: true,
    // frame: false 
    webPreferences: {
      // Allows us to call nodejs globals in the frontend code
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })

  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})



// function loadtext(){
//     let fileContents = fs.readFileSync("configuration.yml");
//     let data = yaml.load(fileContents);
//     document.getElementById('output').textContent="WOrk";//Object.values(data)[0]; 
//     console.log(data);
// }

*/

