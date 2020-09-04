import React, {Component} from 'react';
import './index.scss';
import {Link} from 'react-router-dom';

export default class Application extends Component {
    state = {

    };
    componentDidMount() {

    }

    render() {
        // const {introduce, fileList, imageUrl, labelList, id, categoryList,categortKey} = this.state;
        return (
            <div className='Application'>
                <div className="width-main">
                    <div className='bottom-box'>
                        <div className="box-pic">
                            <div className="img-left">
                                <img  src={require('@/assets/img/resource_center/left-administrator.png')} alt='图片' />
                            </div>
                            <div className="main-login-wrap">
                                <h3>立即加入</h3>
                                <h4>立即加入中教云企业赋能体系，共同推动产教融合发展，请联系我们</h4>
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

