const { app, BrowserWindow } = require('electron');
const path = require('path');
const { stdout, stderr } = require('process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  let win = new BrowserWindow({ show: false })
  win.once('ready-to-show', () => {
  win.show()
})
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width:1300,
    height: 1200,
    //kiosk: true,
    // webSecurity: false,
    webPreferences: {
      // Allows us to call nodejs globals in the frontend code
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  /*let child = new BrowserWindow({ 
    width:800,
    height: 700,
    kiosk: true,
    webSecurity: false,
    transparent: true,
    frame: false,
    parent: mainWindow })
  child.loadFile(path.join(__dirname, 'login.html'));*/

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'home.html'));
  mainWindow.on('close', () => { win = null })
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow);
app.whenReady().then(() =>{
  createWindow();
  const capstone_path = "/home/felix/Capstone/";
  const exec_str =  '${capstone_path}py-audio/venv/bin/python3 ${capstone_path}py-audio/host.py';
  proc = exec(exec_str, (error,stdout, stderr) =>{
    if(error){
      console.log(error.stack);
      console.log('Error code:' + error.code);
      console.log('Signal recieved:' + error.signal);
    }
  })

})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


