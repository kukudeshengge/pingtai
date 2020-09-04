
import React from 'react';
import '../vcohome/index.scss';
import { connect } from 'react-redux';
import {  Link } from 'react-router-dom'
import {getInformationDetail,getInfoList} from '@/api/news'
import {Button, Col, Row} from 'antd';

export default class Vocationalpage extends React.Component {
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
            console.log("jsonparam",jsonparam)
            this.getInformationDetail(jsonparam.id)
            this.getInfoList(jsonparam.firstId)
        }
    }
    //一级分类
    async getInfoList(id) {
        const classify = await getInfoList("PS")
        console.log("classify", classify)
        if(classify&&classify.length>0){
            this.setState({
                classify,
                firstClass:id
            })
        }
    }
    //一级分类切换方法
    handleAClass=(item)=>{
        this.setState({
            firstClass:item.id
        },()=>{
            this.props.history.push(`/vocationalnews/vcohome?${encodeURI(JSON.stringify({firstClass:item}))}`);
        })
    }
    async getInformationDetail(id) {
        const detailsInfo = await getInformationDetail(id)
        console.log("detailsInfo", detailsInfo)
        detailsInfo&&this.setState({
            detailsInfo
        })
    }
    render() {
                const {detailsInfo,classify,firstClass}=this.state
                return(
                    <div className="vocational-wrap">
                        <div className="banner-box">
                            <img src={require("../../../../assets/img/vocational_news/vocational_banner.png")}
                                 className="banner-img"/>
                            <div className="banner-position Common-content">
                                <p className="banner-desc">information</p>
                                <p className="banner-tit">职教资讯</p>
                                <p className="banner-english">聚焦职教热点，关注行业发展</p>
                            </div>
                        </div>
                        <div className="detail-content Common-content">
                            <Row>
                                <Col span={4}>
                                    <ul className="list-tab-ul" >
                                        {
                                            classify.map((item,index)=>{
                                                return(
                                                    <li className={(firstClass.id==item.id)?"li-active": firstClass.typeName == null? "li-on" : ""} onClick={()=>{this.handleAClass(item)}}>
                                                        <span>{item.typeName}</span>
                                                        <i></i>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </Col>
                                <Col span={20}>
                                    <div className="list-right-wrap">
                                        <div className="list-right-box">
                                    <div className="detail-box">
                                        <h3 className="detail-tit">{detailsInfo.infoTitle}</h3>
                                        <div className="detail-resource">
                                            <div>
                                                <span>{detailsInfo.createDate}</span>{detailsInfo.infoOrigin?<span>来源：{detailsInfo.infoOrigin}</span>:""}
                                            </div>
                                            {detailsInfo.author?<p className="author">作者：{detailsInfo.author}</p>:""}
                                        </div>
                                        <div className="detail-container">
                                            <div className="w100">
                                                <div className="detail-desc" dangerouslySetInnerHTML={{__html: detailsInfo.infoContent}}/>
                                            </div>
                                        </div>
                                    </div>
                                            <div className="detail-footer" style={{display:"none"}}>
                                                <Link className="detail-footer-common up">上一篇：这里是一个标题的新闻</Link>
                                                <Link  className="detail-footer-common down">下一篇：这里是一个标题的新闻</Link>
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
