<template>

    <div class="aside-container">
        <t-menu v-if="ASIDE_VISIBLE" 
            theme="light" 
            default-value="1"
            expand-mutex
            :collapsed="collapsed">

            <t-menu-item value="1" 
                @click="$router.push('/index')">
                <template #icon>
                    <i>&#xe6b8;</i>
                </template>
                <span class="menu-title">准星设置</span>
            </t-menu-item>

            <t-menu-item value="2"
                @click="$router.push('/setting')">
                <template #icon>
                    <i>&#xe68a;</i>
                </template>
                <span class="menu-title">软件设置</span>
            </t-menu-item>

            <t-menu-item value="3"
                @click="openWebsite('https://crosshair.themeta.gg/')">
                <template #icon>
                    <i>&#xe809;</i>
                </template>
                <span class="menu-title">准星制作</span>
            </t-menu-item>

            <template #operations>
                <t-button variant="text" shape="square" @click="collapsed = !collapsed">
                    <template #icon>
                        <i>&#xe700;</i>
                    </template>
                </t-button>
            </template>
            
        </t-menu>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useFrameVisibleStore } from '../store/frameVisible'
import { openWebsite } from '../demos/ipc';

const {
    ASIDE_VISIBLE
} = storeToRefs(useFrameVisibleStore())

const collapsed = ref(false)
</script>

<style scoped>
.aside-container {
    position: relative;
    z-index: 9999;
    /* padding: 12px; */
    /* background-color: #eee; */
    border-radius: 8px;
    /* border-right: 1px solid var(--td-component-stroke);
    border-bottom: 1px solid var(--td-component-stroke); */
}

.menu-title {
    margin-left: 12px;
}

i {
    font-size: 18px;
    margin-right: 0;
}
</style>