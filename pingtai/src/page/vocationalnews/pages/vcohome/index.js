import React from 'react';
import './index.scss';
import {Col, Row, Card, Radio, Input, Button, Pagination,Empty} from 'antd';
import {getInfoList,getSubInfoList,getInformationList} from '@/api/news'
import { imgUrl } from '@/config/secret.js'
import MyEmpty from '@/components/listEmpty';
const {Search} = Input;

export default class Vcohome extends React.Component {
    state = {
        classify: [],//资讯一级分类
        secondClassify: [],//资讯二级分类
        firstClass:'',//一级分类值
        secongClass:'',
        pageNum:1,
        pageSize:12,
        newsList:[],
        total:0
    }
    componentDidMount() {
        const data = this.props.location.search; //地址栏截取
        const param = data.split("?")[1];
        if (param) {
            const codeParam = param.includes("%") ? decodeURI(param) : param;
            const jsonparam = JSON.parse(codeParam);
            this.getInfoList(jsonparam.firstClass)
        }else {
            this.getInfoList()
        }
    }
    //一级分类
    async getInfoList(param) {
        const classify = await getInfoList("PS")
        if(classify&&classify.length>0){
            this.setState({
                classify,
                firstClass:param?param:""
            },()=>{
                this.state.firstClass&& this.getSubInfoList()
                this.getInformationList()
            })
        }
    }
    //二级分类
    async getSubInfoList() {
        const {firstClass}=this.state
        const secondClassify = await getSubInfoList(firstClass.id)
        secondClassify&&this.setState({
            secondClassify
        })
    }
    //获取资讯列表
    async getInformationList() {
        const {firstClass,secongClass,pageNum,pageSize}=this.state
        const newsList = await getInformationList({
            "infoType": firstClass.typeName=="新闻中心"?"": firstClass.typeName,
            "pageNum": pageNum,
            "pageSize": pageSize,
            "sysId": "PS",
            "typeDetail": secongClass,
            "unitId": ""
        })
        console.log('typeName--->', firstClass)
        this.setState({
            newsList:newsList.data,
            total:newsList.total,
        })
    }
    //一级分类切换方法
    handleAClass=(item)=>{
        this.setState({
            firstClass:item,
            secongClass:'',
            pageNum: 1,
        },()=>{
            this.getSubInfoList()
            this.getInformationList()
        })

    }
    //二级分类切换方法
    onChangeSelect=(val)=>{
        this.setState({
            secongClass:val.target.value
        },()=>{
            this.getInformationList()
        })
    }
    changeNum=(page)=>{
        this.setState({
            pageNum: page
        },()=>{
            this.getInformationList()
        })
    }
    changePageSize = (pageNum, pageSize) => {
        this.setState({
                pageNum: pageNum,
                pageSize: pageSize,
            }, () => {
                this.getInformationList();
            }
        );
    };
    //跳转详情页
    linkToDetail = (id) => {
        const {firstClass}=this.state
        this.props.history.push(`/vocationalnews/vocationalpage?${encodeURI(JSON.stringify({firstId:firstClass,id:id}))}`);
    };
    reBytesStr=(str)=> {
        str=str.replace(/<\/?.+?>/g,"").replace(/ /g,"").replace(/&(\S*)?;/g,"")
        if((!str && typeof(str) != 'undefined')) {
            return '';
        }
        var num = 0;
        var str1 = str;
        var str = '';
        for(var i = 0, lens = str1.length; i < lens; i++) {
            num += ((str1.charCodeAt(i) > 255) ? 2 : 1);
            if(num > 360) {
                break;
            } else {
                str = str1.substring(0, i + 1);
            }
        }
        if(num>360){
            return str+"……";
        }else{
            return str
        }
    }
    render() {
        const {classify,firstClass,secondClassify,newsList,total,pageNum,pageSize} = this.state
        let titleName = []
        return (
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
                <div className="vocational-content Common-content">
                    <div className="vocational-item">
                        <Row>
                            <Col span={3}>
                                <ul className="list-tab-ul" id="list-tab">
                                    {
                                        classify.map((item,index)=>{
                                            if(item.typeName === "行业观察"|| item.typeName === "院校动态"){
                                                titleName = item.typeName
                                            }
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
                            <Col span={21}>
                                <div className="list-right-wrap">
                                    <div className="list-right-box">
                                    <div className="navigation-wrap">
                                        <div  className={` ${secondClassify.length>0 ? "classify-wrap" : "classify-mb"}`}>
                                            <div className="classify-content ">
                                                <dl className="resource_classify">
                                                    {secondClassify.length>0&&<dt>资源分类</dt>}
                                                    <dd>
                                                        <Radio.Group defaultValue={""} onChange={this.onChangeSelect}>
                                                            {secondClassify.length>0&&<Radio.Button value="">全部</Radio.Button>}
                                                            {
                                                                secondClassify.map((item,index)=>{
                                                                    return(
                                                                        <Radio.Button key={index} value={item.typeName}>
                                                                            {item.typeName}
                                                                        </Radio.Button>
                                                                    )
                                                                })
                                                            }
                                                        </Radio.Group>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        (newsList && newsList.length ) ? (
                                            newsList&&newsList.map((item,index)=>{
                                                return(
                                                    <Row className="right-item-br" onClick={()=>{this.linkToDetail(item.id)}}>
                                                        <Col span={4}>
                                                            <div className="list-img">
                                                                <img  src={`${imgUrl}/api/media/api/v1/media/showThumbnail/${item.imgId}`}  />
                                                            </div>

                                                        </Col>
                                                        <Col span={16}>
                                                            <div className="vocational-container-ml60">
                                                                <h3 className="vocational-tit">{item.infoTitle}</h3>
                                                                <div className="vocational-desc"> {this.reBytesStr(item.infoContent)}</div>
                                                               {/* <div className="vocational-desc" dangerouslySetInnerHTML={{__html: item.infoContent}}/>*/}
                                                                <p className="vocational-source">
                                                                    来源：{item.infoOrigin.replace("-",".")}
                                                                    {
                                                                        item.typeDetail==="AI"||item.typeDetail==="大数据"||item.typeDetail==="AR/VR"||item.typeDetail==="区块链"||item.typeDetail==="其他"? <span className="type-industry">分类：{item.typeDetail}</span>:""
                                                                    }
                                                                </p>
                                                            </div>
                                                        </Col>
                                                        <Col span={4}>
                                                            <div className="vocational-right">
                                                                <p className="vocational-year">{item.createTime.substring(0,4)}</p>
                                                                <p className="vocational-date">{item.createTime.substring(5,10).replace("-",".")}</p>
                                                                <p className="vocational-look-detail">查看详情</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                            })
                                            ):<MyEmpty content='暂无数据' />
                                    }
                                    <div className="page_box" style={{backGround:'#f6f7fb',width:'100%'}}>
                                        {total>0&& <Pagination
                                            showSizeChanger
                                            onShowSizeChange={this.changePageSize}
                                            onChange={this.changeNum}
                                            defaultCurrent={1}
                                            current={pageNum}
                                            pageSize={pageSize}
                                            total={total}
                                            pageSizeOptions={["12","24","36","48"]}
                                        />}
                                    </div>
                                </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )

    }
}
