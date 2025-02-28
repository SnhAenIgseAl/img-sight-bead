export const uploadConfig = {
    picuiUrl: 'https://picui.cn/api/v1/upload',
    imgbbUrl: 'https://api.imgbb.com/1/upload'
}

export interface PicuiResponse {
    status: boolean,
    message: string,
    data: {
        key: string,
        name: string,
        pathname: string,
        origin_name: string,
        size: string,
        md5: string,
        sha1: string,
        links: {
            url: string,
            html: string,
            markdown: string,
            markdown_with_link: string,
            thumbnail_url: string,
            delete_url: string
        }
    }
}

export interface ImgbbResponse {
    data: {
        id: string,
        title: string,
        url: string,
        width: string,
        height: string,
        size: string,
        time: string,
    },
    success: boolean,
    status: number
}

export interface SmResponse {
    
}