import {CreateWin} from './background/browserWindow';
import active from './background/active';
// import {
//     installVueDevtools,
//   } from 'vue-cli-plugin-electron-builder/lib';
import { app, protocol } from 'electron';
let Win: any = null;
const isDevelopment = process.env.NODE_ENV !== 'production';
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }]);
app.on('activate', () => {
        if (!Win) {
            Win = CreateWin();
            active(Win); // 注册electron主线程与web交互
        }
});

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            // await installVueDevtools();
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    Win = CreateWin();
    active(Win); // 注册electron主线程与web交互
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
        if (data === 'graceful-exit') {
            app.quit();
        }
        });
    } else {
        process.on('SIGTERM', () => {
        app.quit();
        });
    }
}
