import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)



const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)



app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
	.$nextTick(() => {
		postMessage({
			payload: 'removeLoading'
		}, '*')
	})
