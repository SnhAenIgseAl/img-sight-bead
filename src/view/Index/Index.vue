<template>

    <el-upload class="uploader" 
        :show-file-list="false"
        :auto-upload="false"
        :on-change="previewImg"
        v-loading="loading">

        <img v-if="USER_IMG" :src="USER_IMG" class="avatar" />

        <el-icon v-else class="uploader-icon">
            <Plus />
        </el-icon>

    </el-upload>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted} from 'vue'
import { useSettingStore } from '../../store/setting';
import { useFrameVisibleStore } from '../../store/frameVisible'
import { storeToRefs } from 'pinia'
import { useSightBead, windowShow, windowCenter } from '../../demos/ipc'
import type { UploadProps } from 'element-plus'
import { ElMessage, ElUpload, ElIcon } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import { uploadImageToImgbb, uploadImageToPicui, uploadImageToSm } from '../../api/upload';

const {
	USER_CHANGE_WINDOW_KEY,
	USER_RESTORE_WINDOW_KEY,
    USER_WINDOW_CENTER_KEY,
    USER_UPLOAD_SITE
} = useSettingStore()

const {
	USER_IMG
} = storeToRefs(useSettingStore())

const {
    hideAsideAndMenu,
    showAsideAndMenu
} = useFrameVisibleStore()

const loading = ref(false)



const keyboardListener = (event: KeyboardEvent) => {

	// 应用准星
	if (event.key === USER_CHANGE_WINDOW_KEY) {
        hideAsideAndMenu()
		useSightBead()
	}

	// 显示窗口
	if (event.key === USER_RESTORE_WINDOW_KEY) {
        showAsideAndMenu()
		windowShow()
	}

	// 窗口居中
	if (event.key === USER_WINDOW_CENTER_KEY) {
		windowCenter()
	}
}

// 预览图片
const previewImg: UploadProps['onChange'] = async (uploadFile) => {
    
    if (uploadFile.raw!.type !== 'image/jpg' &&
        uploadFile.raw!.type !== 'image/jpeg' &&
        uploadFile.raw!.type !== 'image/png'
    ) {
        ElMessage.error('必须是jpg或png格式的图片')
        return false
    }

    loading.value = true

    if (USER_UPLOAD_SITE === 'none') {
        USER_IMG.value = URL.createObjectURL(uploadFile.raw!)
    }

    if (USER_UPLOAD_SITE === 'picui') {
        let res = await uploadImageToPicui(uploadFile.raw!)
        USER_IMG.value = res.data.links.url
    }

    if (USER_UPLOAD_SITE === 'imgbb') {
        let res = await uploadImageToImgbb(uploadFile.raw!)
        USER_IMG.value = res.data.url
    }

    if (USER_UPLOAD_SITE === 'sm') {
        let res = await uploadImageToSm(uploadFile.raw!)
    }

    loading.value = false
}

onMounted(() => {
	window.addEventListener('keydown', keyboardListener)
})

onUnmounted(() => {
	window.removeEventListener('keydown', keyboardListener)
})

</script>

<style scoped>
.uploader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    /* border: 1px dashed var(--el-border-color); */
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    /* &:hover {
        background-color: var(--cl-black-10);
    } */
}

.uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.setting {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
}
</style>