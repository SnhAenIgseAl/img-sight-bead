window.ipcRenderer.on('main-process-message', (_event, ...args) => {
	console.log('[Receive Main-process message]:', ...args)
})

export function windowMinimize() {
	window.ipcRenderer.invoke('window-minimize')
}

export function windowMaximize() {
	window.ipcRenderer.invoke('window-maximize')
}

export function windowFullScreen() {
	window.ipcRenderer.invoke('window-full-screen')
}

export function windowClose() {
	window.ipcRenderer.invoke('window-close')
}

export function useSightBead() {
	window.ipcRenderer.invoke('use-sight-bead')
}

export function windowShow() {
	window.ipcRenderer.invoke('window-show')
}

export function windowCenter() {
	window.ipcRenderer.invoke('window-center')
}