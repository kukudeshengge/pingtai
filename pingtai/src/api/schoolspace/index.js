import { post } from '../../until/axios_instans';
// 高职院校数据列表
export function getSchooList(data) {
    return post('/api/pt/v1/school/secondSelect', data);
}
// 高职、双高办学层次
export function getFirstSelect(data) {
    return post('/api/pt/v1/school/firstSelect', data);
}
// 高职、双高学校类型
export function secondSelect(data) {
    return post('/api/pt/v1/school/secondSelect', data);
}
// 高职、双高城市列表
export function citySelect(data) {
    return post('/api/pt/v1/school/citySelect', data);
}
// 分页获取高职院校列表
export function queryList(data) {
    return post('/api/pt/v1/school/queryList', data);
}
// 分页获取双高院校列表
export function sgQueryList(data) {
    return post('/api/pt/v1/dh/queryList', data);
}
// 中职学校分页查询
export function middleSchoolList(data) {
    return post('/api/pt/v1/school/middleSchoolList', data);
}
// 地图
// 所有城市列表
export function provinceList(data) {
    return post("/api/pt/v1/school/provinceList", data);
}
// 城市学校数量
export function cityCount(data) {
    return post("/api/pt/v1/school/cityCount", data);
}