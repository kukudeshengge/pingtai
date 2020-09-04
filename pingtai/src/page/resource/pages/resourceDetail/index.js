/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { getDoc } from '@/api/media';
import { commonalityUrl } from '@/config/secret.js'

export default class index extends Component {
    state = {
        resourceData: {},
        iframeSrc: ''
    }
    //离开页面清除资源的数据
    componentWillUnmount() {
        // sessionStorage.removeItem('resourceData');
    }
    componentDidMount() {
        this.setSrc();
    }
    //设置资源data
    setSrc = () => {
        let resourceData = sessionStorage.resourceData ? JSON.parse(sessionStorage.resourceData) : '';
        console.log(window.location)
        // let url = process.env.NODE_ENV === 'development' ? 'http://train.cvei' :''
        if (resourceData) {
            this.setState({
                resourceData,
                iframeSrc: `${commonalityUrl}furl=https://train.cvei.cn${getDoc(resourceData.fileId)}`
            })
        }
    }
    render() {
        let { resourceData, iframeSrc } = this.state;
        console.log(resourceData)
        return (
            <div className='resource_container_wai'>
                <div className="resource_box">
                    <div className='crumbs-box'>
                        <div className='wrap-center crumbs-menu'>
                            <span> 您的位置：</span> <span><Link to={`/resource-center/home`}>资源中心</Link><i> &gt; </i></span> <span><Link to="/resource-center/system-standard">职教体系标准</Link> <i> &gt; </i></span> <span>资源浏览 <i></i></span>
                        </div>
                    </div>
                    <h2 className='resource_title'>{resourceData.fileName}</h2>
                    <div className="look_box">
                        <div className="show">
                            <iframe src={iframeSrc} frameborder="0"></iframe>
                        </div>
                        <div className="control">
                            <div className="left">
                                <span>
                                    <img src={require('@/assets/img/resource_center/icon-tea.png')} alt="图片" />
                                </span>
                                {/* <span>上传人所属机构：上传人姓名 丨 {resourceData.createTime} 更新</span> */}
                                <span>{resourceData.author} 丨 {resourceData.createTime} 更新</span>
                            </div>
                            <div className="right">
                                浏览量：{resourceData.browseNum}
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <ul>
                            {/* <li>
                                <span>作者：</span><span>张老师</span>
                            </li> */}
                            {/* <li>
                                <span>资源分类：</span><span>中秋特辑</span>
                            </li> */}
                            <li>
                                <span>职教分类：</span><span>{resourceData.stageName}/{resourceData.bigMajorName}{resourceData.medMajorName ? `/${resourceData.medMajorName}` : null}</span>
                            </li>
                            {/* <li>
                                <span>一句话介绍：</span><span>现在这场疫情危机给整个世界都带来了非常沉重的影响</span>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
