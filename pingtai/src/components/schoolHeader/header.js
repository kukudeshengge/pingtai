import React, { Component } from 'react';
import './global.scss';
import { getHeader } from '@/api/schoolSell/header.js';
import { Popover } from 'antd';
import { withRouter } from 'react-router-dom';
import { getQueryString } from '@/until/libs'
import {getInformationList} from '@/api/news'


class header extends Component {
    state = {
        list: [],
        schoolData: sessionStorage["homeData"] ? JSON.parse(sessionStorage["homeData"]) : {},
    }
    getHeader = () => {
        getHeader({ sysId: 'cs' }).then(list => {
            if (list) {
                let item = [list.pop()];
                let arr = [
                    {
                        typeName: "校本资源库",
                        path: '/resource-center/home'
                    },
                    {
                        typeName: "活动大赛",
                        path: '/academicspace/activitySeries'
                    },
                    {
                        typeName: "实训基地",
                        path: '/academicspace/trainingBase'
                    }
                ]
                list.unshift({
                    typeName: '首页',
                    path: '/academicspace/educnewslist-home'
                })
                this.setState({
                    list: list.concat(arr).concat(item)
                });
            }
        })
    }
    componentDidMount() {
        this.getHeader();
        console.log(" document.body", document.body.offsetHeight)
        // 导航跟随屏幕
        window.addEventListener('scroll',this.bindHandleScroll,true)
        // 导航跟随屏幕
    }
    // 导航跟随屏幕
    bindHandleScroll=(event)=>{
        console.log("eventevent")
        let scrollTop=event.target.scrollTop
        if(scrollTop>200){
            document.getElementById("left-top")&&document.getElementById("left-top").setAttribute("style","top:0;position:fixed;z-index:9999;background:rgba(164,179,184,0.9)");
        }else{
            document.getElementById("left-top")&&document.getElementById("left-top").setAttribute("style","");
        }


    }
    // 导航跟随屏幕
    //获取资讯列表
    async getInformationList(v,item) {
        console.log("item",item)
        const {firstClass,parentName,pageNum,pageSize, typeName}=this.state
        const newsList = await getInformationList({
            "infoType": v.parentName,
            "pageNum": 1,
            "pageSize": 1,
            "sysId": "CS",
            "typeDetail": item.typeName,
            "unitId": this.state.schoolData.schoolName
        })
        this.setState({
            newsList:newsList.data,
        },()=>{
            console.log("this.state.newsList",this.state.newsList)
            const id=this.state.newsList[0]?this.state.newsList[0].id:''
            this.props.history.push(`/academicspace/educnewspage?${encodeURI(JSON.stringify({firstId:item.parentId,parentName:v.typeName,typeName:item.typeName,id:id}))}`);

        })
    }
    jump = v => {
        if (v.path) {
            this.props.history.push(v.path);
        }
    }
    jumpChild = (item, v) => {
        if(item.parentId=="25"||item.parentId=="6"){
        this.getInformationList(v,item)}
        else{
            this.props.history.push(`/academicspace/educnewslist?${encodeURI(JSON.stringify({ typeName: item.typeName, id: item.parentId, parentName: v.typeName }))}`);
        }

    }
    render() {
        let path = this.props.location.pathname;
        let { list } = this.state;
        let { logo } = this.props;
        let parentName;
        const param = this.props.location.search.split("?")[1];
        if (param) {
            const codeParam = param.includes("%") ? decodeURI(param) : param;
            const jsonparam = JSON.parse(codeParam);
            if (jsonparam) {
                parentName = jsonparam.parentName;
            }
        }
        return (
            <div className="one_bottom_wai" id={sessionStorage.getItem('headerType') === '1'?"":"left-top"}>
                <div className="one_bottom">
                    {
                        logo ? <div className="left">
                            <h1 className='logo'>
                                <img src={sessionStorage.getItem('headerType') === '1' ? require("@/assets/img/acade/guangzhou.png") : require("@/assets/img/acade/changzhou.png")} alt="" />
                            </h1>
                        </div> : null
                    }
                    <div className="right">
                        <ul>
                            {
                                list && list.map((v, i) => {
                                    let flag = v.path && v.path === path;
                                    let pFlag = v.typeName === parentName;
                                    if (v.childrens) {
                                        let content = v.childrens && v.childrens.map(item => <li key={item.id} onClick={() => this.jumpChild(item, v)} >{item.typeName}</li>)
                                        return <Popover key={v.id} style={{ top: 0 }} overlayClassName='two_ji' placement="bottom" content={<ul>{content}</ul>}>
                                            <li className={pFlag ? 'active' : ''}>{v.typeName}</li>
                                        </Popover>
                                    } else {
                                        return <li className={flag ? 'active' : ''} onClick={() => this.jump(v)} key={i * 10}>{v.typeName}</li>
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(header);