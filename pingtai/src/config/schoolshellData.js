function getData(type) {   //type==='1'?是广州番禺
    if (type === '1') {
        return {
            college: [
                {
                    url: require("@/assets/img/acade/stMa_1.png"),
                    title: "财经学院",
                    eng: "Finance and economics",
                },
                {
                    url: require("@/assets/img/acade/stMa_2.png"),
                    title: "管理学院",
                    eng: "Management",
                },
                {
                    url: require("@/assets/img/acade/stMa_3.png"),
                    title: "建筑工程学院",
                    eng: "Construction engineering",
                },
                {
                    url: require("@/assets/img/acade/stMa_4.png"),
                    title: "旅游商务学院",
                    eng: "Tourism Business",
                },
                {
                    url: require("@/assets/img/acade/stMa_5.png"),
                    title: "信息工程学院",
                    eng: "Information Engineering",
                },
                {
                    url: require("@/assets/img/acade/stMa_6.png"),
                    title: "艺术设计学院",
                    eng: "Art and design",
                },
                {
                    url: require("@/assets/img/acade/stMa_7.png"),
                    title: "智能制造学院",
                    eng: "Intelligent manufacturing",
                },
                {
                    url: require("@/assets/img/acade/stMa_8.png"),
                    title: "创新就业学院",
                    eng: "Innovative employment",
                },
                {
                    url: require("@/assets/img/acade/stMa_9.png"),
                    title: "国际学院",
                    eng: "International College",
                },
                {
                    url: require("@/assets/img/acade/stMa_10.png"),
                    title: "公共课教育部",
                    eng: "Public Education",
                },
            ],
            blogroll: [
                {
                    name: '世界教育信息网',
                    href: 'http://www.wei.moe.edu.cn/'
                },
                {
                    name: '中国教育经济信息网',
                    href: 'https://www.cee.edu.cn/'
                },
                {
                    name: '中国高等职业教育网',
                    href: 'http://www.gzyjh.org/'
                },
                {
                    name: '中国职业技术教育网',
                    href: 'http://cvted.gzpyp.edu.cn/yjzyk/yqlj/list.shtml'
                },
                {
                    name: '中国职业教育与成人教育网',
                    href: 'http://www.cvae.com.cn/zgzcw/'
                },
                {
                    name: '职业教育教学资源库',
                    href: 'http://cved.cnki.net/'
                },
                {
                    name: '中国高职高专教育网',
                    href: 'https://www.tech.net.cn/'
                },
                {
                    name: '中国教育报',
                    href: 'http://www.jyb.cn/'
                },
            ]
        }
    } else if (type === '2') {
        return {
            college: [
                {
                    url: require("@/assets/img/acade/stMa_1.png"),
                    title: "电子商务",
                    eng: "Electronic Commerce",
                },
                {
                    url: require("@/assets/img/acade/stMa_2.png"),
                    title: "工商企业管理",
                    eng: "Business Administration",
                },
                {
                    url: require("@/assets/img/acade/stMa_3.png"),
                    title: "市场营销",
                    eng: "Marketing",
                },
                {
                    url: require("@/assets/img/acade/stMa_4.png"),
                    title: "互联网金融",
                    eng: "Online Finance",
                },
                {
                    url: require("@/assets/img/acade/stMa_5.png"),
                    title: "动漫制作技术",
                    eng: "Animation Manufacture",
                },
                {
                    url: require("@/assets/img/acade/stMa_6.png"),
                    title: "数控技术",
                    eng: "Numerical Control",
                },
                {
                    url: require("@/assets/img/acade/stMa_7.png"),
                    title: "应用英语",
                    eng: "Application of English",
                },
                {
                    url: require("@/assets/img/acade/stMa_8.png"),
                    title: "会计信息管理",
                    eng: "Accounting information",
                },
                {
                    url: require("@/assets/img/acade/stMa_9.png"),
                    title: "国际经济与贸易",
                    eng: "International Trade",
                },
                {
                    url: require("@/assets/img/acade/stMa_10.png"),
                    title: "电子工程",
                    eng: "Electronic engineering",
                },
            ],
            blogroll: [
                {
                    name: '中国人民共和国教育部',
                    href: 'http://www.moe.gov.cn/'
                },
                {
                    name: '中华人民共和国工业和信息化部',
                    href: 'http://www.miit.gov.cn/'
                },
                {
                    name: '常州市教育局',
                    href: 'http://jyj.changzhou.gov.cn/'
                },
                {
                    name: '江苏省高等教育网',
                    href: 'http://www.jsgjxh.cn/'
                },
                {
                    name: '江苏省教育厅',
                    href: 'http://jyt.jiangsu.gov.cn/'
                },
                {
                    name: '中外人文交流网',
                    href: 'https://www.ccipe.edu.cn/'
                },
                {
                    name: '中非（南）职业教育合作联盟',
                    href: 'http://csatveca.ccit.js.cn/'
                },
                {
                    name: '中国高职高专教育网',
                    href: 'https://www.tech.net.cn/'
                },
            ]
        }
    }
}


export default getData;








