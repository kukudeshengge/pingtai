import {post} from '@/until/axios_instans';


//分页列表数据
export function getVrlist(data){
    return post('/api/pt/api/v1/resource/getVrResourcePage',data);
}

//获取资源分类标签
export function getTag(data){
    return post('/api/pt/api/v1/resourceClassify/getResourceClassifyAll',data);
}

//获取子类标签
export function getSonTag(data){
    return post('/api/pt/api/v1/resourceClassify/getChildResourceClassify',data);
}