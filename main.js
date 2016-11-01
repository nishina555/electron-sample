'use strict';

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu
const Tray = electron.Tray
let mainWindow;
var appIcon = null
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  appIcon = new Tray(__dirname + '/img/sample.png');
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', checked: true},
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio' },
    { label: 'Item4', type: 'radio' },
    {type: 'separator'},
    { label: 'Sub', submenu: [
      {label: 'Sub1'},
      {label: 'Sub2'}
    ]},
    {label: '終了', accelerator: 'Command+Q', click: function() { app.quit(); }}
  ]);
  var menu = Menu.buildFromTemplate([
    {
      label: 'Sample',
      submenu: [
        {label: 'About'},
        {label: 'Quit'}
      ]
    },
    {
      label: 'File',
      submenu: [
        {label: 'New File'},
        {label: 'Paste'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {label: 'Copy', accelerator: 'Command+C', selector: 'copy'},
        {label: 'Paste', accelerator: 'Command+V', selector: 'paster'}
      ]
    }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({
  'width': 500,
  'height': 600,
  // 'transparent': true,
  // 'frame': false
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
