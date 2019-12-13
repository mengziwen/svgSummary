import { ipcMain, app } from 'electron';
export default (win: any) => {
    //
    ipcMain.on('maximize', () => {
        // 窗口最大化
        if (win) {
            if (win.isMaximized()) {
                win.unmaximize();
            } else {
                win.maximize();
            }
        }
    });
    ipcMain.on('minimize', () => {
    // 窗口最小化
        if (win) {
            win.isMinimized() ? win.restore() : win.minimize();
        }
    });
    ipcMain.on('changeLoginSize', () => {
        if (win) {
            win.setContentSize(350, 433);
            win.center();
        }
    });
    ipcMain.on('changeBiger', () => {
        if (win) {
            win.setContentSize(940, 600);
            win.center();
        }
    });
    ipcMain.on('close', () => {
        app.quit();
    });

    // app active
    app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
};



