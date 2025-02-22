export const uploadConfig = {
    url: 'https://picui.cn/api/v1/upload',
    // 如果未设置 Authorization 的情况下请求上传接口，将会被视为游客上传。游客上传的文件将会被限制在 1 小时内有效，并且无法删除。
    // 接口文档说明 https://picui.cn/page/api-docs.html
}

export interface uploadResponse {
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