export const uploadConfig = {
    picuiUrl: 'https://picui.cn/api/v1/upload',
    imgbbUrl: 'https://api.imgbb.com/1/upload'
}

export interface PicuiUploadResponse {
    status: boolean,
    message: string,
    data: {
        key: string,
        name: string,
        pathname: string,
        origin_name: string,
        size: string,
        mimetype: string,
        extension: string,
        md5: string,
        sha1: string,
        links: {
            url: string,
            html: string,
            bbcode: string,
            markdown: string,
            markdown_with_link: string,
            thumbnail_url: string,
            delete_url: string
        }
    }
}