<template>

    <!-- <div style="display: none;" @keydown="keyboardListener"></div> -->

    <el-upload class="uploader" 
        :auto-upload="false"
        :show-file-list="false" 
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
import { ElMessage, UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useSettingStore } from '../../store/setting';
import { useFrameVisibleStore } from '../../store/frameVisible'
import { storeToRefs } from 'pinia'
import { useSightBead, windowShow, windowCenter } from '../../demos/ipc'
import axios from 'axios'
import { uploadConfig, uploadResponse} from '../../config/upload.config'

const {
	USER_CHANGE_WINDOW_KEY,
	USER_RESTORE_WINDOW_KEY,
    USER_WINDOW_CENTER_KEY,
    USER_UPLOAD_TOKEN
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
const previewImg: UploadProps['onChange'] = (uploadFile) => {
    if (uploadFile.raw!.type !== 'image/jpg' &&
        uploadFile.raw!.type !== 'image/jpeg' &&
        uploadFile.raw!.type !== 'image/png'
    ) {
        ElMessage.error('必须是jpg或png格式的图片')
        return false
    }

    loading.value = true
    USER_IMG.value = URL.createObjectURL(uploadFile.raw!)

    // let fd = new FormData()
    // fd.append('file', uploadFile.raw!)
    // fd.append('permission', "1")

	// axios.post(uploadConfig.url, fd, {
    //     headers: {
    //         'Authorization': 'Bearer ' + USER_UPLOAD_TOKEN,
    //         'Accept': 'application/json',
	// 		'Content-Type': 'multipart/form-data'
	// 	}
	// }).then(res => {
	// 	if (res.status === 200) {
	// 		let resData: uploadResponse = res.data
	// 		USER_IMG.value = resData.data.links.url
	// 	}
	// })
	// .catch(err => {
	//     ElMessage.error(err)
    // })
    // .finally(() => {
    //     loading.value = false
    // })

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

    &:hover {
        background-color: var(--cl-black-10);
    }
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