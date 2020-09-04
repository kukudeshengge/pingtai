



const REACT_APP_BUILD_URL = process.env.REACT_APP_BUILD_URL;
const urlObj = {};
if (REACT_APP_BUILD_URL && REACT_APP_BUILD_URL.includes('pro')) {                //生产
    urlObj.previewUrl = 'https://ts.zjyve.com';
    urlObj.imgUrl = 'https://ts.zjyve.com';
    urlObj.resource_preview = 'https://ts.zjyve.com/public_resource';
} else {                                                                         //测试
    urlObj.previewUrl = 'https://ts.cvei.cn';
    urlObj.imgUrl = 'https://ts.cvei.cn';
    urlObj.resource_preview = 'https://train.cvei.cn/public_resource';
}
export const previewUrl = urlObj.previewUrl;
export const resource_preview = urlObj.resource_preview;
export const imgUrl = urlObj.imgUrl;

export const commonalityUrl = 'https://office.necibook.com:8885/?ssl=1&draw=1&';
export const turningSupportedArr = ['txt', 'doc', 'rtf', 'docx', 'xls', 'xlsx'];     //此文件类型用iframe加载需要更换白色背景
export const supportPaging = ['ppt', 'pdf', 'pptx', 'xls', 'xlsx'];                 //此文件类型支持分页切换

