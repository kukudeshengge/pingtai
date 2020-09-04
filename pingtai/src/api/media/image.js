/**
 * 媒体相关
 */
// 通过链接直接访问图片

import { get } from '../../until/axios_instans';

export function getShowImage(id) {
    return `/api/pt/api/v1/media/showThumbnail/${id}`
}
export function getSchoolShowImage(id) {
    return `https://ts.zjyve.com/public_resource/college/${id}`
}

export function requestImg(id) {
    return get(`/api/pt/api/v1/media/showThumbnail/${id}`);
}
