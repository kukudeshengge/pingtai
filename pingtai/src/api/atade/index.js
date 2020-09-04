import { post } from "../../until/axios_instans";

// 教育资讯展示
export function getEducationInformationList(data) {
  return post("/api/zixun/api/v1/zixun/getEducationInformationList", data);
}

//专题＆要闻
export function getSpecial(data){
  return post('/api/zixun/api/v1/zixun/getRecommendInformationList',data);
}

//判断学校是否关注
export function isAttention(data) {
  return post("/api/pt/api/v1/attention/existSchoolAttention", data);
}

//关注取消关注
export function changeAttention(data) {
  return post('/api/pt/api/v1/attention/attentionSchool', data);
}