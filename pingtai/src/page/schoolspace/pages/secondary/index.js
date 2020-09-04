
import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import {Col, Row, Card, Radio, Input, Button, Pagination, Empty,Table} from 'antd';
import { DndProvider} from 'react-dnd';

import {  Link } from 'react-router-dom'
import {middleSchoolList} from '@/api/schoolspace'
import  SearchResource from '../cardtype/index'
const { Search } = Input;

export default class Secondary extends React.Component {
    state={
        pageNum:1,
        pageSize:12,
        schoolList:[],
        total:0,
        schoolCatagory:'',
        schoolName:"",
        columns: [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
                render:(text,record,index)=>`${index+1}`
            },
            {
                title: '院校名称',
                dataIndex: 'schoolName',
                key: 'schoolName',
                render:(texta)=>(
                    <div>
                        {
                            texta ? texta : "---"
                        }
                    </div>
                )
            },
            {
                title: '所属地',
                dataIndex: 'provinceName',
                key: 'provinceName',
                render:(textb)=>(
                    <div>
                        {
                            textb ? textb : "---"
                        }
                    </div>
                )
            },
            {
                title: '学校类型',
                dataIndex: 'schoolCatagory',
                key: 'schoolCatagory',
                render:(textc)=>(
                    <div>
                        {
                            textc ? textc : "---"
                        }
                    </div>
                )
            },
            {
                title: '学校性质',
                dataIndex: 'mode',
                key: 'mode',
                render:(textd)=>(
                    <div>
                        {
                            textd ? textd : "---"
                        }
                    </div>
                )
            },
            {
                title: '学校隶属',
                dataIndex: 'schoolOwner',
                key: 'schoolOwner',
                render:(texte)=>(
                    <div>
                        {
                            texte ? texte : "---"
                        }
                    </div>
                )
            }
         ],
        tableLoading: true,
        dataSource:[],
        middlelists: []
   }
    componentDidMount() {
        this.middleSchoolList()

    }
    changeNum=(page)=>{
        this.setState({
            pageNum: page
        },()=>{
            this.middleSchoolList()
        })
    }
    changePageSize = (pageNum, pageSize) => {
        this.setState({
                pageNum: pageNum,
                pageSize: pageSize,
            }, () => {
                this.middleSchoolList();
            }
        );
    };
    getClassify=(cityListVal,schoolType, educationLevelVal)=>{
        this.setState({
            province:cityListVal,
            typeCode:schoolType,
            stageCode:educationLevelVal,
            pageNum: 1,
        },()=>{
            console.log("getClassify6666666")
            this.middleSchoolList()
        })
    }
    //根据学校名称搜索
    searchChangeSchool=(val)=>{
        this.setState({
            schoolName:val
        },()=>{
            this.middleSchoolList()
        })
   }
    middleSchoolList = async () => {
        const {pageNum,pageSize,cityCode,stageCode,typeCode,schoolCatagory,total,province,schoolName,epsId}=this.state
        let middlelist = await middleSchoolList({
            "cityCode": cityCode,
            "pageNum": pageNum,
            "pageSize": pageSize,
            "schoolCatagory": schoolCatagory,
            "typeCode": stageCode,
            "province":province,
            "schoolName":schoolName,
            epsId: epsId,
        });
        middlelist&&this.setState({
            dataSource:middlelist.data,
            total:middlelist.total
        })
        console.log('0002', this.state.dataSource)
    }
    seachHandleVla=(val)=>{
        this.setState({
            schoolName:val.target.value
        })
    }
    render() {
        const {total,pageNum,pageSize,columns,dataSource,tableLoading}=this.state
        return (
            <div className="Common-secondary">
                <div className='Collegescenter-banner'>
                    <div className='Common-content'>
                        <h2 className='detail-banner-name'>中职院校 <span  className='crumbs-menu'><Link to="/schoolspace/vocational">首页</Link> / 中职院校</span></h2>
                    </div>
                </div>
                <Row className="vocational-top">
                    <div className="Common-content">
                        <Col span={24} className="col-title">
                            <h2>全国<i>中职</i>院校</h2>
                            <span><Link to="/schoolspace/districenter">查看中职院校分布图</Link></span>
                        </Col>
                        <Col span={24} className="vocational-select">
                           <SearchResource getClassify={this.getClassify} schoolType="ZZ"/>
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
                <div className="secondary-bottom">
                    <div className="Common-content">
                        <Row className="Common-content secondary-list">
                            <Col>
                                <Card>
                                    <Table className="main-box-header table-maina" cellspacing={20}  columns={columns} dataSource={dataSource} pagination={false} rowKey={row => row.id}
                                           components={this.components}
                                           onRow={(record, index) => ({
                                               index,
                                               moveRow: this.moveRow,
                                           })}
                                    />
                                    <div className="Common-fy">
                                        <div className="page_boxfy" style={{backgroundColor:'#ffffff',"text-align":"right"}}>
                                            {total>0&& <Pagination
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
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

        )
    }
}
