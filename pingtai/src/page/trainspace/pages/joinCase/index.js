import React, { Component } from 'react';
import './index.scss';
import '../../index.scss';  //引用父组件css
import { data } from './data'

import { Input, Col, Pagination, Modal, } from 'antd';



export default class index extends Component {
    state = {
        modal1Visible: false,
        baseListArr: data,
        goDetailList: [],
    }

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }

    goDetail = (v) => {
        console.log("v---------------")
        console.log(v.jdname)
        this.setState({
            goDetailList: v
        }, () => {
            this.setModal1Visible(true);
        });
    }

    render() {
        const {
            modal1Visible,
            baseListArr,
            goDetailList,
        } = this.state;
        //console.log(baseListArr);
        return (
            <div className="list_box_hz">
                <div className="top_head">
                    <div className="top_head_banner">
                        <span className="top_head_text_title">合作案例</span>
                        <span className="top_head_text_notice">首页 / 合作案例</span>
                    </div>
                </div>
                {/* <div className="top_hezuo">
                    <div className="top"><img src={require('../../../../assets/img/train_space/ts_banner.png')}  alt="" /></div>
                </div> */}

                <div className="bottom_hezuo">
                    <div className="bottom">
                        {/* {
                            [...new Array(32)].map((v, i) => {
                                return <Col key={i} className='item' span={6}>
                                    
                                    <div className="content">
                                        <h2>重庆南川实验区</h2>
                                        <div className="vertical_m line_bottom01 mbottom15 pbottom15">
                                            <span className="info-name">院校名称院校名称 </span>
                                            <span className="info-more fright mbottom10">查看详情</span>
                                        </div>
                                        <div className="info-doc mbottom15">
                                        南川区地处重庆南部，幅员2602平方公里，辖3个街道、31个乡镇，人口68万。近年来，我区大力培育“实干图强、开明开放、勤劳勇敢”的南川人文精神，围绕重庆“五大功能区”规划要求，加快城市发展新区建设，推进全区整体转型，提速发展... 
                                        </div>
                                        
                                    </div>
                                    <div className="top">
                                        
                                        <img 
                                        className="fleft"
                                        src={require('../../../../assets/img/train_space/list_item.png')} alt="" />
                                        <img 
                                        className="fright"
                                        src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg" alt="" />
                                    </div>
                                </Col>
                            })
                        } */}

                        {baseListArr.map((item, index) => {
                            return (
                                <Col key={index} className='item' span={6} onClick={() => this.goDetail(item)}>
                                    {/* {console.log(item.jdname)} */}
                                    <div className="content">
                                        <h2>{item.jdname}</h2>
                                        <div className="vertical_m line_bottom01 mbottom15 pbottom15">
                                            <span className="info-name">{item.yxname} </span>
                                            <span className="info-more fright mbottom10">查看详情</span>
                                        </div>
                                        <div className="info-doc mbottom15">
                                            {item.desc}
                                        </div>
                                    </div>
                                    <div className="top">
                                        <img
                                            className="fleft"
                                            src={require(`../../../../assets/img/train_space/data_img/${item.url01}`)}
                                            //src={`/api/media/api/v1/media/showImage/${item.livePic}`}
                                            alt="" />
                                        {/* <img
                                                className="fright"
                                                src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg" alt="" /> */}
                                        <img
                                            className="fright"
                                            src={require(`../../../../assets/img/train_space/data_img/${item.url02}`)}
                                            alt="" />
                                    </div>
                                </Col>
                            )
                        })
                        }
                       {/* <div className="page-doc" style={{position:"relative",width:"100%",height:"78px"}}>
                       <Pagination
                       style={{position:"absolute",right:'0'}}
                            showSizeChanger
                            //   onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={baseListArr.length*100}
                        />
                       </div> */}
                    </div>
                   
                </div>


                {/*弹层*/}
                <Modal

                    //style={{width: '865px',height: '667px',transformOrigin: '1114px 227px'}}
                    style={{ overflow: 'auto', width: '865px' }}

                    className="layer_info_more"
                    //title={this.state.goDetailList.jdname}
                    centered
                    visible={this.state.modal1Visible}
                    //onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setModal1Visible(false)}
                    footer={null}
                >
                    {console.log("this.state.goDetailList")}
                    {console.log(this.state.goDetailList.jdname)}
                    <h2 className="layer_info_title01" style={{
                        fontFamily: "Noto Sans SC",
                        fontStyle: "normal",
                        fontWeight: "bolder",
                        fontSize: "18px",
                        lineHeight: "25px",
                        color: "#333333",
                    }}>

                        {this.state.goDetailList.jdname}</h2>
                    <p className="layer_info_title02" style={{
                        fontFamily: "Noto Sans SC",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "25px",
                        color: "#888888",
                        paddingBottom: "10px",
                        marginBottom: "15px",
                        marginTop: "10px",
                        borderBottom: "1px solid #e8e8e8",
                    }}>
                        {this.state.goDetailList.yxname}</p>
                    <p style={{ marginBottom: '20px', fontSize: '12px', lineHeight: '20px' }}>{this.state.goDetailList.desc}</p>

                    <div className="img" style={{ overflow: 'auto' }}>
                        {this.state.goDetailList.url01 && <img
                            className="fleft"
                            style={{ borderRadius: '5px' }}
                            src={require(`../../../../assets/img/train_space/data_img/${this.state.goDetailList.url01}`)}
                            alt="" />}


                        {this.state.goDetailList.url02 && <img
                            className="fright"
                            style={{ borderRadius: '5px' }}
                            src={require(`../../../../assets/img/train_space/data_img/${this.state.goDetailList.url02}`)}
                            alt="" />}

                    </div>
                </Modal>
            </div>


        )
    }
}



