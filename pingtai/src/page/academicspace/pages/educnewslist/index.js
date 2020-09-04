import React from 'react';
import './index.scss';
import {Col, Row, Card, Radio, Input, Button, Pagination,Empty} from 'antd';
import {getInfoList,getSubInfoList,getInformationList} from '@/api/news'
import { imgUrl } from '@/config/secret.js'
import MyEmpty from '@/components/listEmpty';

const {Search} = Input;

export default class Educnewslist extends React.Component {
    state = {
        classify: [],//资讯一级分类
        secondClassify: [],//资讯二级分类
        firstClass:'',//一级分类值
        secongClass:'',
        pageNum:1,
        pageSize:12,
        newsList:[],
        total:0,
        typeName: '',
        typeId: '',
        parentName: '',
        schoolData: sessionStorage["homeData"] ? JSON.parse(sessionStorage["homeData"]) : {}
    }
    componentDidMount() {
        const data = this.props.location.search; //地址栏截取
       let Param=this.getParam(data)
        Param&&this.setState({
                typeId:Param.id,
                parentName:Param.parentName,
            },()=>{
            this.getSubInfoList(Param)
        })
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
        console.log("Param.id",Param.id,this.state.typeDetail)
        if(this.state.typeDetail!=Param.id){
            Param&&this.setState({
                typeId:Param.id,
                typeName:Param.typeName,
                parentName:Param.parentName,
            },()=>{
                console.log("typeId",this.state.typeId)
                this.getSubInfoList(Param)

            })

        }
    }
    //二级分类
    async getSubInfoList(Param) {
        const {typeId}=this.state
        const secondClassify = await getSubInfoList(typeId)
        secondClassify&&this.setState({
            secondClassify,
            typeName:Param.typeName?Param.typeName:secondClassify?secondClassify[0].typeName:'',
            pageNum:1,
        },()=>{
            this.getInformationList()
        })
    }
    //获取资讯列表
    async getInformationList() {
        const {firstClass,parentName,pageNum,pageSize, typeName}=this.state
        const newsList = await getInformationList({
            "infoType": parentName,
            "pageNum": pageNum,
            "pageSize": pageSize,
            "sysId": "CS",
            "typeDetail": typeName,
            "unitId": this.state.schoolData.schoolName
        })
        this.setState({
            newsList:newsList.data,
            total:newsList.total,
        })
    }
    //一级分类切换方法
    handleAClass=(item)=>{
        this.setState({
            firstClass:item
        },()=>{
            this.getSubInfoList()
            this.getInformationList()
        })

    }
    //二级分类切换方法
    onChangeSelect=(val)=>{
        this.setState({
            typeName:val.typeName
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
        const {parentName,typeName,typeId}=this.state
        this.props.history.push(`/academicspace/educnewspage?${encodeURI(JSON.stringify({firstId:typeId,parentName:parentName,typeName:typeName,id:id}))}`);
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
        const {typeName,parentName,secongClass,secondClassify,newsList,total,pageNum,pageSize, typeDetail} = this.state
        return (

                <div className="school-new-wrap">
                    <div className="school-content Common-content">
                        <Row>
                            <Col span={3}>
                                <ul className="list-tab-ul" >
                                    {
                                        secondClassify.map((item,index)=>{
                                            return(
                                              <li className={typeName==item.typeName?"li-active":''} onClick={()=>{this.onChangeSelect(item)}}>
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
                                        <div className="location-box">
                                            <p className="location-tit">当前位置：首页> {parentName}> {typeName ? typeName: '全部'}</p>
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
                                                                <p className="vocational-source">来源：{item.infoOrigin.replace("-",".")}</p>
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
        )
    }
}
