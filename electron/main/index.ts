import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
	? path.join(process.env.APP_ROOT, 'public')
	: RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
	app.quit()
	process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
	win = new BrowserWindow({
		title: '准星',
		width: 960,
		height: 540,
		minWidth: 960,
		minHeight: 540,
		frame: false,
		backgroundColor: '#fff',
		transparent: true,
		resizable: true,
		hasShadow: true,
		movable: true,
		webPreferences: {
			// Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
			// contextIsolation: false,
      		nodeIntegration: true,
			preload,
			// Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
			// nodeIntegration: true,

			// Consider using contextBridge.exposeInMainWorld
			// Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
			// contextIsolation: false,
		},
	})

	if (VITE_DEV_SERVER_URL) { // #298
		win.loadURL(VITE_DEV_SERVER_URL)
		// Open devTool if the app is not packaged
		win.webContents.openDevTools()
	} else {
		win.loadFile(indexHtml)
	}

	// Test actively push message to the Electron-Renderer
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString())
	})

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('https:')) shell.openExternal(url)
		return { action: 'deny' }
	})
	// win.webContents.on('will-navigate', (event, url) => { }) #344

	
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	win = null
	if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore()
		win.focus()
	}
})

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows()
	if (allWindows.length) {
		allWindows[0].focus()
	} else {
		createWindow()
	}
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
	const childWindow = new BrowserWindow({
		webPreferences: {
			preload,
			nodeIntegration: true,
			contextIsolation: false,
		},
	})

	if (VITE_DEV_SERVER_URL) {
		childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
	} else {
		childWindow.loadFile(indexHtml, { hash: arg })
	}
})

// 最小化
ipcMain.handle('window-minimize', () => {
	win?.minimize()
})

// 最大化 | 窗口化
ipcMain.handle('window-maximize', () => {
	if (win?.isMaximized()) {
		win?.setSize(960, 540, true)
        win?.center()
	} else {
		win?.maximize()
	}
})

// 全屏
ipcMain.handle('window-full-screen', () => {
	if (win.isFullScreen()) {
		win?.setFullScreen(false)
		win?.setSize(960, 540, true)
        win?.center()
	} else {
		win?.setFullScreen(true)
	}
})

// 退出
ipcMain.handle('window-close', () => {
	win?.close()
})

// 应用准星
ipcMain.handle('use-sight-bead', () => {
	// win?.setFullScreen(true)
	win?.setAlwaysOnTop(true, 'screen-saver')
	win?.setBackgroundColor('rgba(0, 0, 0, 0)')
	win?.setIgnoreMouseEvents(true)
})

// 显示窗口
ipcMain.handle('window-show', () => {
	win?.setAlwaysOnTop(false)
	win?.setBackgroundColor('#ffffff')
	win?.setIgnoreMouseEvents(false)
})

// 窗口居中
ipcMain.handle('window-center', () => {
	win?.center()
})

// 默认浏览器打开网站
ipcMain.handle('open-website', (e, url: string) => {
    shell.openExternal(url)
})