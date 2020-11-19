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
//$('#fourteen option:contains(' + data.VOICE + ')').attr('selected', 'selected');
$('#first > option').each(function(){
  if($(this).val()== data.ONE) $(this).parent('select').val($(this).val())
});
$('#second > option').each(function(){
  if($(this).val()== data.TWO) $(this).parent('select').val($(this).val())
});
$('#third > option').each(function(){
  if($(this).val()== data.THREE) $(this).parent('select').val($(this).val())
});
$('#fourth > option').each(function(){
  if($(this).val()== data.FOUR) $(this).parent('select').val($(this).val())
});
$('#five > option').each(function(){
  if($(this).val()== data.FIST) $(this).parent('select').val($(this).val())
});
$('#six > option').each(function(){
  if($(this).val()== data.OK) $(this).parent('select').val($(this).val())
});
$('#seven > option').each(function(){
  if($(this).val()== data.YEAH) $(this).parent('select').val($(this).val())
});
$('#eight > option').each(function(){
  if($(this).val()== data.ROCK) $(this).parent('select').val($(this).val())
});
$('#nine > option').each(function(){
  if($(this).val()== data.SPIDERMAN) $(this).parent('select').val($(this).val())
})
$('#ten > option').each(function(){
  if($(this).val()== data.Slide_left) $(this).parent('select').val($(this).val())
})
$('#eleven > option').each(function(){
  if($(this).val()== data.Slide_right) $(this).parent('select').val($(this).val())
});
$('#twelve > option').each(function(){
  if($(this).val()== data.Scrolling_up) $(this).parent('select').val($(this).val())
})
$('#thirteen > option').each(function(){
    if($(this).val()== data.Scrolling_down) $(this).parent('select').val($(this).val())
});
$('#fourteen > option').each(function(){
  if($(this).val()== data.VOICE) $(this).parent('select').val($(this).val())
});
//document.querySelector('#fourteen').textContent;
//console.log(document.querySelector('#fourteen').value);
submitButton.addEventListener('click',(event)=>{
  data.ONE = document.querySelector('#first').value
  data.TWO = document.querySelector('#second').value
  data.THREE = document.querySelector('#third').value
  data.FOUR = document.querySelector('#fourth').value
  data.FIST = document.querySelector('#five').value
  data.OK = document.querySelector('#six').value
  data.YEAH = document.querySelector('#seven').value
  data.ROCK = document.querySelector('#eight').value
  data.SPIDERMAN = document.querySelector('#nine').value
  data.Slide_left = document.querySelector('#ten').value
  data.Slide_right = document.querySelector('#eleven').value
  data.Scrolling_up = document.querySelector('#twelve').value
  data.Scrolling_down = document.querySelector('#thirteen').value
  data.VOICE = document.querySelector('#fourteen').value
  let yamlStr = yaml.safeDump(data);
  fs.writeFileSync('configuration.yml', yamlStr);
});


exec('python hello.py', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
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

