import { post } from "@/until/axios_instans";

//中高职筛选
export function getMajors(data) {
  return post("/api/pt/api/v1/major/majors", data);
}
//课程的热门分类
export function getHotCategory(data) {
  return post("/api/pt/api/v1/course/hotCategory", data);
}

//获取课程列表
export function getConfSubjectList(data) {
  return post("/api/pt/api/v1/course/getConfSubjectPageList", data);
}
