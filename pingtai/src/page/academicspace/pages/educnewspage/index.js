
import React from 'react';
import '../announpage/index.scss';
import '@page/vocationalnews/pages/vcohome/index.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getInformationDetail, getInformationList, getSubInfoList } from '@/api/news'
import { Button, Col, Row } from 'antd';

export default class Educnewspage extends React.Component {
    state = {
        classify: [],//资讯一级分类
        firstClass: '',//一级分类
        secondClassify: [],//资讯二级分类
        detailsInfo: {},//详情内容
        typeDetail: '',
        typeName: '',
        schoolData: sessionStorage["homeData"] ? JSON.parse(sessionStorage["homeData"]) : {}

    }
    componentDidMount() {
        const data = this.props.location.search; //地址栏截取
        const param = data.split("?")[1];
        if (param) {
            const codeParam = param.includes("%") ? decodeURI(param) : param;
            const jsonparam = JSON.parse(codeParam);
            this.setState({
                typeName: jsonparam.typeName,
                typeId: jsonparam.firstId,
                parentName: jsonparam.parentName,
                id:jsonparam.id
            }, () => {
                this.getSubInfoList()
                console.log(jsonparam);
                // debugger
                this.getInformationDetail(jsonparam.id)
            })
        }
    }
    getParam=(data)=>{
        const param = data.split("?")[1];
        if (param) {
            const codeParam = param.includes("%") ? decodeURI(param) : param;
            const jsonparam = JSON.parse(codeParam);
            return jsonparam
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const data = nextProps.location.search; //地址栏截取
        let Param=this.getParam(data)

        if(this.state.typeDetail.id!=Param.id){
            this.getInformationDetail(Param.id?Param.id:'')
            this.setState({
                typeName:Param.typeName,
                typeId: Param.firstId,
                parentName: Param.parentName,
                id:Param.id
            })
        }
         if(this.typeId!=Param.firstId){
             this.setState({
                 typeId: Param.firstId,
             },()=>{
                 this.getSubInfoList()
             })
        }
    }

    //二级分类
    async getSubInfoList() {
        const { typeId } = this.state;
        if (typeId) {
            const secondClassify = await getSubInfoList(typeId)
            secondClassify && this.setState({
                secondClassify
            })
        }
    }
    //二级分类切换方法
    onChangeSelect = (val) => {
        const { typeName, typeId, parentName } = this.state
        this.setState({
            typeDetail: val,
            typeName:val.typeName
        }, () => {
            console.log("typeDetail", this.state.typeDetail)
            if(typeId=="25"||typeId=="6"){
                this.getInformationList()
            }else{
                this.props.history.push(`/academicspace/educnewslist?${encodeURI(JSON.stringify({ typeName: this.state.typeDetail.typeName, id: typeId, parentName: parentName }))}`);
            }

        })
    }
    //获取资讯列表
    async getInformationList() {
        console.log("typeDetail",this.state.typeDetail)
        const {firstClass,parentName,pageNum,typeId, typeDetail}=this.state
        const newsList = await getInformationList({
            "infoType": parentName,
            "pageNum": 1,
            "pageSize": 1,
            "sysId": "CS",
            "typeDetail": this.state.typeDetail.typeName,
            "unitId": this.state.schoolData.schoolName
        })
        this.setState({
            newsList:newsList.data,
        },()=>{
            console.log("this.state.newsList",this.state.newsList)
            const id=this.state.newsList[0]?this.state.newsList[0].id:''
            this.props.history.push(`/academicspace/educnewspage?${encodeURI(JSON.stringify({firstId:typeId,parentName:parentName,typeName:typeDetail.typeName,id:id}))}`);
        })
    }
    async getInformationDetail(id) {
        const detailsInfo = await getInformationDetail(id)
        detailsInfo && this.setState({
            detailsInfo
        })
    }
    render() {
        const { detailsInfo, typeDetail, secondClassify, parentName, typeName } = this.state
        return (
            <div className="vocational-wrap annoupage-wrap">
                <div className="detail-content Common-content">
                    <Row>
                        <Col span={3}>
                            <ul className="list-tab-ul" >
                                {
                                    secondClassify.map((item, index) => {
                                        return (
                                            <li className={typeName == item.typeName ? "liActive" : ''} onClick={() => { this.onChangeSelect(item) }}>
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
                                <div className="list-right-box"  style={{"margin-top":sessionStorage.getItem('headerType') === '1' ?"-60px":"40px"}}>
                                    <div className="detail-box">
                                        <div className='announpage-menu'>
                                            当前位置：首页> {parentName}> {detailsInfo.typeDetail}
                                            {/* <div className='menu-share'>分享到：
                                                <img src={require("@/assets/img/school-space/wb.png")}
                                                    className="announpage-icon" />
                                                <img src={require("@/assets/img/school-space/wx.png")}
                                                    className="announpage-icon" />
                                                <img src={require("@/assets/img/school-space/qq.png")}
                                                    className="announpage-icon" />
                                            </div> */}
                                        </div>
                                        <h3 className="detail-tit">{detailsInfo.infoTitle}</h3>
                                        <div className="detail-resource">
                                            <span>{detailsInfo.createDate}</span>{detailsInfo.infoOrigin?<span>来源：{detailsInfo.infoOrigin}</span>:""}
                                        </div>
                                        <div className="detail-container">
                                            <div className="w100">
                                                <div className="detail-desc" dangerouslySetInnerHTML={{ __html: detailsInfo.infoContent }} />
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
