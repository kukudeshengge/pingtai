
import React from 'react';
import './index.scss';
import '@page/vocationalnews/pages/vcohome/index.scss';
import { connect } from 'react-redux';
import {  Link } from 'react-router-dom'
import {getInformationDetail,getInfoList} from '@/api/news'
import {Button, Col, Row} from 'antd';

export default class Announpage extends React.Component {
    state={
        classify: [],//资讯一级分类
        firstClass:'',//一级分类
        detailsInfo:{},//详情内容
    }
    componentDidMount() {
        const data = this.props.location.search; //地址栏截取
        const param = data.split("?")[1];
        if (param) {
            const codeParam = param.includes("%") ? decodeURI(param) : param;
            const jsonparam = JSON.parse(codeParam);
            this.getInformationDetail(jsonparam.id)
            this.getInfoList(jsonparam.firstId)
        }
    }
    //一级分类
    async getInfoList(id) {
        const classify = await getInfoList("PS")
        if(classify&&classify.length>0){
            this.setState({
                classify,
                firstClass:id
            })
        }
    }
    //一级分类切换方法
    handleAClass=(id)=>{
        this.setState({
            firstClass:id
        },()=>{
            this.props.history.push(`/vocationalnews/vcohome?${encodeURI(JSON.stringify({firstClass:id}))}`);
        })
    }
    async getInformationDetail(id) {
        const detailsInfo = await getInformationDetail(id)
        detailsInfo&&this.setState({
            detailsInfo
        })
    }
    render() {
                const {detailsInfo,classify,firstClass}=this.state
                return(
                    <div className="vocational-wrap annoupage-wrap">
                        <div className="banner-box" style={{display:"none"}}>
                            <img src={require("@/assets/img/school-space/notice-banner.png")}
                                 className="banner-img"/>
                            <div className="banner-position Common-content">
                                <p className="banner-tit">建设专属院校空间</p>
                                <p className="banner-english">量身定制一体化职教解决方案</p>
                            </div>
                        </div>
                        <div className="detail-content Common-content">
                            <Row>
                                <Col span={24}>
                                    <div className="list-right-wrap">
                                        <div className="list-right-box" style={{"margin-top":sessionStorage.getItem('headerType') === '1' ?"-60px":"40px"}}>
                                    <div className="detail-box">
                                        <div className='announpage-menu'>
                                            当前位置：首页> 公告
                                            {/* <div className='menu-share'>分享到：
                                                <img src={require("@/assets/img/school-space/wb.png")}
                                                     className="announpage-icon"/>
                                                <img src={require("@/assets/img/school-space/wx.png")}
                                                     className="announpage-icon"/>
                                                <img src={require("@/assets/img/school-space/qq.png")}
                                                     className="announpage-icon"/>
                                            </div> */}
                                        </div>
                                        <h3 className="detail-tit">{detailsInfo.infoTitle}</h3>
                                        <div className="detail-resource">
                                                <span>  {detailsInfo.createDate}</span><span>来源：{detailsInfo.infoOrigin}</span>
                                        </div>
                                        <div className="detail-container">
                                            <div className="w100">
                                                <div className="detail-desc" dangerouslySetInnerHTML={{__html: detailsInfo.infoContent}}/>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                    </div>
                )

    }
}
