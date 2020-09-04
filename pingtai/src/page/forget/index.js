import React, { Component } from 'react';
import { Form, Col, Row, Input,  Button, message } from 'antd';
import './index.scss';
import md5 from 'js-md5';
import {Link} from "react-router-dom";

class Forget extends Component {
  state = {

  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let { flag, time } = this.state;
    let suffix = <span className='get-code' onClick={this.sendCode}>{flag ? '获取验证码' : `2秒后重试`}</span>
    return (
        <div className="resetpass-box">
          <div className="login-top">
            <div className="width-main">
              <span className="logo"><Link to="/"><img className='img-password' src={require('../../assets/img/child-header-logo.png')} /></Link></span>
            </div>
          </div>

          <Row className='forget-pass'>
            <h2>重置密码</h2>
            <Form>
              <Form.Item>
                <Col span={5}>
                  <span style={{letterSpacing:"6px"}}>手机号</span>
                </Col>
                <Col span={12}>
                  {
                    getFieldDecorator('telNum', {
                      initialValue: '',
                      rules: [
                        {
                          pattern: /^1[3456789]\d{9}$/,
                          message: '请输入合法的手机号'
                        },
                        {
                          required: true,
                          message: '请填写手机号'
                        }
                      ]
                    })(<Input placeholder='请输入绑定的手机号' maxLength={11} />)
                  }
                </Col>
              </Form.Item>
              <Form.Item>
                <Col span={5}>
                  <span style={{letterSpacing:"6px"}}>验证码</span>
                </Col>
                <Col span={17}>
                  {
                    getFieldDecorator('verifyCode', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请填写验证码'
                        },
                        {
                          validator: (_, value, callBack) => {
                            if (value && value.length !== 6) {
                              callBack('验证码必须是6位');
                              return;
                            }
                            callBack();
                          }
                        }
                      ]
                    })(<Input type={this.state.inputverifyCode} suffix={suffix} placeholder='验证码' autocomplete='off'  maxLength={6}
                              onFocus={()=>{
                                this.setState({
                                  inputverifyCode:'text'
                                })
                              }}/>)
                  }
                </Col>
              </Form.Item>
              <Form.Item>
                <Col span={5}>
                  <span style={{letterSpacing:"6px"}}>新密码</span>
                </Col>
                <Col span={12}>
                  {
                    getFieldDecorator('passWordNew', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请输入新密码'
                        },
                        {
                          // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                          pattern: /^(?=.*[A-Za-z])[A-Za-z\d]{8,20}$/,
                          message: '密码输入不合法'
                        }
                      ]
                    })(<Input type={this.state.inputtypenew} maxLength={20}  onFocus={()=>{
                      this.setState({
                        inputtypenew:"password"
                      })
                      // console.log(this.state.inputtypenew,'NEW')
                    }} placeholder='请输入新密码' />)
                  }
                </Col>
              </Form.Item>
              <p className='rules' style={{position:'relative',top:"-10px"}}>（8-20位，包含字母、数字）</p>
              <Form.Item style={{position:'relative',top:'-7px'}}>
                <Col span={5}>
                  <span>确认密码</span>
                </Col>
                <Col span={12}>
                  {
                    getFieldDecorator('affPassWordNew', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请输入确认密码'
                        },
                        {
                          // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                          pattern: /^(?=.*[A-Za-z])[A-Za-z\d]{8,20}$/,
                          message: '密码输入不合法'
                        },
                        {
                          validator: (_, value, callBack) => {
                            if (value && value !== getFieldValue('passWordNew')) {
                              callBack('两次密码输入不一致');
                              return;
                            }
                            callBack();
                          }
                        }
                      ]
                    })(<Input type={this.state.inputtype} maxLength='20' onFocus={()=>{
                      this.setState({
                        inputtype:"password"
                      })
                      // console.log(this.state.inputtype,'CON')
                    }} placeholder='请输入确认密码' />)
                  }
                </Col>
              </Form.Item>
            </Form>
            <div className='footer-submit' ><Button onClick={this.submit} className='finsh-save'>确 定</Button></div>
          </Row>
          <div className="footer-forget">CopyRight©2020zjyve.com.All rights reserved <a target="_blank" href="http://www.beian.gov.cn/portal/index?token=320d0fad-67f3-4691-a1a4-60346951292e">
            京IC备案20020432号-3  </a> </div>
        </div>
    );
  }
}

Forget = Form.create()(Forget);
export default Forget;