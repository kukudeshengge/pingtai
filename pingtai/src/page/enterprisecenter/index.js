
import React, {Component} from 'react';
import './index.scss';
import Header from '../../components/headersIndex'
import  Footer from '../../components/footer'
import Application from "@/components/application/applyuse";
import {Col, Modal, Pagination, Radio, Row} from "antd";
import {Link} from "react-router-dom";
import {esList} from "./esdata"

export default class Enterprisecenter extends React.Component {
    state = {
        coverFlag:false,
        esList: esList
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
        let {coverFlag } = this.state;
        return (
            <div>
                <Header/>
                <div style={{paddingTop:"66px"}} className='enterprisecenter'>
                    <div className='certificate-banner'>
                        <img className='banner-img'
                             src={require('../../assets/img/enterprisecenter/enterprisecenter-banner.png')}/>
                        <div className='banner-cont Common-content'>
                            <p className='bannersmall-name'>Enterprise Online</p>
                            <h2 className='banner-name'>重构企业边界，助力融合创新</h2>
                            <p  className='banner-doc'>立即加入中教云企业赋能体系，共同推动产教融合发展，促进教育链、人<br/>才链与产业链、创新链有机衔接、全方位融合。</p>
                       <span className='enterprise-add' onClick={this.Consultation}>立即加入</span>
                        </div>
                    </div>
                    <div className="center-container">
                        <div className="Common-content">
                            <br/>
                            {/*<Radio.Group  defaultValue="全部" className="nav-tab">*/}
                            {/*    <Radio.Button value="全部" >*/}
                            {/*        <h3 className="tab-tit">全部</h3>*/}
                            {/*        <p className="tab-english">all</p>*/}
                            {/*    </Radio.Button>*/}
                            {/*    <Radio.Button value="互联网行业">*/}
                            {/*        <h3 className="tab-tit">互联网行业</h3>*/}
                            {/*        <p className="tab-english">The Internet</p>*/}
                            {/*    </Radio.Button>*/}
                            {/*    <Radio.Button value="医药医疗行业">*/}
                            {/*        <h3 className="tab-tit">医药医疗行业</h3>*/}
                            {/*        <p className="tab-english">Medical treatment</p>*/}
                            {/*    </Radio.Button>*/}
                            {/*    <Radio.Button value="机械制造行业">*/}
                            {/*        <h3 className="tab-tit">机械制造行业</h3>*/}
                            {/*        <p className="tab-english">Machine made</p>*/}
                            {/*    </Radio.Button>*/}
                            {/*    <Radio.Button value="大数据分析">*/}
                            {/*        <h3 className="tab-tit">大数据分析</h3>*/}
                            {/*        <p className="tab-english">Big data analysis</p>*/}
                            {/*    </Radio.Button>*/}
                            {/*</Radio.Group>*/}
                            <Row className="center-search-box">
                                <Col span={12}>
                                    <div className="center-top">
                                        <span className="center-tit">企业信息</span>
                                    </div>
                                </Col>
                            </Row>
                            <div className="list-box">
                            <Row gutter={[22]}  type="flex">
                                {
                                    esList.map((item, i) => {
                                        return <Col span={12}  >
                                            <div className="list-item">
                                            <div className="center-list">
                                                <div className="list-left">
                                                    <h3 className="list-tit">{item.esName}</h3>
                                                    <p className="list-resource">所在省份：{item.esProvince}&nbsp;&nbsp;&nbsp;
                                                        {/*企业类型：{item.esType}*/}
                                                    </p>
                                                    <p className="list-desc">{item.esDesc}</p>
                                                </div>
                                                <div className="list-right">
                                                  {
                                                    item.esLogo? <img src={require("../../assets/img/enterprisecenter/" + item.esLogo)} className="center-list-img"/>:<img src={require("../../assets/img/default-img.png")} className="center-list-img"/>
                                                  }
                                                </div>
                                            </div>
                                                {/*禁用按钮*/}
                                         {/*   <button type="primary" className="see-detail" disabled={true}>企业空间正在建设中</button>*/}
                                                {
                                                    item.esName === "首都信息发展有限公司"?<a href="https://case1.es.cvei.cn/" target="_blank"><button type="primary" className="see-detail" disabled={item.isInZjyd==1?true:false}>{item.isInZjyd==1?"企业空间正在建设中":"查看详情"}</button></a>:
                                                        item.esName === "人大数字科技有限公司"?<a href="https://case2.es.cvei.cn/" target="_blank"><button type="primary" className="see-detail" disabled={item.isInZjyd==1?true:false}>{item.isInZjyd==1?"企业空间正在建设中":"查看详情"}</button></a>:
                                                            <a><button type="primary" className="see-detail" disabled={item.isInZjyd==1?true:false}>{item.isInZjyd==1?"企业空间正在建设中":"查看详情"}</button></a>
                                                }
                                            </div>
                                        </Col>
                                    })
                                }
                            </Row>
                            </div>
                            {/*<div className="page_boxfy" style={{background:'#f6f7fb'}}>*/}
                            {/*    <Pagination*/}
                            {/*        showSizeChanger={true}*/}
                            {/*        onShowSizeChange={this.onShowSizeChange}*/}
                            {/*        defaultCurrent={1}*/}
                            {/*        pageSize={12}*/}
                            {/*        total={100}*/}
                            {/*        pageSizeOptions={["12","24","36","48"]}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <Footer/>
                <Modal className='Modal-butpage'
                       visible={coverFlag}
                       destroyOnClose={true}
                       maskClosable={false}
                       onCancel={this.cancel}
                       closable={false}
                       footer={
                           null
                       }
                >
                    <Application closeModal={this.closeModal} />
                </Modal>
            </div>
        )
    }
}
