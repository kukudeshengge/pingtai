
import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import {Button, Card, Col, Empty, Input, Pagination, Radio, Row} from 'antd';
import {  Link } from 'react-router-dom';
import { catagorySelect,querySelect } from "@/api/certificate";
import MyEmpty from '@/components/listEmpty';
import SearchResource from "../cardtypeNew";
const { Search } = Input;

export default class Certificatecenter extends React.Component {
    state = {
        catatoryCode:[],
        pageNum:1,
        pageSize:12,
        categoryId:'',
        total:0,
        certName:'',
        educationLevelVal:'',
    }
    componentDidMount() {
        this.catagorySelect()
        this.querySelect()
    }
    catagorySelect = async () => {
        let catagorylist = await catagorySelect();
        console.log("catagorylist",catagorylist)
        this.setState({
            catagorylist:catagorylist,
        })
    }
    querySelect = async  ()=>{
        const {pageNum,pageSize,certName,categoryId}=this.state
        let querylist =await querySelect({'pageNum':pageNum,'pageSize':pageSize,'catatoryCode':categoryId,'certName':certName})
        console.log("querylist1111",querylist)
        querylist&&this.setState({
            querylist:querylist.data,
            total:querylist.total,
            certName:certName
        })
    }
    //切换事件
    handleCategory=(val)=>{
        this.setState({
            categoryId:val.target.value,
            pageNum:1,
        },()=>{
            this.querySelect()
        })
    }
    // 分页
    changeNum = (page,pageSize) => {
        this.setState({
            pageNum:page,
            pageSize:pageSize
        },() => {
            this.querySelect();
        })
    };
    // 分页
    changePageSize = (current,size) => {
        console.log(current,size)
        this.setState({
            pageNum:current,
            pageSize:size
        },() => {
            this.querySelect();
        })

    };
    // 搜索
    searchChangeSchool = (val) => {
        this.setState({
            certName:val
        },()=>{
            this.querySelect()
        })
    }
    seachHandleVla=(val)=>{
        this.setState({
            certName:val.target.value
        })
    }
    render() {
        const {catagorylist,querylist,categoryId,total,pageNum,pageSize,educationLevelVal} = this.state;
        return (
            <div className="certificate-center-wrap">
               {/* <div className="nav-box">
                    <div className="certificate-content Common-content">
                            <div className="center-tit">
                                <i>“</i>
                                <span>78家培训评价组织</span>
                                <span>92个职业技能等级证书</span>
                                <i>”</i>
                            </div>
                            <Radio.Group  defaultValue={educationLevelVal} className="nav-tab"  onChange={this.handleCategory}>
                                <Radio.Button value="" key={-1}>
                                    <h3 className="tab-tit">全部</h3>
                                    <p className="tab-english">all</p>
                                </Radio.Button>
                                {catagorylist&&catagorylist.map((item,index)=>{
                                    return (
                                        <Radio.Button value={item} key={item}>
                                            <h3 className="tab-tit">{item}</h3>
                                            <p className="tab-english">The Internet</p>
                                        </Radio.Button>
                                    )
                                })}

                            </Radio.Group>
                            <div className="nav-tab" style={{display:"none"}}>
                                <ul>
                                    <li  onClick={()=>{this.handleCategory('')}} className={`nav-li ${categoryId=='' ? "nav-li-active":""}`}>
                                        <div className="tab-item">
                                            <p className="tab-tit">全部</p>
                                            <p className="tab-english">all</p>
                                        </div>
                                    </li>
                                    {catagorylist&&catagorylist.map((item,index)=>{
                                        return (
                                            <li key={index} onClick={()=>{this.handleCategory(item)}} className={`nav-li ${categoryId==item ? "nav-li-active":""}`}>
                                                <div className="tab-item">
                                                    <p className="tab-tit">{item}</p>
                                                    <p className="tab-english">The Internet</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                </div>*/}
                <div className='Certificatepage-banner'>
                    <div className='Common-content'>
                        <h2 className='detail-banner-name'>证书中心 <span  className='crumbs-menu' style={{"display":"none"}}><Link to="/certificate/certificatehome">首页</Link> / <Link to="/certificate/certificatecenter">证书中心</Link> /试点院校</span></h2>
                    </div>
                </div>
                <Row>
                    <Col span={24} className="vocational-select">
                        <Card className="center-content-paper Common-content">
                            <Row className="paper-common" id="paperCommon">
                                <Col span={24} className="paper-year-right">
                                    <Radio.Group  defaultValue={educationLevelVal} className="nav-tab"  onChange={this.handleCategory}>
                                        <Radio.Button value="" key={-1}> 全部</Radio.Button>
                                        {catagorylist&&catagorylist.map((item,index)=>{
                                            return (
                                                <Radio.Button value={item} key={item}>
                                                   {item}
                                                </Radio.Button>
                                            )
                                        })}
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="vocational-search">
                                    <span className="span-left">
                                        共搜索到{total}条结果
                                    </span>
                                    <span className="span-right">
                                        <Search
                                            placeholder="请输入证书名称"
                                            maxLength={20}
                                            onSearch={this.searchChangeSchool}
                                            onChange={this.seachHandleVla}
                                        />
                                        {/*<span className="search-result" onClick={this.searchChangeSchool}>查询</span>*/}
                                    </span>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <div className="center-container">
                    <div className="Common-content">
                        <Row className="center-search-box">
                            <Col span={24}>
                                <div className="center-top">
                                    <span className="center-tit">证书列表</span>
                                    <img src={require("../../../../assets/img/certificate/center_img.png")} className="icon-img"/>
                                </div>
                            </Col>
                        </Row>
                        <div className="list-box">
                            <Row gutter={[22]}  type="flex">
                                {
                                    (querylist && querylist.length ) ? (
                                    querylist&&querylist.map((item,index) => {
                                        return (
                                            <Col span={12}  key={index}>
                                                <div className="list-item">
                                                    <div className="center-list">
                                                        <div className="list-left">
                                                            <h3 className="list-tit">{item.certName}</h3>
                                                            <p className="list-resource">颁证机构：{item.certOrg}</p>
                                                            <p className="list-desc">{item.certRemark}</p>
                                                        </div>
                                                        <div className="list-right">
                                                            <img src={require("../../../../assets/img/certificate/center_zs_img.png")} className="center-list-img"/>
                                                        </div>
                                                    </div>
                                                    <Link to={`/certificate/certificatepage?${encodeURI(JSON.stringify({certName: item.certName}))}`} className="see-detail">查看详情</Link>
                                                </div>
                                            </Col>
                                        )
                                    })
                                    ):<MyEmpty content='暂无数据' />
                                }
                            </Row>
                        </div>
                    </div>
                    <div className="Common-fy">
                        {total ? <div className="Common-content page_boxfy" style={{background:'#f6f7fb'}}>
                            <Pagination
                                showSizeChanger

                                onShowSizeChange={this.changePageSize}
                                onChange={this.changeNum}
                                current={pageNum}
                                pageSize={pageSize}
                                total={total}
                                pageSizeOptions={["12","24","36","48"]}
                            />
                        </div>:null}
                    </div>
                </div>
            </div>
        )
    }
}
