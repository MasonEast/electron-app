const {app, BrowserWindow} = require('electron')

const path= require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    // 如果没有打开窗口，监听activate打开窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
})

// 兼容mac系统，调用quit方法关闭
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})