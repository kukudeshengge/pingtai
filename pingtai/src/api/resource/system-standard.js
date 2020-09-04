import { post } from "@/until/axios_instans.js";
// 职教体系标签查询
export const vocationeduLabel = (data) => {
  return post("/api/pt/api/v1/vocationedu/label/labels", data);
};
// 职教体系查询列表
export const educationPage = (data) => {
  return post("/api/pt/api/v1/vocation/education/page", data);
};
//根据中高职查询专业信息
export const getMajors = (data) => {
  return post("/api/pt/api/v1/major/majors", data);
};
