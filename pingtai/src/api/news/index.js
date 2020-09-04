import { get,post } from '../../until/axios_instans';
// 获取资讯类型列表
export function getInfoList(sysId) {
    return get(`/api/zixun/api/v1/zixun/getInfoList?sysId=${sysId}`);
}
// 获取资讯类型列表子
export function getSubInfoList(id) {
    return get(`/api/zixun/api/v1/zixun/getSubInfoList?id=${id}`);
}// 资讯详情
export function getInformationDetail(id) {
    return get(`/api/zixun/api/v1/zixun/getInformationDetail?id=${id}`);
}
// 获取资讯类型列表
export function getInformationList(date) {
    return post(`/api/zixun/api/v1/zixun/getInformationList`,date);
}
// 获取教育资讯、公告列表
export function getEducationInformationList(data) {
    return post(`/api/zixun/api/v1/zixun/getEducationInformationList`, data);
}
// 新增资讯
export function addInformation(date) {
    return post(`/api/zixun/api/v1/zixun/addInformation`,date);
}
// 获取资讯类型列表
export function getInfoLabelList(sysId) {
    return get(`/api/zixun/api/v1/zixun/getInfoLabelList?sysId=${sysId}`);
}
