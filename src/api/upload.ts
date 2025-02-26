import { useSettingStore } from "../store/setting";
import axios from "axios";
import { uploadConfig, PicuiUploadResponse } from "../config/upload.config";
import { MessagePlugin } from "tdesign-vue-next";

const {
    USER_UPLOAD_TOKEN
} = useSettingStore()


// picui 图床上传
export const uploadImageToPicui = async (file: File): Promise<PicuiUploadResponse> => {
    let fd = new FormData()
    fd.append('file', file)

    return new Promise((resolve)  => {
        axios.post(uploadConfig.picuiUrl, fd, {
            headers: {
                'Authorization': 'Bearer ' + USER_UPLOAD_TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.status === 200) {
                resolve(res.data)
                MessagePlugin.success('图片上传成功')
            } else {
                MessagePlugin.error(res.data.message)
            }
        }).catch(err => {
            MessagePlugin.error(err)
        })
    })
}

// imgbb 图床上传
export const uploadImageToImgbb = async (file: File) => {
    let fd = new FormData()
    fd.append('key', USER_UPLOAD_TOKEN)
    fd.append('image', file)

    return new Promise((resolve) => {
        axios.post(uploadConfig.imgbbUrl, fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                MessagePlugin.error(res.data.message)
            }
        }).catch(err => {
            MessagePlugin.error(err)
        })
    })
}

// sm 图床上传
export const uploadImageToSm = async (file: File) => {
    
}