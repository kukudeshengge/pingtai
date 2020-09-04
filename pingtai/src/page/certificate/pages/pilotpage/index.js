
import React from 'react';
import './index.scss';
import {  Link } from 'react-router-dom';
import { Input, Col, Row, Pagination} from 'antd';
import  SearchResource from '../cardtypeNew/index'
import { queryList} from "@/api/certificate";
import MyEmpty from '@/components/listEmpty';
const { Search } = Input
export default class Pilotpage extends React.Component {
    state = {
        querylist:[],
        pageNum:1,
        pageSize:12,
        total:0,
        schoolName:'',
        certName:'',
        cityCode:"",
        schoolVal:'',
        certNameList:""
    }
    componentDidMount() {
        this.queryDetaillist()
    }
    // 试点院校列表
    queryDetaillist = async () => {
        const {pageNum,pageSize,schoolName,cityCode,schoolVal,certNameList,certName} =this.state
        let querylist = await queryList({"pageNum":pageNum,"pageSize":pageSize,'schoolName':schoolName,"cityCode":cityCode,"stageCode":schoolVal,'certName':certName,'certNameList':certNameList});
        querylist&&this.setState({
            querylist:querylist.data,
            total:querylist.total,
        })
    }
    // 搜索学校名称
    searchChangeSchool = (val) =>{
        this.setState({
            schoolName:val
        }, () =>{
            this.queryDetaillist()
        })
    }
    // 搜索证书名称
    searchCertificate = (val) =>{
        this.setState({
            certName:val
        }, () =>{
            this.queryDetaillist()
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
    getClassify=(cityListVal,schoolTypeVal)=>{
        this.setState({
            cityCode:cityListVal,
            schoolVal:schoolTypeVal,
            pageNum:1,
        },()=>{
            this.queryDetaillist()
        })
    }
    reBytesStr (str) {
        str=str.replace(/<\/?.+?>/g,"").replace(/ /g,"").replace(/&(\S*)?;/g,"")
        if((!str && typeof(str) != 'undefined')) {
            return '';
        }
        var num = 0;
        var str1 = str;
        var str = '';
        for(var i = 0, lens = str1.length; i < lens; i++) {
            num += ((str1.charCodeAt(i) > 255) ? 2 : 1);
        }
        return num
    }
    toggleForm=(id)=>{
        const {styleClamp}=this.state
        document.getElementById(`cId${id}`).setAttribute("class",'cont-right')
        var ele=document.getElementById( `moreId${id}`)
        ele.style.display="none"
    }
    // 分页
    changeNum = (page,pageSize) => {
        this.setState({
            pageNum:page,
            pageSize:pageSize
        },() => {
            this.queryDetaillist();
        })
    };
    // 分页
    changePageSize = (current,size) => {
        console.log(current,size)
        this.setState({
            pageNum:current,
            pageSize:size
        },() => {
            this.queryDetaillist();
        })
    };
    render() {
        const {total,querylist,pageNum,pageSize} =this.state
        return (
            <div className='pilotpage'>
                <div className='Certificatepage-banner'>
                    <div className='Common-content'>
                        <h2 className='detail-banner-name'>试点院校 <span  className='crumbs-menu' style={{"display":"none"}}><Link to="/certificate/certificatehome">首页</Link> / <Link to="/certificate/certificatecenter">证书中心</Link> /试点院校</span></h2>
                    </div>
                </div>
                <Row className="vocational-top">
                    <div className="Common-content">
                        <Col span={24} className="vocational-select">
                            <SearchResource getClassify={this.getClassify}/>
                        </Col>
                        <Col span={24} className="vocational-search">
                                <span className="span-left">
                                    共搜索到{total}条结果
                                </span>
                            <span className="span-right" style={{display:"none"}}>
                                    <Search
                                        placeholder="请输入证书名称"
                                        maxLength={20}
                                        onSearch={this.searchCertificate}
                                        onChange={this.seachHandleCertificate}
                                    />
                                 </span>
                            <span className="span-right">
                                    <Search
                                        placeholder="请输入学校名称"
                                        maxLength={20}
                                        onSearch={this.searchChangeSchool}
                                        onChange={this.seachHandleSchoolName}
                                    />
                                 </span>
                        </Col>
                    </div>
                </Row>
                <div className='Common-content pilotpage-box'>
                    {
                        querylist&&querylist.length?querylist.map((item, index) => {
                            return (
                                <div className='lilotpage-list' key={index}>
                                    <div  className='lilotpage-top'>
                                        <h2 className='lilotpage-name'>{item.schoolName}</h2>
                                        <p className='lilotpage-addr'>地址：{item.address}</p>
                                    </div>
                                    <div className='lilotpage-cont'>
                                        <label className='lable-name'>试点证书：</label><div className='cont-right '>
                                        {
                                            item.certNameList.map((todo,key)=>{
                                                return(
                                                    <span key={key} className='zs-namelist'>《{todo}》</span>
                                                )
                                            })}
                                    </div>
                                    </div>
                                    <div className='lilotpage-cont lilotpage-contpage'>
                                        <label className='lable-name'>机构简介：</label><div  id={ `cId${index}`}   className='cont-right cont-right-clamp '>{item.remark}</div>
                                    </div>
                                    {this.reBytesStr(item.remark)>500&& <Link id={`moreId${index}`} className='lilotpage-link'  onClick={()=>{this.toggleForm(index)}}>查看详情</Link>}
                                </div>
                            );
                        }):<MyEmpty content='暂无数据' />}
                </div>
                <div className="Common-fy">
                    {total?<div className="Common-content page_boxfy" style={{background:'#f6f7fb'}}>
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
        )
    }
}
