import { BrowserWindow } from 'electron';
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib';

function CreateWin() {
    let Win: any = new BrowserWindow({
              width: 1400,
              height: 800,
              webPreferences: {
                nodeIntegration: true,
              },
              titleBarStyle: 'customButtonsOnHover',
              frame: false,
            });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      Win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
      if (!process.env.IS_TEST) {
        Win.webContents.openDevTools();
      }
    } else {
      createProtocol('app');
      // Load the index.html when not in development
      Win.loadURL('app://./index.html');
    }
    Win.on('closed', () => {
      Win = null;
    });
    return Win;
}
export {CreateWin};
