import React, { Component } from 'react'
import './global.scss';
import Header from './header';
import { message } from 'antd';
import { isAttention, changeAttention } from '@/api/atade';





export default class headerTwo extends Component {
    state = {
        keep: false,
        data: sessionStorage['homeData'] ? JSON.parse(sessionStorage['homeData']) : '',
        type:'2'
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
    render() {
        const { keep, data } = this.state;
        return (
            <div className="two_heaer fiexed_top">
                <div className="two_top_wai">
                    <div className="two_top">
                        <h1>
                            <img style={{ width: '85px', height: '85px', borderRadius: '50%' }} src={data.logoFileId ? `https://ts.zjyve.com/public_resource/college/${data.logoFileId}` : ''} alt="" />
                        </h1>
                        <div className="center">
                            <h2>
                                <span>{data.schoolName}</span>
                                <span onClick={this.changeBtn}>{keep ? '取消关注' : '关注学校'}</span>
                            </h2>
                            <p>
                                {data && data.reamrk}
                            </p>
                        </div>
                        <div className="top_right">
                            {/* <span>
                                <input type="text" placeholder='请输入检搜内容' /><button>查 询</button>
                            </span> */}
                        </div>
                    </div>
                </div>
                <Header/>
            </div>
        )
    }
}
