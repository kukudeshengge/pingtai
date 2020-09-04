import React, {Component} from 'react';
import './index.scss';
import {Link} from 'react-router-dom';

export default class Applyuse extends Component {
    state = {

    };
    componentDidMount() {

    }

    render() {
        // const {introduce, fileList, imageUrl, labelList, id, categoryList,categortKey} = this.state;
        return (
            <div className='Applyuse-main'>
                <div className="width-main">
                    <div className='bottom-box'>
                        <div className="box-pic">
                            <div className="img-left">
                                <img  src={require('@/assets/img/resource_center/left-administrator.png')} alt='图片' />
                            </div>
                            <div className="main-login-wrap">
                                <h3>申请使用</h3>
                                <h4>申请使用咨询，请与我们联系，我们将为您授权观看全部课程的功能。</h4>
                                <p>电话：010-85952290</p>
                                <p>手机：18933804893（杨经理）</p>
                                <p>地址：北京市海淀区中关村北一街甲15号</p>

                                <span className='pointer' onClick={this.props.closeModal}>返回</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

