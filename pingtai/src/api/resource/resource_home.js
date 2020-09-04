import { post } from "@/until/axios_instans";

//职教体系查询列表
export function indexVocationEducatiom(data) {
  return post("/api/pt/api/v1/vocation/education/indexVocationEducatiom", data);
}
//获取课程列表
export function getConfSubjectList(data) {
  return post("/api/pt/api/v1/course/getConfSubjectList", data);
}
