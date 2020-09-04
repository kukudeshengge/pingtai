/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-mixed-operators */
/*eslint eqeqeq: ["off", "smart"]*/
import React, { Component } from 'react';
import { Tree, Button, Modal, Empty } from 'antd';
import './index.scss';
import { Link } from "react-router-dom";
import { commonalityUrl, turningSupportedArr, previewUrl, resource_preview } from '@/config/secret.js';
import Validate from "@/until/libs";
import Applyuse from "@/components/applyuse/applyuse.js";
import { getCaltalog } from '@/api/resource/course-detail.js';
import { getDoc } from '@/api/media';
import { imgUrl } from '@/config/secret.js';

const { TreeNode } = Tree;
let noneArr = [1, 4, 6];


class NewsDetails extends Component {
    state = {
        courseChapter: [],
        epsId: localStorage.getItem("epsId"),
        visible: false,
        coverFlag: false,
        mediaType: 0,
        fileId: '',
        duration: 1,
        studyProgressSecond: 1,
        progress: 0,
        catalogId: '',
        resourceId: '',
        enterTime: null,
        jsonparam: '',
        resourceName: '',
        courseTree: [],
        defaultCheck: "",
        courseName: ''
    };
    componentWillUnmount() {
        sessionStorage.removeItem('active');
        sessionStorage.removeItem('catalog');
    }
    getCaltalog = () => {
        if (sessionStorage['resourceDetail_id']) {
            getCaltalog({ id: sessionStorage['resourceDetail_id'] }).then(res => {
                console.log(res)
                let catalog = sessionStorage.catalog ? JSON.parse(sessionStorage.catalog) : '';
                if (catalog && res) {
                    this.setState({
                        defaultCheck: catalog.fileId,
                        mediaType: catalog.mediaType,
                        resourceId: catalog.fileId,
                        fileId: catalog.fileId,
                        courseTree: res.bookCatalogVoList,
                        courseName: res.bookCatalogVoList[0].catalogName
                    }, () => {
                        this.getFileUrl();
                    })
                    //     let key = sessionStorage.active;
                    //     res.bookCatalogVoList[0].children.map(v => {
                    //         if (v.id === key) {
                    //             if (v.children.length) {
                    //                 let c = v.children;
                    //                 console.log(c)
                    //                 if (c.length && c[0].courseCenterResourceVoList[0]) {
                    //                     this.setState({
                    //                         defaultCheck: c[0].courseCenterResourceVoList[0].fileId,
                    //                         mediaType: c[0].courseCenterResourceVoList[0].mediaType,
                    //                         resourceId: c[0].courseCenterResourceVoList[0].mediaType,
                    //                         fileId: c[0].courseCenterResourceVoList[0].fileId,
                    //                     }, () => {
                    //                         this.getFileUrl();
                    //                     })
                    //                 }
                    //             }
                    //         }
                    //     })
                    // } else {
                    // let b = res.bookCatalogVoList[0].children.map(item => {
                    //     console.log(item)
                    //     let a = item.children.filter(i => {
                    //         return i.courseCenterResourceVoList.length > 0
                    //     })
                    //     return a
                    // })
                    // if (b && b.length) {
                    //     this.setState({
                    //         defaultCheck: b[0][0].courseCenterResourceVoList[0].fileId,
                    //         mediaType: b[0][0].courseCenterResourceVoList[0].mediaType,
                    //         resourceId: b[0][0].courseCenterResourceVoList[0].mediaType,
                    //         fileId: b[0][0].courseCenterResourceVoList[0].fileId,
                    //     }, () => {
                    //         this.getFileUrl();
                    //     })
                    // }
                } else {
                    if (res) {
                        let b = res.bookCatalogVoList[0].children.map(item => {
                            let a = item.children.filter(i => {
                                return i.courseCenterResourceVoList.length > 0
                            })
                            return a
                        })
                        if (b && b.length) {
                            this.setState({
                                defaultCheck: b[0][0].courseCenterResourceVoList[0].fileId,
                                mediaType: b[0][0].courseCenterResourceVoList[0].mediaType,
                                resourceId: b[0][0].courseCenterResourceVoList[0].mediaType,
                                fileId: b[0][0].courseCenterResourceVoList[0].fileId,
                                courseTree: res.bookCatalogVoList,
                                courseName: res.bookCatalogVoList[0].catalogName
                            }, () => {
                                this.getFileUrl();
                            })
                        }
                    }
                }
            })
        }
    }
    componentDidMount() {
        const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : ""
        this.setState({
            userId: userInfo.id
        })
        this.getCaltalog();
    }
    // async getResourceLearning() {
    //     if (this.state.userId && this.state.duration !== null) {
    //         const getResourceLearningDetial = await getResourceLearning({ resourceId: this.state.resourceId, studentId: this.state.userId })
    //         this.setState({
    //             progress: getResourceLearningDetial.studyProgressSecond ? getResourceLearningDetial.studyProgressSecond : 0,
    //         })
    //     }
    //     this.getFileUrl()
    // }
    // recordLearningRate() {
    //     console.log("this.state.resourceId6666666", this.state.resourceId)
    //     if (this.state.resourceId) {
    //         if (this.state.mediaType === 1 || this.state.mediaType === 8) {
    //             this.state.studyProgressSecond = 1
    //             this.state.duration = 1
    //         } else if (this.state.mediaType === 4 || this.state.mediaType === 5) {
    //             let player = document.getElementById('previewVideo')
    //             if (player) {
    //                 this.state.studyProgressSecond = Math.floor(player.currentTime)
    //                 this.state.duration = Math.floor(player.duration)
    //             }
    //         }
    //         if (this.state.studyProgressSecond > 0) {
    //             console.log("88888888")
    //             const leaveTime = new Date().getTime();
    //             this.state.studySumSecond = leaveTime - this.state.enterTime
    //             recordLearningRate({
    //                 courseId: this.state.filePath,
    //                 catalogId: this.state.catalogId,
    //                 duration: this.state.duration ? this.state.duration : 1,
    //                 mediaType: this.state.mediaType,
    //                 resourceId: this.state.resourceId,
    //                 studyProgressSecond: this.state.studyProgressSecond,
    //                 studySumSecond: Math.ceil(this.state.studySumSecond / 1000)
    //             }).then((e) => {
    //                 if (e == "操作成功") {
    //                     this.getResourceLearning()
    //                 }
    //                 console.log("===============", e)

    //             })
    //         }
    //     }
    // }
    cancel = e => {
        this.setState({ coverFlag: false, id: '', categoryName: '' });
    }
    //设置资源
    getFileUrl() {
        let screenHeight = document.documentElement.clientHeight - 220
        const { mediaType, fileId, resourceName, content, progress, isTxt, filePath, resourceDetail } = this.state;
        if (mediaType === 5 || mediaType === 4) {       //音视频
            let player = document.getElementById("previewVideo");
            if (player) {
                player.src = `${resource_preview}/${fileId}`;
                player.currentTime = progress;
                player.play();
            }
            /*   player.currentTime = this.state.progress;*/
        } else if (mediaType === 9) {
            let iframe = document.createElement("iframe");
            let parmas = {
                resourceName: resourceName,
                content: content,
            };
            iframe.src = `/#/student/safety-check?${encodeURI(JSON.stringify(parmas))}`;
            iframe.width = "100%";
            iframe.height = screenHeight + "px";
            iframe.parmas = parmas;
            document.getElementById("previewIframe").appendChild(iframe);
        } else if (
            mediaType === 1 ||
            mediaType === 8
        ) {
            let iframeSrc = `${commonalityUrl}&furl=${previewUrl}/api/media/api/v1/media/download/${fileId}`;
            let iframe = document.createElement("iframe");
            iframe.src = iframeSrc;
            iframe.width = "100%";
            iframe.id = "iframeId";
            iframe.height = screenHeight + "px";
            if (document.getElementById("previewIframe")) {
                document.getElementById("previewIframe").innerHTML = ""
            }
            if (
                !Validate.isEmpty(iframe) &&
                !Validate.isEmpty(document.getElementById("previewIframe"))
            ) {
                document.getElementById("previewIframe").appendChild(iframe);
                var obj = document.getElementById("iframeId").contentWindow;
                var ifmObj = obj.document.body;
                if (resourceName) {
                    let splitTxt = resourceName.split('.')
                    let splitTxtLeng = splitTxt.length - 1
                    let txt = splitTxt && splitTxt.length > 0 ? splitTxt[splitTxtLeng] : "";
                    if (turningSupportedArr.indexOf(txt) !== -1) {
                        document.getElementById('previewIframe').style.background = "#ffffff";
                    } else if (txt == 'pdf') {
                        document.getElementById('previewIframe').style.background = "#E6E6E6";
                    }
                }
            }
        } else if (mediaType === 99) {
            let iframe = document.createElement("iframe");

            let parmas = {
                resourceName: resourceName,
                content: content,
                fileId: fileId,
            };
            iframe.src = `/#/student/safety-down?${encodeURI(JSON.stringify(parmas))}`;
            iframe.width = "100%";
            iframe.height = screenHeight + "px";
            iframe.parmas = parmas;
            document.getElementById("previewIframe").appendChild(iframe);
        }
    }
    closeModal = () => {
        this.setState({ coverFlag: false });
    }
    //资源切换
    getCutOne = (v) => {
        this.setState({
            mediaType: v.mediaType,
            resourceId: v.fileId,
            fileId: v.fileId,
            defaultCheck: v.fileId
        }, () => {
            this.getFileUrl();
        })
        let el = document.querySelector('#previewIframe');
        if(el){
            el.innerHTML='';
        }
    }
    render() {
        let { coverFlag, mediaType, fileId, defaultCheck, resourceId, courseTree, resourceName, courseName } = this.state;
        let userMark ='';
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
        return (
            <div className="preview">
                <div className='crumbs-box'>
                    <div className='wrap-center crumbs-menu'>
                        <span>您的位置：</span><span><Link to={`/resource-center/home`}>资源中心</Link><i> &gt; </i></span> <span><Link to="/resource-center/list">课程</Link> <i> &gt; </i></span> <span><Link to="/resource-center/courseDetail">{courseName}</Link> <i> &gt; </i></span> <span>课程浏览 <i></i></span>
                    </div>
                </div>
                <div className="preview-box">
                    {resourceId ? <div className="left">
                        {mediaType === 5 ? (
                            <video
                                style={{ width: "100%" }}
                                id="previewVideo"
                                src=""
                                controls="controls"
                                controlsList="nodownload"
                            ></video>
                        ) : mediaType === 4 ? (
                            <div className="audio-flex">
                                <audio
                                    id="previewVideo"
                                    src=""
                                    controls="controls"
                                    controlsList="nodownload"
                                    className="preview_audio"
                                ></audio>
                            </div>
                        ) : mediaType === 6 ? (
                            <div className="pic_img">
                                {resourceName ? <embed style={{ width: "100%" }}
                                    src={`/api/media/api/v1/media/showThumbnail/${fileId}`}
                                /> : ""}
                                {" "}
                            </div>
                        ) : mediaType === 3 ? (
                            <div className="pic_img">
                                <img
                                    src={`${imgUrl}/api/media/api/v1/media/showThumbnail/${fileId}`}
                                    onClick={() => {
                                        // this.fullScreen();
                                        this.setState({ imgFlag: true })
                                    }}
                                    alt=""
                                    className="preview_img"
                                />{" "}
                            </div>
                        ) : (
                                            <div
                                                id="previewIframe"
                                                style={{ "background": "#ffffff" }}
                                            ></div>
                                        )}{" "}
                    </div> : <div className="left" style={{ "background": "#ffffff" }}><Empty description={false} /></div>}

                    <div className="right">
                        <div className="top-title">
                            课程目录
                        </div>
                        <div className="right-con">

                            {courseTree && courseTree.length > 0 ? (
                                <Tree defaultExpandAll selectedKeys={[defaultCheck]}>{loop(courseTree)}</Tree>
                            ) : null}
                            <div className="none-box"></div>
                        </div>
                        <Button className="consult-btn" onClick={() => this.setState({ coverFlag: true })}>
                            申请使用咨询
                        </Button>
                    </div>
                </div>
                <Modal className='Modal-butApplyuse' visible={coverFlag} destroyOnClose={true} maskClosable={false}
                    onCancel={this.cancel}
                    centered={true}
                    closable={false}
                    footer={
                        null
                    }
                >
                    <Applyuse closeModal={this.closeModal} />
                </Modal>
            </div>
        );
    }
}

export default NewsDetails;
