
import React from 'react';
import './index.scss';
import {Col, Row, Card, Radio, Input, Button, Pagination, Empty, Modal} from 'antd';
import {  Link } from 'react-router-dom'
import SearchResource from "../cardtype";
import {sgQueryList} from '@/api/schoolspace'
import {getSchoolShowImage} from '@/api/media/image'
import MyEmpty from '@/components/listEmpty';
import Emptyschool from "../../../../components/emptyschool";
const { Search } = Input;
export default class Academic extends React.Component {
    state={
        pageNum:1,
        pageSize:12,
        schoolList:[],
        total:0,
        schoolName:'',
        cityCode:'',
        stageCode:'',
        typeCode:'',
        typeA:"A档",
        typeB:"B档",
        typeC:"C档",
        coverFlag:false,
    }
    //翻页
    changeNum=(page)=>{
        this.setState({
            pageNum: page
        },()=>{
            this.queryList()
        })
    }
    changePageSize = (pageNum, pageSize) => {
        console.log("pageNum",pageNum,pageSize)
        this.setState({
                pageNum: pageNum,
                pageSize: pageSize,
            }, () => {
                this.queryList();
            }
        );
    };
    //给子组件方法
    getClassify=(cityListVal,educationLevelVal,schoolType)=>{
        this.setState({
            cityCode:cityListVal,
            stageCode:educationLevelVal,
            typeCode:schoolType,
            pageNum: 1,
        },()=>{
            this.queryList()
        })
    }

    //根据学校名称搜索
    searchChangeSchool=(val)=>{
        this.setState({
            schoolName:val
        },()=>{
            this.queryList()
        })
    }
    seachHandleVla=(val)=>{
        this.setState({
            schoolName:val.target.value
        })
    }
    //获取数据
    queryList = async () => {
        const {pageNum,pageSize,cityCode,stageCode,typeCode,schoolName,total}=this.state
        let schoolList = await sgQueryList({
            "cityCode": cityCode,
            "pageNum": pageNum,
            "pageSize": pageSize,
            "schoolName": schoolName,
            "stageCode": stageCode,
            "typeCode": typeCode
        });
        schoolList&&this.setState({
            schoolList:schoolList.data,
            total:schoolList.total
        })
    }
    Consultation = (e) => {
        this.setState({
            coverFlag: true,
        })
    }
    cancel = e => {
        this.setState({ coverFlag: false});
    }
    closeModal = () => {
        this.setState({ coverFlag: false });
    }
    render() {
        const {schoolList,total,pageNum,pageSize,stageCode,typeA,typeB,typeC,coverFlag}=this.state
        return (
            <div className="Common-academic">
                <div className='Collegescenter-banner'>
                    <div className='Common-content'>
                        <h2 className='detail-banner-name'>双高院校 <span  className='crumbs-menu'><Link to="/schoolspace/vocational">首页</Link> / 双高院校</span></h2>
                    </div>
                </div>
                <Row className="academic-top">
                    <div className="Common-content">
                        <Col span={24} className="col-title">
                            <h2>双高计划建设单位</h2>
                            <span><Link to="/schoolspace/districen">看双高院校分布图</Link></span>
                        </Col>
                        <Col span={24} className="vocational-select">
                            <SearchResource getClassify={this.getClassify} schoolType="DH"/>
                        </Col>
                        <Col span={24} className="vocational-search">
                            <span className="span-left">
                                共搜索到{total}条结果
                            </span>
                            <span className="span-right">
                                <Search
                                    placeholder="请输入院校名称"
                                    maxLength={20}
                                    onSearch={this.searchChangeSchool}
                                    onChange={this.seachHandleVla}
                                />
                            </span>
                        </Col>
                    </div>
                </Row>
                <div className="academic-bottom">
                    <div className="Common-content">
                        <Row className="Common-content academic-list">
                            {
                                (schoolList && schoolList.length ) ? (
                                schoolList&&schoolList.map((item,index)=>{
                                    return(
                                        <Col span={4} className="li" key={index}>
                                            <div className="li-top">
                                                <div className="img">
                                                    <img src={getSchoolShowImage(item.logoFileId)}/>
                                                </div>
                                                <div className="text">
                                                    <h3>{item.schoolName}</h3>
                                                   {/* 没有英文名称字段*/}
                                                    <span className="sub">{item.englishName}</span>
                                                    <p className="p">
                                                        <i>专业群 | {item.profession&&item.profession[0]}</i>
                                                        {
                                                            item.profession.length>1?<i>专业群 | {item.profession&&item.profession[1]}</i>:""
                                                        }

                                                    </p>
                                                </div>
                                            </div>
                                            <div className="li-bottom">
                                                <span className="left-h3">
                                                    {item.catagoryName}
                                                    {
                                                        item.gradeName==typeA?(<i>{item.gradeName.substr(0,1)}</i>):item.gradeName==typeB?(<i className="b-active">{item.gradeName.substr(0,1)}</i>):item.gradeName==typeC?(<i className="c-active">{item.gradeName.substr(0,1)}</i>):""
                                                    }
                                                </span>
                                                <span className="but">
                                                    {item.domain?<a href={item.domain} target="_blank"> <Button className="but-antd">学校官网</Button></a>:<a onClick={this.Consultation}> <Button className="but-antd but-antd-on">学校官网</Button></a>}
                                                </span>
                                            </div>
                                            <span className="span-dw">
                                                <img src={require("../../../../assets/img/school_space/dw.png")}/>{item.cityName}
                                            </span>
                                        </Col>
                                    )
                                })
                                ):<MyEmpty content='暂无数据' />
                            }
                        </Row>
                    </div>
                </div>
                <div className="Common-fy">
                    <div className="Common-content page_boxfy" style={{backgroundColor:'#f6f7fb',"text-align":"right"}}>
                        {total>0&&<Pagination
                            showSizeChanger

                            onShowSizeChange={this.changePageSize}
                            onChange={this.changeNum}
                            current={pageNum}
                            pageSize={pageSize}
                            total={total}
                            pageSizeOptions={["12","24","36","48"]}
                            />}

                    </div>
                </div>
                <Modal className='Modal-emptyschool'
                       visible={coverFlag}
                       destroyOnClose={true}
                       maskClosable={false}
                       onCancel={this.cancel}
                       closable={false}
                       footer={
                           null
                       }
                >
                    <div>
                        <Emptyschool closeModal={this.closeModal} />
                    </div>
                </Modal>
            </div>

        )
    }
}
