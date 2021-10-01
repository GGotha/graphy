const { app, BrowserWindow, Menu, screen } = require("electron");
const isDev = require("electron-is-dev");

try {
  require("electron-reloader")(module);
} catch (_) {}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(isDev ? "http://localhost:3000" : "http://localhost:3000");
}

app.on("ready", createWindow);

Menu
  .setApplicationMenu
  // Menu.buildFromTemplate([
  //   {
  //     label: "Helps",
  //     submenu: [
  //       {
  //         label: "About Node",
  //         click() {
  //           const window = BrowserWindow.getFocusedWindow();
  //           window.webContents.send("commands", "show-node-info");
  //         },
  //       },
  //     ],
  //   },
  // ])
  ();
