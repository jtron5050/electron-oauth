const { app, BrowserWindow, shell } = require('electron');
const { parse } = require('ts-node');
const URL = require('url');

const singleInstance = app.requestSingleInstanceLock();

app.on('second-instance', (event, args) => {
    console.log('[SECOND-INSTANCE] got second instance');
    if (win) {
        if (win.isMinimized())
            win.restore();

        if (!win.isVisible())
            win.show();

        win.focus();
    }

    //TODO: Refactor
    if (args.length > 1) {
        console.log(args.toString());
        win.webContents.send('signin-oidc', args[2]);
    }
});

if (!singleInstance) {
    app.quit();
}

let win;

app.whenReady().then(() => {
    app.setAsDefaultProtocolClient('x-desktopapp-oauth');

    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.webContents.openDevTools();
    win.loadFile('dist/angular-desktopapp/index.html');
});

app.on('open-url', (event, url) => {
    //TODO: Refactor
    const parsedUrl = URL.parse(url);

    console.log('[OPEN-URL] ', parsedUrl.hostname);

    if (parsedUrl.hostname === 'signin-oidc') {
        win.webContents.send('signin-oidc', { url });
    }

    if (parsedUrl.hostname === 'signout-callback-oidc') {
        win.webContents.send('signout-callback-oidc', { url });
    }
});



// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});