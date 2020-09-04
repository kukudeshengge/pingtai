import LoadableComponent from "../until/LoadableComponent";
let moduleFile = require.context("../page", true, /\index.js$/);
let result = moduleFile.keys().reduce((prev, item) => {
    let str = item.split("/")[item.split("/").length - 2];
    let name = str[0].toLocaleUpperCase() + str.slice(1);
    prev = Object.assign({}, prev, {
        [name]: LoadableComponent(import("../page" + item.slice(1))),
    });
    return prev;
}, {});
console.log(result);


export default [
    {
        name: "首页",
        path: "/",
        redirect: "/main",
    },
    {
        name: "首页",
        path: "/main",
        component: result.Main,
    },
    {
        name: "新闻列表",
        path: "/newsadmin",
        component: result.Newsadmin,
        nameHide: true
    },
    {
        name: "新闻详情",
        path: "/addanews",
        component: result.Addanews,
        nameHide: true
    },
    {
        name: "院校中心",
        path: "/schoolspace",
        component: result.Schoolspace,
        children: [
            {
                name: "高职院校",
                path: "/schoolspace/vocational",
                component: result.Vocational,
            },
            {
                name: "全国高职院校分布图",
                path: "/schoolspace/distribution",
                component: result.Distribution,
                nameHide: true,
                parentPath:"/schoolspace/vocational",
            },
            {
                name: "中职院校",
                path: "/schoolspace/secondary",
                component: result.Secondary,
            },
            {
                name: "全国中职院校分布图",
                path: "/schoolspace/districenter",
                component: result.Districenter,
                nameHide: true
            },
            {
                name: "双高院校",
                path: "/schoolspace/academic",
                component: result.Academic,
            },
            {
                name: "全国双高院校分布图",
                path: "/schoolspace/districen",
                component: result.Districen,
                nameHide: true
            },
            {
                name: "教师发展计划",
                path: "/schoolspace/teacher",
                component: result.Teacher,
            },
            {
                name: "校本资源库",
                path: "/resource-center/home",
                component: result.ResourceHome,
            },
        ],
    },
    {
        name: "企业中心",
        path: "/enterprisecenter",
        component: result.Enterprisecenter,
    },
    {
        name: "404",
        path: "/404",
        component: result.Notfound,
        nameHide: true
    },
    {
        name: "资源中心",
        path: "/resource-center",
        component: result.Resource,
        children: [
            {
                name: "首页",
                path: "/resource-center/home",
                component: result.ResourceHome,
            },
            {
                name: "课程",
                path: "/resource-center/list",
                component: result.List
            },
            {
                name: "VR/AR实训",
                path: "/resource-center/vr",
                component: result.ResourceVr,
            },
            {
                name: "职教体系标准",
                path: "/resource-center/system-standard",
                component: result.SystemStandard,
            },
            {
                name: "企业资源",
                path: "/resource-center/enterpriseList",
                component: result.EnterpriseList,
            },
            {
                name:"课程浏览",
                path: "/resource-center/courseDetail",
                component: result.CourseDetail,
                nameHide:true
            },
            {
                name:'课程资源浏览',
                path:'/resource-center/course-resourceDetail',
                component:result.CourseResourceDetail,
                nameHide:true
            },
            {
                name:'资源浏览',
                path:'/resource-center/resourceDetail',
                component:result.ResourceDetail,
                nameHide:true
            }
        ],
    },
    {
        name: "实训中心",
        path: "/train-space",
        component: result.Trainspace,
        children: [
            {
                name: "智慧实训解决方案",
                path: "/train-space/smartTrain",
                component: result.SmartTrain,
            },
            {
                name: "VR/AR 国家实训基地",
                path: "/train-space/vrArTrain",
                component: result.VrArTrain
            },
            {
                name: "实训资源",
                path: "/train-space/trainResource",
                component: result.TrainResource
            },
            {
                name: "合作案例",
                path: "/train-space/joinCase",
                component: result.JoinCase
            }
        ],
    },
    {
        name: "证书中心",
        path: "/certificate",
        component: result.Certificate,
        children: [
            {
                name: "首页",
                path: "/certificate/certificatehome",
                component: result.Certificatehome,
            },
            {
                name: "证书中心",
                path: "/certificate/certificatecenter",
                component: result.Certificatecenter,
            },
            {
                name: "证书中心详情",
                path: "/certificate/certificatepage",
                component: result.Certificatepage,
                nameHide: true
            },
            {
                name: "试点院校",
                path: "/certificate/pilotpage",
                component: result.Pilotpage,
            },
            {
                name: "颁证机构",
                path: "/certificate/lssuingcenter",
                component: result.Lssuingcenter,
            },
        ],
    },
    {
        name: "招聘就业",
        path: "/recruitmentcenter",
        component: result.Recruitmentcenter,
    },
    {
        name: "职教资讯",
        path: "/vocationalnews",
        component: result.Vocationalnews,
        children: [
            {
                name: "首页",
                path: "/vocationalnews/vcohome",
                component: result.Vcohome,
            },
            {
                name: "行业观察",
                path: "/vocationalnews/vocationalwatch",
                component: result.Vocationalwatch,
            },
            {
                name: "地方职教",
                path: "/vocationalnews/locality",
                component: result.Locality,
            },
            {
                name: "资讯详情",
                path: "/vocationalnews/vocationalpage",
                component: result.Vocationalpage,
                nameHide: true
            },
        ],
        blank:true,
    },
    {
        name: "智慧教育解决方案",
        path: "/educationa",
        component: result.Educationa,
        ifShowTipImg:true
    },
    {
        name: "教育大数据解决方案",
        path: "/educationaldata",
        component: result.Educationaldata,
        ifShowTipImg:true
    },
    {
        name: "终身学习档案",
        path: "/lifelong",
        component: result.Lifelong,
        nameHide: true
    },
    {
        name: "终身发展档案",
        path: "/lifetime",
        component: result.Lifetime,
        nameHide: true
    },
    {
        name: "登录",
        path: "/login",
        component: result.Login,
        nameHide: true
    },
    {
        name: "注册",
        path: "/registered",
        component: result.Registered,
        nameHide: true
    },
    {
        name: "忘记密码",
        path: "/forget",
        component: result.Forget,
        nameHide: true
    },
    {
        name: "院校空间",
        path: "/academicspace",
        component: result.Academicspace,
        nameHide: true,
        children: [
            {
                path:'/academicspace',
                redirect:'/academicspace/educnewslist-home',
                exact:true
            },
            {
                name: "公告列表",
                path: "/academicspace/announlist",
                component: result.Announlist,
            },
            {
                name: "公告详情",
                path: "/academicspace/announpage",
                component: result.Announpage,
            },
            {
                name: "教育资讯",
                path: "/academicspace/educnewslist",
                component: result.Educnewslist,
            },
            {
                name: "教育资讯详情",
                path: "/academicspace/educnewspage",
                component: result.Educnewspage,
            },
            {
                name: "首页",
                path: "/academicspace/educnewslist-home",
                component: result.HomeOne,
            },
            {
                name:'实训基地',
                path:'/academicspace/trainingBase',
                component:result.TrainingBase
            },
            {
                name:'活动大赛',
                path:'/academicspace/activitySeries',
                component:result.ActivitySeries
            }
        ],
    },
];
