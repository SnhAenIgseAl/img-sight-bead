import { ref } from 'vue'
import { defineStore } from 'pinia'



export const useSettingStore = defineStore('setting', () => {
    
    // 准星图片
    const USER_IMG = ref('')

    // 应用准星快捷键
    const USER_CHANGE_WINDOW_KEY = ref('Escape')

    // 恢复快捷键
    const USER_RESTORE_WINDOW_KEY = ref('F1')

    // 窗口居中快捷键
    const USER_WINDOW_CENTER_KEY = ref('Enter')

    // 图床上传 token
    const USER_UPLOAD_TOKEN = ref('')



    return {
        USER_IMG,
        USER_CHANGE_WINDOW_KEY,
        USER_RESTORE_WINDOW_KEY,
        USER_WINDOW_CENTER_KEY,
        USER_UPLOAD_TOKEN
    }
}, {
    persist: true
})