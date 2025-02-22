import { ref } from 'vue'
import { defineStore } from 'pinia'



export const useFrameVisibleStore = defineStore('frameVisible', () => {
    
    // 侧边栏可见性
    const ASIDE_VISIBLE = ref(true)

    // 菜单可见性
    const MENU_VISIBLE = ref(true)

    // 应用准星是，隐藏侧边栏及菜单
    const hideAsideAndMenu = () => {
        ASIDE_VISIBLE.value = false
        MENU_VISIBLE.value = false
        console.log(ASIDE_VISIBLE.value, MENU_VISIBLE.value)
    }

    // 显示侧边栏及菜单
    const showAsideAndMenu = () => {
        ASIDE_VISIBLE.value = true
        MENU_VISIBLE.value = true
        console.log(ASIDE_VISIBLE.value, MENU_VISIBLE.value)
    }
    
    

    return {
        ASIDE_VISIBLE,
        MENU_VISIBLE,
        hideAsideAndMenu,
        showAsideAndMenu
    }
}, {
    persist: true
})