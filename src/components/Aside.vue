<template>
    <el-menu v-if="ASIDE_VISIBLE" 
        default-active="1" 
        class="aside-container">

        <el-menu-item index="1">
            <template #title>
                <i>&#xe6b8;</i>
                <router-link to="/index">准星设置</router-link>
            </template>
        </el-menu-item>

        <el-menu-item index="2">
            <template #title>
                <i>&#xe68a;</i>
                <router-link to="/setting">软件设置</router-link>
            </template>
        </el-menu-item>
        
    </el-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFrameVisibleStore } from '../store/frameVisible'

const {
    ASIDE_VISIBLE
} = storeToRefs(useFrameVisibleStore())
</script>

<style scoped>
.aside-container {
    position: relative;
    z-index: 9999;
    height: 100%;
}
</style>