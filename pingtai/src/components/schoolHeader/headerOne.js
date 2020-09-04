import React, { Component } from 'react';
import './global.scss';
import Header from './header';
import { withRouter } from 'react-router-dom';
import { message, Modal } from 'antd';
import { isAttention, changeAttention } from '@/api/atade';
import { imgUrl } from '@/config/secret.js'

@withRouter
class headerOne extends Component {
    state = {
        keep: false,
        data: sessionStorage['homeData'] ? JSON.parse(sessionStorage['homeData']) : ''
    }
    changeBtn = () => {
        if (localStorage['OBS_token']) {
            const { data } = this.state;
            changeAttention(
                {
                    schoolCode: data['schoolCode'],
                    schoolName: data['schoolName']
                }
            ).then(res => {
                if (Object.prototype.toString.call(res) === '[object Object]') {
                    this.setState({ keep: res.result });
                    res.result ? message.success('关注成功') : message.success('取消关注成功')
                } else {
                    this.setState({ keep: res });
                    res ? message.success('关注成功') : message.success('取消关注成功')
                }
            })
        } else {
            message.warning('未登录用户无法访问本校系统');
        }
    }
    componentDidMount() {
        this.isAttention();
    }
    isAttention = () => {
        const { data } = this.state;
        data && isAttention({ schoolCode: data['schoolCode'] }).then(res => {
            if (Object.prototype.toString.call(res) === '[object Object]') {
                this.setState({ keep: res.result });
            } else {
                this.setState({ keep: res });
            }
        })
    }
    //确定退出登录
    handleLogout = () => {
        // console.log(this.state.userInfo)
        Modal.confirm({
            title: '温馨提示',
            content: '确定要退出登录吗 ？',
            cancelText: "关闭",
            centered: true,
            className: "ModalConfirm-pic",
            okType: 'danger',
            onOk: () => this.logout()
        })
    };
    logout = () => {
        localStorage.removeItem("fullName");
        localStorage.removeItem("portraitId");
        localStorage.removeItem("OBS_token");
        window.location.reload();
    }
    render() {
        const { keep, data } = this.state;
        const fullName = localStorage['fullName'];
        let portraitId = localStorage['portraitId']
        return (
            <div className="one_header_wai">
                <div className="one_header">
                    <div className="fiexed_top">
                        <div className="one_top_wai">
                            <div className="one_top">
                                <div className="left">
                                    <span>欢迎访问{data.schoolName}</span>
                                    <span onClick={this.changeBtn}>{keep ? '取消关注' : '关注学校'}</span>
                                </div>
                                <div className="right">


                                    {fullName ? <span className="a-last">
                                        <span className={` humanName`}>
                                            {fullName}
                                        </span>
                                        <i className="img">
                                            <img src={portraitId ? `${imgUrl}/api/pt/api/v1/media/showThumbnail/${portraitId}` : require("../../assets/img/gr-active.png")} />
                                        </i>
                                        <span onClick={this.handleLogout} className={` loginout`}>
                                            退出
                          </span>
                                    </span> :
                                        <div className="right-text">
                                            <span style={{ color: '#fff' }} onClick={() => this.props.history.push('/login')}>登录</span>
                                            <span style={{ color: '#fff' }} onClick={() => this.props.history.push('/registered')}>注册</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <Header logo={true} />
                    </div>
                    {/* banner */}
                    <div className="banner_w">
                        <dl className="banner">
                            <dt>
                                <h2>建设专属院校空间</h2>
                                <p>量身定制一体化职教解决方案</p>
                            </dt>
                            <dd>
                                <img
                                    alt=""
                                    src={require("@/assets/img/acade/banner_img.png")}
                                />
                            </dd>
                        </dl>
                    </div>
                    {/* banner */}
                </div>
            </div>
        )
    }
}

export default headerOne;