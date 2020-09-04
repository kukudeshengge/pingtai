/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/accessible-emoji */
/*eslint eqeqeq: ["off", "smart"]*/
import React, { Component } from 'react';
import { Tabs, Row, Col, Button, Modal, Tree } from 'antd';
import './index.scss';
import { Link } from "react-router-dom";
import Applyuse from "@/components/applyuse/applyuse";
import { getCourseDetail, getCaltalog } from '@/api/resource/course-detail.js';
import { analysisTem, toChinesNum } from '@/until/libs';
import Validate from "@/until/libs";
import { imgUrl } from '@/config/secret.js';
const { TabPane } = Tabs;
const { TreeNode } = Tree;
let noneArr = [1, 4, 6];

class resourceDetail extends Component {
    state = {
        courseDetail: '',
        introduce: '',
        activeKey: "1",
        courseId: '',
        mediaType: '',
        fileIdFirst: '',
        mediaTypeFirst: '',
        Teacher: [],
        courseChapter: [],
        coverFlag: false,
        labelNameList: [],
        bookCatalogVoList: []
    };
    //获取课程详情
    getCourseDetail = () => {
        getCourseDetail({ id: sessionStorage['resourceDetail_id'] }).then(res => {
            if (res) {
                console.log(res)
                this.setState({
                    introduce: res.introduce,
                    courseDetail: {
                        fileId: res.fileId,
                        id: res.id,
                        period: res.period,
                        simpleIntroduce: res.introduce,
                        subjectName: res.subjectName,
                    }
                })
            }
        })
    }
    //获取课程目录
    getCaltalog = () => {
        getCaltalog({ id: sessionStorage['resourceDetail_id'] }).then(courseChapter => {
            if (courseChapter) {
                this.setState({
                    courseChapter,
                    fileIdFirst: courseChapter[0] && courseChapter[0].childrenList[0] && courseChapter[0].childrenList[0].fileId,
                    mediaTypeFirst: courseChapter[0] && courseChapter[0].childrenList[0] && courseChapter[0].childrenList[0].mediaType,
                    bookCatalogVoList: courseChapter.bookCatalogVoList
                })
            }
        })
    }
    componentDidMount() {
        this.getCourseDetail();
        this.getCaltalog();
    }
    //tab切换
    callback = async (key) => {
        await this.setState({ activeKey: key })
    }
    toTry = (free) => {
        // sessionStorage.setItem('resourceDetail_id', '0a12fc76c7b541e5ad9d7d8225221bc1');
        this.props.history.push(`/resource-center/course-resourceDetail`);
    }
    jumpDetail = v => {
        sessionStorage.setItem('active', v.id);
        this.props.history.push(`/resource-center/course-resourceDetail`);
    };
    cancel = e => {
        this.setState({ coverFlag: false, id: '', categoryName: '' });
    }
    Consultation = (e) => {
        this.setState({
            coverFlag: true,
        })
    }
    closeModal = () => {
        this.setState({ coverFlag: false });
    }
    getCutOne = v => {
        sessionStorage.setItem('catalog', JSON.stringify(v));
        this.props.history.push('/resource-center/course-resourceDetail');
    }
    render() {
        let { courseDetail, bookCatalogVoList, introduce, activeKey, coverFlag, userId } = this.state;
        let resourceId = sessionStorage['resourceDetail_id'] ? sessionStorage['resourceDetail_id'] : '';
        let userMark = "";
        let token = localStorage['OBS_token'] ? localStorage['OBS_token'] : '';
        const loop = (courseTree) =>
            courseTree.map((item, index) => {
                if (
                    !Validate.isEmpty(item) &&
                    item.hasOwnProperty("children") &&
                    item.children
                ) {
                    if (item.seniorId === 0) {
                        return (
                            <TreeNode
                                className="TreeNode"
                                key={item.id}
                                title={
                                    <div className="TreeIcon">
                                        <span
                                            className="title"
                                            style={{ marginRight: 10 }}
                                            title={item.catalogName}
                                        >
                                            {item.catalogName}
                                        </span>
                                    </div>
                                }
                            >
                                {item.courseCenterResourceVoList.map((Resource, index) => {
                                    if (Resource.watch || token) {
                                        return <TreeNode
                                            className="ResourceTreeNode"
                                            key={Resource.fileId}
                                            title={
                                                <div className="TreeIcon">
                                                    <span
                                                        className="title1"
                                                        style={{ marginRight: 10 }}
                                                        onClick={() => this.getCutOne(Resource)}
                                                        title={Resource.resourceName}
                                                    >
                                                        {Resource.resourceName}
                                                        {noneArr.indexOf(userMark) > -1 ? (
                                                            <span>
                                                                {Resource.id === resourceId ? (
                                                                    <i className="i">{"正在学"}</i>
                                                                ) : (
                                                                        <i className="i">
                                                                            {Resource.studyProgressSum
                                                                                ? Resource.studyProgressSum + "%"
                                                                                : "0%"}
                                                                        </i>
                                                                    )}
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </div>
                                            }
                                        ></TreeNode>
                                    } else {
                                        return <TreeNode
                                            className="ResourceTreeNode"
                                            key={Resource.fileId}
                                            title={
                                                <div style={{ display: 'flex', alignItems: 'center' }} className="TreeIcon">
                                                    <img style={{ marginRight: '10px' }} src={require('@/assets/img/resource_center/black_lock.png')} alt="图片" />
                                                    <span
                                                        className="title1"
                                                        style={{ marginRight: 10 }}
                                                        title={Resource.resourceName}
                                                    >
                                                        {Resource.resourceName}
                                                    </span>
                                                </div>
                                            }
                                        ></TreeNode >
                                    }
                                })}
                                {loop(item.children)}
                            </TreeNode>
                        );
                    } else {
                        return (
                            <TreeNode
                                className="TreeNode"
                                key={item.id}
                                title={
                                    <div className="TreeIcon">
                                        <span
                                            className="title"
                                            style={{ marginRight: 10 }}
                                            title={item.catalogName}
                                        >
                                            {item.catalogName}
                                        </span>
                                    </div>
                                }
                            >
                                {item.courseCenterResourceVoList.map((Resource, index) => {
                                    if (Resource.watch || token) {
                                        return <TreeNode
                                            className="ResourceTreeNode"
                                            key={Resource.fileId}
                                            title={
                                                <div className="TreeIcon">
                                                    <span
                                                        className="title1"
                                                        style={{ marginRight: 10 }}
                                                        onClick={() => this.getCutOne(Resource)}
                                                        title={Resource.resourceName}
                                                    >
                                                        {Resource.resourceName}
                                                        {noneArr.indexOf(userMark) > -1 ? (
                                                            <span>
                                                                {Resource.id === resourceId ? (
                                                                    <i className="i">{"正在学"}</i>
                                                                ) : (
                                                                        <i className="i">
                                                                            {Resource.studyProgressSum
                                                                                ? Resource.studyProgressSum + "%"
                                                                                : "0%"}
                                                                        </i>
                                                                    )}
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </div>
                                            }
                                        ></TreeNode>
                                    } else {
                                        return <TreeNode
                                            className="ResourceTreeNode"
                                            key={Resource.fileId}
                                            title={
                                                <div style={{ display: 'flex', alignItems: 'center' }} className="TreeIcon">
                                                    <img style={{ marginRight: '10px' }} src={require('@/assets/img/resource_center/black_lock.png')} alt="图片" />
                                                    <span
                                                        className="title1"
                                                        style={{ marginRight: 10 }}
                                                        title={Resource.resourceName}
                                                    >
                                                        {Resource.resourceName}
                                                    </span>
                                                </div>
                                            }
                                        ></TreeNode >
                                    }

                                })
                                }
                                {loop(item.children)}
                            </TreeNode >
                        );
                    }
                } else {
                    if (item.seniorId === 0) {
                        return (
                            <TreeNode
                                className="TreeNode"
                                key={item.id}
                                title={
                                    <div className="TreeIcon">
                                        <span
                                            className="title"
                                            style={{ marginRight: 10 }}
                                            title={item.catalogName}
                                        >
                                            {item.catalogName}
                                        </span>
                                    </div>
                                }
                            >
                                {item.courseCenterResourceVoList.map((Resource, index) => {
                                    if (Resource.watch || token) {
                                        return <TreeNode
                                            className="ResourceTreeNode"
                                            key={Resource.fileId}
                                            title={
                                                <div className="TreeIcon">
                                                    <span
                                                        className="title1"
                                                        style={{ marginRight: 10 }}
                                                        onClick={() => this.getCutOne(Resource)}
                                                        title={Resource.resourceName}
                                                    >
                                                        {Resource.resourceName}
                                                        {noneArr.indexOf(userMark) > -1 ? (
                                                            <span>
                                                                {Resource.id === resourceId ? (
                                                                    <i className="i">{"正在学"}</i>
                                                                ) : (
                                                                        <i className="i">
                                                                            {Resource.studyProgressSum
                                                                                ? Resource.studyProgressSum + "%"
                                                                                : "0%"}
                                                                        </i>
                                                                    )}
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </div>
                                            }
                                        ></TreeNode>
                                    } else {
                                        return <TreeNode
                                            className="ResourceTreeNode"
                                            key={Resource.fileId}
                                            title={
                                                <div style={{ display: 'flex', alignItems: 'center' }} className="TreeIcon">
                                                    <img style={{ marginRight: '10px' }} src={require('@/assets/img/resource_center/black_lock.png')} alt="图片" />
                                                    <span
                                                        className="title1"
                                                        style={{ marginRight: 10 }}
                                                        title={Resource.resourceName}
                                                    >
                                                        {Resource.resourceName}
                                                    </span>
                                                </div>
                                            }
                                        ></TreeNode >
                                    }
                                })}
                            </TreeNode>
                        );
                    } else {
                        return (
                            <TreeNode
                                className="TreeNode"
                                key={item.id}
                                title={
                                    <div className="TreeIcon">
                                        <span
                                            className="title"
                                            style={{ marginRight: 10 }}
                                            title={item.catalogName}
                                        >
                                            {item.catalogName}
                                        </span>
                                    </div>
                                }
                            >
                                {item.courseCenterResourceVoList.map((Resource, index) => {
                                    if (Resource.watch || token) {
                                        return <TreeNode
                                            className="ResourceTreeNode"
                                            key={Resource.fileId}
                                            title={
                                                <div className="TreeIcon">
                                                    <span
                                                        className="title1"
                                                        style={{ marginRight: 10 }}
                                                        onClick={() => this.getCutOne(Resource)}
                                                        title={Resource.resourceName}
                                                    >
                                                        {Resource.resourceName}
                                                        {noneArr.indexOf(userMark) > -1 ? (
                                                            <span>
                                                                {Resource.id === resourceId ? (
                                                                    <i className="i">{"正在学"}</i>
                                                                ) : (
                                                                        <i className="i">
                                                                            {Resource.studyProgressSum
                                                                                ? Resource.studyProgressSum + "%"
                                                                                : "0%"}
                                                                        </i>
                                                                    )}
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </div>
                                            }
                                        ></TreeNode>
                                    } else {
                                        return <TreeNode
                                            className="ResourceTreeNode"
                                            key={Resource.fileId}
                                            title={
                                                <div style={{ display: 'flex', alignItems: 'center' }} className="TreeIcon">
                                                    <img style={{ marginRight: '10px' }} src={require('@/assets/img/resource_center/black_lock.png')} alt="图片" />
                                                    <span
                                                        className="title1"
                                                        style={{ marginRight: 10 }}
                                                        title={Resource.resourceName}
                                                    >
                                                        {Resource.resourceName}
                                                    </span>
                                                </div>
                                            }
                                        ></TreeNode >
                                    }
                                })}
                            </TreeNode>
                        );
                    }
                }
            });

        let Introductionpic = <div className="Chat-left">
            <div className="left-content">

                {introduce ? <div className="title">
                    <h4>课程简介</h4>
                </div> : null}
                {
                    introduce ?
                        <div className="news-cont" dangerouslySetInnerHTML={{ __html: introduce }}></div> :
                        <div className="news-cont pic-air"><div><img src={require("../../../../assets/img/resource_center/empety.png")} alt='图片' /><span>数据为空</span></div></div>
                }

            </div>
        </div>
        let Cataloglist = bookCatalogVoList && bookCatalogVoList.length > 0 ? (
            <Tree defaultExpandAll>{loop(bookCatalogVoList)}</Tree>
        ) : null
        // let Cataloglist = bookCatalogVoList.length > 0 ? bookCatalogVoList.map((item, index) => {
        //     return (
        //         <div key={index} className="Chat-left">
        //             <div className="lisy">
        //                 {/* <h3><i>第{toChinesNum(index + 1)}章</i><span>{item.catalogName}</span></h3> */}

        //                 <ul>
        //                     {item.children.length > 0 && item.children.map((todo, k) => {
        //                         if (k >0) {
        //                             return <li key={k} style={{display:'flex',justifyContent:'space-between'}}>
        //                                 <p>{k < 9 ? `0${k + 1}` : k + 1} | {todo.catalogName}</p>
        //                                     <span  style={{ opacity: 1 }} style={{background:'#7e8492',padding:'5px',borderRadius:'5px',color:'#fff'}}>
        //                                         <span style={{display:'flex',alignItems:'center'}}><i className="icona">
        //                                         <img src={require('@/assets/img/resource_center/white_lock.png')} alt="图片" /></i>
        //                                         <i style={{ marginLeft: '3px', fontStyle: 'normal',cursor:'pointer' }}>申请后即可观看</i>
        //                                         </span>
        //                                         </span>
        //                             </li>
        //                         } else {
        //                             return (
        //                                 <li key={k} className={index != 0 || index == 0 && k > 2 ? "" : ''}>
        //                                     <p>{k < 10 ? `0${k + 1}` : k + 1} | {todo.catalogName}</p>
        //                                     <span style={{ opacity: 1 }} className="Have" onClick={() => { this.jumpDetail(todo) }}>试看课程</span>
        //                                     {<span className="Have" onClick={() => { this.jumpDetail(todo) }}>试看课程</span>}
        //                                     {index != 0 || index == 0 && k > 2 ? <span className="App"></span> : ''}
        //                                 </li>
        //                             )
        //                         }

        //                     })}
        //                 </ul>
        //             </div>
        //         </div>
        //     )
        // }) : <div className="news-cont pic-air"><div><img src={require("../../../../assets/img/resource_center/empety.png")} alt='图片' /><span>数据为空</span></div></div>
        return (
            <>
                <div className="course_crumbs_wai">
                    <div className='crumbs-box'>
                        <div className='wrap-center crumbs-menu'>
                            您的位置：<span><Link to={`/resource-center/home`}>资源中心</Link><i> &gt; </i></span> <span><Link to="/resource-center/list">课程</Link> <i> &gt; </i></span> <span>课程浏览 <i></i></span>
                        </div>
                    </div>
                </div>
                <div className="product-service-details course-details">
                    <div className='course-details-bottom'>
                        <div className="wrap-center">
                            <div className='details-cont'>
                                <div className="cont-top">
                                    <div className="left">
                                        <span>
                                            {courseDetail.fileId && <img src={`${imgUrl}/api/pt/api/v1/media/showThumbnail/${courseDetail.fileId}`} alt='图片' />}
                                        </span>
                                    </div>
                                    <div className="right">
                                        <div className="top-title">
                                            <h3>{courseDetail.subjectName}</h3>
                                        </div>
                                        <div className="text over_3">
                                            {courseDetail.simpleIntroduce ? analysisTem(courseDetail.simpleIntroduce) : null}
                                        </div>
                                        <div className="spanc">学时：{courseDetail.period}</div>
                                        <div className="Button-pic">
                                            <Button type="primary" onClick={this.toTry}>免费试看</Button>
                                            <Button onClick={this.Consultation}>申请使用咨询</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="cont-bottom">
                                    <Row className="cont-bottom-main" type="flex" justify="space-between">
                                        <Col className="lefta">
                                            <Tabs activeKey={activeKey} onChange={this.callback.bind(this)}>
                                                <TabPane tab="课程介绍" key="1">
                                                </TabPane>
                                                <TabPane tab="课程目录" key="2">
                                                </TabPane>
                                            </Tabs>
                                            {
                                                activeKey === "1" ? Introductionpic : (activeKey === "2" ? <div className='list_cata'>{Cataloglist}<div className='none_box'></div></div> : "")
                                            }
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal className='Modal-butApplyuse'
                        visible={coverFlag}
                        destroyOnClose={true}
                        maskClosable={false}
                        onCancel={this.cancel}
                        closable={false}
                        footer={
                            null
                        }
                    >
                        <Applyuse closeModal={this.closeModal} />
                    </Modal>
                </div>
            </>
        );
    }
}

export default resourceDetail;
