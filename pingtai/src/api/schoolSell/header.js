import { get } from "@/until/axios_instans";

export function getHeader(data){
    return get('/api/zixun/api/v1/zixun/getInfoList',data)
}