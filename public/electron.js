const path = require("path");
const fs = require("fs");
const url = require("url");
const { app, BrowserWindow } = require("electron");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");
const electron = require("electron");
const chokidar = require("chokidar");
const Store = require("electron-store");
// const axios = require('axios');
// const persianDate = require('persian-date');

const fsPromises = fs.promises;
ipc = electron.ipcMain;

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 600,
        height: 600,
        
        // titleBarStyle: 'hidden',
        // titleBarOverlay: {
        //     color: '#2f3241',
        //     symbolColor: '#74b1be'
        // },
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            webSecurity: false,
            backgroundThrottling: false,
        },
    });

    // and load the index.html of the app.
    if (process.env.APP_STAGE == "dev") {
        win.loadURL("http://localhost:3000");
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, "index.html"),
                protocol: "file:",
                slashes: true,
            })
        );
    }
    var store = new Store();

    const dir = path.join(app.getPath("userData"), "store", "");

    console.log("stage", process.env.APP_STAGE);
    // Open the DevTools.
    // if (isDev) {
    //     win.webContents.openDevTools({ mode: 'detach' });
    // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

async function runCommand(command) {
    const { stdout, stderr, error } = await exec(command);
    if (stderr) {
        console.error("stderr:", stderr);
    }
    if (error) {
        console.error("error:", error);
    }
    return stdout;
}

ipc.on("exit", async (event, payload) => { });

let stopFlag = false;
var inter;

// set config
electron.ipcMain.on("set:config", async (event, config) => {
    const store = new Store();
    console.log("set config updated", config);
    stopFlag = false;
    if (stopFlag == false) {
        inter = setInterval(async () => {
            console.log(
                "--------- stop ---------stopFlag",
                typeof stopFlag,
                stopFlag
            );
            if (stopFlag == false) {
                await upload(config.direction, config.url);
            } else {
                console.log("you stoped opration");
            }
        }, config.period * 1000);
    }
    store.set("config", config);
});

// set stop
electron.ipcMain.on("set:stop", async (event, config) => {
    const store = new Store();
    stopFlag = true;
    console.log("---------set stop updated---------", stopFlag);
    if (stopFlag == true) {
        console.log('run inside');
        clearInterval(inter);
    }
    store.set("config", config);
});

// get config
electron.ipcMain.on("get:config", async (event) => {
    const store = new Store();
    if (store.has("config")) {
        const config = store.get("config");
        console.log("we are in get config :", config);
        event.sender.send("get:config", config);
    }
});

electron.ipcMain.on("open:store", async (event) => {
    const _path = path.join(app.getPath("userData"), "store");
    electron.shell.openPath(_path);
});

process.on("uncaughtException", function (err) {
    console.log("Caught exception: " + err);
});
let watcher;

async function upload(folderPath, targetUrl) {
    console.log("folderPath", folderPath, "targetUrl:", targetUrl);

    if (!watcher) {
        watcher = chokidar.watch(folderPath, { persistent: true });

        watcher.on("add", async (filePath) => {
            const fileName = path.basename(filePath);
            console.log(`New file added: ${fileName}`);

            for (i = 0; i < 2; i++) {
                try {
                    const formData = new FormData();
                    formData.append("files", fs.createReadStream(filePath), fileName);

                    console.log("Sending file:", fileName);
                    const response = await axios.post(targetUrl, formData, {
                        headers: formData.getHeaders(),
                        maxBodyLength: Infinity,
                        maxContentLength: Infinity,
                    });

                    console.log(`File uploaded successfully: ${fileName}`);
                } catch (error) {
                    console.error("Error in sending file", error.message);
                }
            }
        });
    } else {
        console.log("Watcher is already set up, no need to add another one.");
    }
}
