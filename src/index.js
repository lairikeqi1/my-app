const { app, BrowserWindow, ipcMain, dialog, net } = require('electron')
const path = require('path')

// 监听渲染进程发送过来的my-message事件
// ipcMain.on('my-message', (event, arg) => {
//   event.reply('my-reply', '这是主进程的答复')
//   console.log(arg)
// })

// 监听渲染进程发送过来要求打开新窗口
// ipcMain.on('openNewWindow', (event, arg) => {
//   cWindow('https://www.taobao.com')
//   cWindow('https://www.baidu.com')
// })
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

const cWindow = (url) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 使浏览器的js可以支持node接口
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 使浏览器的js可以支持node接口
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  let request = net.request('https://taobao.com')
  request.on('response', (response) => {
    console.log(response.statusCode)
    console.log(JSON.stringify(response.headers))
    response.on('data', (chunk) => {
      console.log(chunk.toString())
    })
  })
  request.end()

  // setTimeout(() => {
  //   // 主动的发消息给渲染进程
  //   mainWindow.webContents.send(
  //     'my-active',
  //     '创建窗口之后，主进程主动发送数据给到渲染进程'
  //   )
  //   dialog
  //     .showOpenDialog({
  //       // openFile 允许选择文件
  //       // openDirection  允许选择文件夹
  //       // multiSelections 允许多选
  //       // showHiddenFile 显示隐藏文件
  //       // creatDirectory 允许创建文件夹
  //       properties: ['openFile', 'multiSelections'],
  //     })
  //     .then((res) => {
  //       console.log(res.filePaths) //文件路径
  //       console.log(res.canceled) //取消
  //     })
  // }, 2000)

  // mainWindow.on('close', (e) => {
  //   e.preventDefault()
  //   dialog
  //     .showMessageBox(mainWindow, {
  //       type: 'warning',
  //       title: '关闭',
  //       message: '是否要关闭？',
  //       buttons: ['取消', '残酷关闭'],
  //     })
  //     .then((index) => {
  //       console.log(index)
  //       if (index.response === 1) {
  //         app.exit()
  //       }
  //     })
  // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
