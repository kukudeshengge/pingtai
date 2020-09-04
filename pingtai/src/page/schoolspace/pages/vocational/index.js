
import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Col, Row, Card, Radio, Input, Button, Pagination, Modal } from 'antd';
import { Link } from 'react-router-dom'
import { queryList, getFirstSelect } from '@/api/schoolspace'
import { getSchoolShowImage } from '@/api/media/image'
import SearchResource from '../cardtype/index'
import MyEmpty from '@/components/listEmpty';
import Emptyschool from '../../../../components/emptyschool'
const { Search } = Input;

export default class Vocational extends React.Component {
    state = {
        pageNum: 1,
        pageSize: 12,
        schoolList: [],
        total: 0,
        schoolName: '',
        coverFlag: false,
    }
    componentDidMount() {


    }
    changeNum = (page) => {
        this.setState({
            pageNum: page
        }, () => {
            this.queryList()
        })
    }
    changePageSize = (pageNum, pageSize) => {
        this.setState({
            pageNum: pageNum,
            pageSize: pageSize,
        }, () => {
            this.queryList();
        }
        );
    };
    getClassify = (cityListVal, educationLevelVal, schoolType) => {
        this.setState({
            cityCode: cityListVal,
            stageCode: educationLevelVal,
            typeCode: schoolType,
            pageNum: 1,
        }, () => {
            this.queryList()
        })
    }
    //根据学校名称搜索
    searchChangeSchool = (val) => {
        this.setState({
            schoolName: val
        }, () => {
            this.queryList()
        })
    }
    queryList = async () => {
        const { pageNum, pageSize, cityCode, stageCode, typeCode, schoolName, total } = this.state
        let schoolList = await queryList({
            "cityCode": cityCode,
            "pageNum": pageNum,
            "pageSize": pageSize,
            "schoolName": schoolName,
            "stageCode": stageCode,
            "typeCode": typeCode
        });
        console.log("schoolList", schoolList)
        schoolList && this.setState({
            schoolList: schoolList.data,
            total: schoolList.total
        })
    }
    seachHandleVla = (val) => {
        this.setState({
            schoolName: val.target.value
        })
    }
    goHome = v => {
        console.log(v)
        if (v.schoolName === "广州番禺职业技术学院") {
            sessionStorage.setItem('headerType', '1');
        } else if (v.schoolName === "常州信息职业技术学院") {
            sessionStorage.setItem('headerType', '2');
        }
        sessionStorage.setItem('homeData', JSON.stringify(v));
        window.open('/#/academicspace/educnewslist-home')
    }
    Consultation = (e) => {
        this.setState({
            coverFlag: true,
        })
    }
    cancel = e => {
        this.setState({ coverFlag: false });
    }
    closeModal = () => {
        this.setState({ coverFlag: false });
    }
    render() {
        const { schoolList, total, pageNum, pageSize, imgUrl, coverFlag } = this.state
        return (
            <div className="Common-vocational">
                <div className='Collegescenter-banner'>
                    <div className='Common-content'>
                        <h2 className='detail-banner-name'>高职院校 <span className='crumbs-menu'><Link to="/schoolspace/vocational">首页</Link> / 高职院校</span></h2>
                    </div>
                </div>
                <Row className="vocational-top">
                    <div className="Common-content">
                        <Col span={24} className="col-title">
                            <h2>全国<i>高职</i>院校</h2>
                            <span><Link to="/schoolspace/distribution">查看高职院校分布图</Link></span>
                        </Col>
                        <Col span={24} className="vocational-select">
                            <SearchResource getClassify={this.getClassify} schoolType="GZ" />
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
                <div className="vocational-bottom">
                    <div className="Common-content">
                        <Row className="Common-content vocational-list">
                            {
                                (schoolList && schoolList.length) ? (
                                    schoolList && schoolList.map((item, index) => {
                                        return (
                                            <Col key={index} className="li">
                                                <div className="img">
                                                    <img src={getSchoolShowImage(item.logoFileId)} />
                                                </div>
                                                <div className="text">
                                                    <h3>{item.schoolName}</h3>
                                                    <span className="sub">{item.englishName}</span>
                                                    <p className="p">
                                                        <i>创办时间：{item.establishTime}</i>
                                                        <i>办学类型：{item.schoolTypeName}</i>
                                                        {
                                                            item.mode ? <i>办学方式：{item.mode}</i> : <i>办学方式：---</i>
                                                        }
                                                        {
                                                            item.schoolMotto ? <i>校训：{item.schoolMotto}</i> : <i>校训：---</i>
                                                        }
                                                    </p>
                                                    <span className="but">
                                                        {item.schoolName == "广州番禺职业技术学院" || item.schoolName == "常州信息职业技术学院" ? <Button onClick={() => this.goHome(item)} className="but-antd but1">学校云平台</Button> : ""}

                                                        {item.domain ? <a href={item.domain} target="_blank"> <Button className="but-antd">学校官网</Button></a> : <a onClick={this.Consultation}> <Button className="but-antd but-antd-on">学校官网</Button></a>}

                                                    </span>
                                                </div>
                                                <span className="span-dw">
                                                    <img src={require("../../../../assets/img/school_space/dw.png")} />{item.cityName}
                                                </span>
                                            </Col>
                                        )
                                    })
                                ) : <MyEmpty content='暂无数据' />
                            }
                        </Row>
                    </div>
                </div>
                <div className="Common-fy">
                    <div className="Common-content page_boxfy" style={{ backgroundColor: '#f6f7fb', "text-align": "right" }}>
                        {total > 0 && <Pagination
                            showSizeChanger

                            onShowSizeChange={this.changePageSize}
                            onChange={this.changeNum}
                            current={pageNum}
                            pageSize={pageSize}
                            total={total}
                            pageSizeOptions={["12", "24", "36", "48"]}
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
