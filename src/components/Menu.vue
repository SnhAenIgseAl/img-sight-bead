<template>
    <div v-if="MENU_VISIBLE" class="menu">

        <t-tooltip 
            v-for="(menuItem, menuIndex) in menuList"
            :key="menuIndex"
            :content="menuItem.text" 
            placement="bottom">

            <t-button 
                variant="text"
                class="menu-button"
                :theme="menuItem.theme"
                @click="menuItem.hadleClick">
                <i v-html="menuItem.icon"></i>
            </t-button>

        </t-tooltip>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { windowMinimize, windowMaximize, windowFullScreen, windowClose } from '../demos/ipc'
import { useFrameVisibleStore } from '../store/frameVisible'

const menuList = [
    {
        icon: '&#xe79f;',
        text: '最小化',
        hadleClick: windowMinimize,
        theme: ''
    },
    {
        icon: '&#xe6ee;',
        text: '最大化 / 窗口',
        hadleClick: windowMaximize,
        theme: ''
    },
    {
        icon: '&#xe7bc;',
        text: '全屏',
        hadleClick: windowFullScreen,
        theme: ''
    },
    {
        icon: '&#xe7cb;',
        text: '退出',
        hadleClick: windowClose,
        theme: 'danger'
    },
]

const {
    MENU_VISIBLE
} = storeToRefs(useFrameVisibleStore())
</script>

<style scoped>
.menu {
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    border: 1px solid var(--cl-black-10);
    border-radius: 8px;
    background-color: #fff;
}

.menu-button {
    position: relative;
    margin-left: 0;
    font-size: 16px;
    font-weight: bold;

    &::after {
        content: '';
        position: absolute;
        right: 0;
        width: 1px;
        height: 100%;
        background: var(--cl-black-10);
    }

    i {
        margin-right: 0;
    }
}
</style>