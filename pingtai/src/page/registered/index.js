import React, { Component } from 'react';
import {Form} from 'antd';
import './index.scss';
import {Link} from "react-router-dom";
class Registered extends Component {
  state = {

  }

  render() {
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
        <div className="registered-main">
          <div className="login-top">
            <div className="width-main">
              <span className="logo"><Link to="/"><img className='img-password' src={require('../../assets/img/child-header-logo.png')} /></Link></span>
            </div>
          </div>
          <div className="registered-bottom">
            <div className="width-main">
              <div className='bottom-box'>
                <div className="box-pic">
                  <div className="img-left">
                    <img  src={require('../../assets/img/left-administrator.png')} />
                  </div>
                  <div className="main-login-wrap">
                    <h3>申请试用</h3>
                    <h4>平台暂未对外开放注册，院校和企业试用或者入驻，请与我们联系，我们将为您开通试用账号。</h4>
                    <p>电话：010-85952290</p>
                    <p>手机：18933804893（杨经理）</p>
                    <p>地址：北京市海淀区中关村北一街甲15号</p>

                    <span><Link to="/">返回平台</Link></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-p">CopyRight©2020zjyve.com.All rights reserved <a target="_blank" href="http://www.beian.gov.cn/portal/index?token=320d0fad-67f3-4691-a1a4-60346951292e">
              京IC备案20020432号-3  </a> </div>
          </div>
        </div>
    );
  }
}

Registered = Form.create()(Registered);
export default Registered;