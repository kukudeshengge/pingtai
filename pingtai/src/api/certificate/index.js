import { post } from '../../until/axios_instans';

// 证书分类
export function catagorySelect(data) {
    return post('/api/pt/v1/cert/catagorySelect', data);
}
// 证书中心列表
export function querySelect(data) {
    return post('/api/pt/v1/cert/querySelect', data);
}

// 证书中心详情
export function queryDetail(data) {
    return post('/api/pt/v1/cert/queryDetail', data);
}

// 获取试点院校列表
export function queryList(data) {
    return post('/api/pt/v1/testUnit/queryList', data);
}

// 试点院校城市列表
export function citySelect(id) {
    return post('/api/pt/v1/testUnit/citySelect?firstName='+id);
}

// 试点院校学校类型
export function catagorySelectlist(data) {
    return post('/api/pt/v1/testUnit/catagorySelect', data);
}

// 颁证机构城市列表
export function certUnitCitySelect(data) {
    return post('/api/pt/v1/school/citySelect', data);
}

// 分页获取颁证机构列表查询
export function queryOrgList(data) {
    return post('/api/pt/v1/cert/queryOrgList', data);
}

// 颁证机构院校查询
export function queryOrgCollege(data) {
    return post('/api/pt/v1/cert/queryOrgCollege', data);
}
