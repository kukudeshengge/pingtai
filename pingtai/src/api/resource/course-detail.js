
import { post } from '@/until/axios_instans';


//获取课程详情
export function getCourseDetail(data) {
    return post('/api/pt/api/v1/course/getConfSubjectOne', data);
}

//获取章节目录
export function getCaltalog(data){
    return post('/api/pt/api/v1/course/getCourseCenterCatalog',data);
}