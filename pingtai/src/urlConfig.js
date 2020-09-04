
import React from 'react'

//配置实训基地【专家引领】轮播图的图片地址
React.SWEPER_URL=process.env.REACT_APP_NOT_SECRET_CODE?process.env.REACT_APP_NOT_SECRET_CODE.includes('dev')?"https://train.cvei.cn/public_resource/":" https://ts.zjyve.com/public_resource/":'https://train.cvei.cn/public_resource/'
//配置导航【登录按钮】
React.WINDOW_OPEN_URL=process.env.REACT_APP_NOT_SECRET_CODE?process.env.REACT_APP_NOT_SECRET_CODE.includes('dev')?"https://train.cvei.cn/#/login":" https://ts.zjyve.com/":"https://train.cvei.cn/#/login"
//配置导航【注册按钮】里面的【管理员登录】
React.WINDOW_OPEN_ADMIN_URL=process.env.REACT_APP_NOT_SECRET_CODE?process.env.REACT_APP_NOT_SECRET_CODE.includes('dev')?"https://train.cvei.cn/#/administrator/":" https://ts.zjyve.com/#/administrator":"https://train.cvei.cn/#/administrator/"