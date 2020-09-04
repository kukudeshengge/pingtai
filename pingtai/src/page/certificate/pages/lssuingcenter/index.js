import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import {Card, Col, Collapse, Input, Pagination, Radio, Row} from 'antd';
import {certUnitCitySelect, queryOrgCollege, queryOrgList} from "@/api/certificate";
import MyEmpty from '@/components/listEmpty';
import  IssCard from '../lssuingcard/index'

const { Search } = Input
const { Panel } = Collapse;

export default class Lssuingcenter extends React.Component {
    state = {
        querylist:[],
        pageNum:1,
        pageSize:12,
        total:0,
        certName:'',
        schoolName:'',
        provinceName:'',
        cityCode:"",
        schoolVal:'',
        cityList:[],//城市列表
        cityListVal:'',//城市列表
    }
    componentDidMount() {
        this.certUnitCitySelect()
        this.queryOrgList()
    }
    // 分页获取颁证机构列表查询
    queryOrgList = async () => {
        const {pageNum,pageSize,schoolName,provinceName,certName} = this.state
        let orgListResult = await queryOrgList({"pageNum":pageNum,"pageSize":pageSize,'schoolName':schoolName,'certName':certName,'provinceName': provinceName});
        let orgList = orgListResult&&orgListResult.data;
        orgList&&this.setState({
            querylist:orgList,
            total:orgListResult.total,
        },()=>{
            console.log(  "total",this.state.total)
        })
    }
    // 城市列表
    certUnitCitySelect = async () => {
        let cityList = await certUnitCitySelect({type:'BZ'});
        cityList&&this.setState({
            cityList,
            cityListVal:''
        })
    }
    // 搜索学校名称
    searchChangeSchool = (val) =>{
        this.setState({
            schoolName:val
        }, () =>{
            this.queryOrgList()
        })
    }
    // 搜索证书名称
    searchChangeCert = (val) =>{
        this.setState({
            certName:val
        }, () =>{
            this.queryOrgList()
        })
    }
    seachHandleCertificate=(val)=>{
        this.setState({
            certName:val.target.value
        })
    }
    seachHandleSchoolName=(val)=>{
        this.setState({
            schoolName:val.target.value
        })
    }
    // 分类
    onChangeSecondSelect=(val)=>{
        this.setState({
            provinceName:val.target.value,
            pageNum:1,
        },()=>{
            this.queryOrgList()
        })
    }
    // 分页
    changeNum = (page,pageSize) => {
        this.setState({
            pageNum:page,
            pageSize:pageSize
        },() => {
            this.queryOrgList();
        })
    };
    // 分页
    changePageSize = (current,size) => {
        console.log(current,size)
        this.setState({
            pageNum:current,
            pageSize:size
        },() => {
            this.queryOrgList();
        })

    };
    render() {
        const {total,querylist,pageNum,pageSize,cityListVal,cityList} =this.state
        return (
            <div className='lssuingcenter'>
                <div className='Certificatepage-banner'>
                    <div className='Common-content'>
                        <h2 className='detail-banner-name'>颁证机构 <span  className='crumbs-menu'><Link to="/certificate/certificatehome">首页</Link> / <Link to="/certificate/certificatecenter">证书中心</Link> /颁证机构</span></h2>
                    </div>
                </div>
                    <Row className="vocational-top">
                        <div className="Common-content">
                            <Col span={24} className="vocational-select">
                                <Card className="center-content-paper">
                                    <Row className="paper-common">
                                        <Col span={2} className="paper-year">
                                            所属省市
                                        </Col>
                                        <Col span={22} className="paper-year-right">
                                            <Radio.Group onChange={this.onChangeSecondSelect} >
                                                <Radio.Button >全部</Radio.Button>
                                                {cityList.map((item, index) => {
                                                    return (
                                                        <Radio.Button value={item.fullName} key={index}>{item.fullName} {item.num&&<span>（{item.num}）</span>}</Radio.Button>
                                                    );
                                                })}
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24} className="vocational-search">
                            <span className="span-left">
                                共搜索到{total}条结果
                            </span>
                                {/*<span className="span-right">*/}
                                {/*    <Search*/}
                                {/*        placeholder="请输入学校名称"*/}
                                {/*        maxLength={20}*/}
                                {/*        onSearch={this.searchChangeSchool}*/}
                                {/*        onChange={this.seachHandleSchoolName}*/}
                                {/*    />*/}
                                {/*</span>*/}
                                <span className="span-right">
                                    <Search
                                        placeholder="请输入证书名称"
                                        maxLength={20}
                                        onSearch={this.searchChangeCert}
                                        onChange={this.seachHandleCertificate}
                                    />
                                </span>
                            </Col>
                        </div>
                    </Row>
                <div className='Common-content pilotpage-box'>
                    {querylist && querylist.length?querylist.map((item, index) => {
                        return (
                         <IssCard key={index} item={item} index={index}  />
                        );
                    }): <MyEmpty content='暂无机构' />}
                </div>
                <div className="Common-fy">
                    {total?
                        <div className="Common-content page_boxfy" style={{background:'#f6f7fb'}}>
                            <Pagination
                                showSizeChanger
                                onShowSizeChange={this.changePageSize}
                                onChange={this.changeNum}
                                current={pageNum}
                                pageSize={pageSize}
                                total={total}
                                pageSizeOptions={["12","24","36","48"]}
                            />
                        </div>:null
                    }
                </div>
            </div>
        )
    }
}
