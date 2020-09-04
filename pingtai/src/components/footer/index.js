
import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
/*import { AAA} from '@store/OBS/footer/action'*/
import { Button, Row,Col, } from 'antd';
import {Link} from "react-router-dom";



export default class Footer extends React.Component {np
    componentDidMount() {
        this.setBody()
    }

    onLink=(val)=>{
        if(val==1){
            window.open("http://www.moe.gov.cn/");
        } if(val==2) {
            window.open("http://www.moe.gov.cn/s78/A07/index.html");
        }
        if(val==3) {
            window.open("https://www.ndrc.gov.cn/");
        }else {
            window.open("http://www.miit.gov.cn/");
        }

    }
    setBody(){
        var ifMobile=this.ismobile()
        var _this=this;
        // console.log("ifMobileifMobileifMobileifMobile")
        if(ifMobile == true) {
            let meta = document.createElement('meta');
            let content=""

            _this.presentFloat = true;
            // console.log(" document.body.style.width ",  document.getElementsByTagName("body")[0])
            document.getElementsByTagName("body")[0].style.width ="1300px"
            var phoneWidth = parseInt(window.screen.width);
            // console.log("phoneWidth",phoneWidth)
            // var phoneHeight = parseInt(window.screen.height);
            var phoneScale = phoneWidth / 1300; //除以的值按手机的物理分辨率					console.log('phoneScale',phoneScale)
            var ua = navigator.userAgent;
            if(/Android (\d+\.\d+)/.test(ua)) {
                var version = parseFloat(RegExp.$1);
                // console.log("Android")
                // andriod 2.3
                if (version > 2.3) {
                    content='width=device-width,initial-scale='+phoneScale+',minimum-scale='+phoneScale+',maximum-scale='+phoneScale+',user-scalable=no'
                    // andriod 2.3以上
                } else {
                    content='width=device-width,user-scalable=no'
                }
            } else {//console.log("ios")
                content='width=device-width, initial-scale=' + phoneScale + ',minimum-scale=' + phoneScale + ',maximum-scale =' + phoneScale + ',user-scalable=no'
            }
            meta.content=content;
            meta.name="viewport";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
    }
    ismobile() {
        var mobileArry = ["iPhone", "iPad", "Android", "Windows Phone", "BB10; Touch", "BB10; Touch", "PlayBook", "Nokia"];
        var ua = navigator.userAgent;
        var res = mobileArry.filter(function(arr) {
            return ua.indexOf(arr) > 0;
        });
        return res.length > 0;
    }
    render() {
        return (
            <div className="footer-wrap">
                <div className="Common-content">
                    <Row >
                        <Col span={7}>
                            <img
                                className="footer-logo-img"
                                src={require('../../assets/img/footer_logo.png')}
                                alt="logo"
                            />
                            <p className="footer-common-information">中教云迪数字科技有限公司</p>
                            <p className="footer-common-information">电话：010-85952290</p>
                            <p className="footer-common-information">地址：北京市海淀区中关村北一街甲15号</p>
                            <p className="footer-number">CopyRight©2020 zjyve.com  <a target="_blank" href="http://www.beian.gov.cn/portal/index?token=320d0fad-67f3-4691-a1a4-60346951292e">
                                京IC备案20020432号-3  </a></p>
                        </Col>
                        <Col span={5}>
                            <h3 className="footer-common-tit">应用解决方案</h3>
                            <div className="footer-common-mt20">
                                <Link to={"/schoolspace/vocational"}  className="footer-common-desc">院校中心</Link>
                                <Link to={"/train-space/smartTrain"} className="footer-common-desc">实训中心</Link>
                                <Link to={"/resource-center/home"} className="footer-common-desc">资源中心</Link>
                                <Link to={"/certificate/certificatehome"} className="footer-common-desc">证书中心</Link>
                            </div>
                        </Col>
                        <Col span={5}>
                            <h3 className="footer-common-tit">整体解决方案</h3>
                            <div className="footer-common-mt20">
                                <Link to={"/educationaldata"} className="footer-common-desc">教育大数据解决方案</Link>
                                <Link to={"/educationa"} className="footer-common-desc">智慧教育解决方案</Link>
                                <Link to={"/lifelong"} className="footer-common-desc">终身学习档案</Link>
                                <Link to={"/lifetime"} className="footer-common-desc">终身发展档案</Link>
                            </div>
                        </Col>
                        <Col span={5}>
                            <h3 className="footer-common-tit">友情链接</h3>
                            <div className="footer-common-mt20">
                                <p className="footer-common-desc" onClick={()=>this.onLink(1)}>教育部</p>
                                <p className="footer-common-desc" onClick={()=>this.onLink(2)}>职业教育与成人教育司</p>
                                <p className="footer-common-desc" onClick={()=>this.onLink(3)}>国家发展和改革委员会</p>
                                <p className="footer-common-desc" onClick={()=>this.onLink(4)}>工业与信息化部</p>
                            </div>
                        </Col>
                        <Col span={2}  style={{textAlign: 'center'}}>
                            <h3 className="footer-common-tit">关注我们</h3>
                            <div className="footer-common-mt20">
                                <img
                                    className="footer-code-img"
                                    src={require('../../assets/img/footer_code.png')}
                                    alt="二维码图片"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
