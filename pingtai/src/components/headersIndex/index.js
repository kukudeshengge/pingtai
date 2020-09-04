import React, {Component} from 'react';
import './index.scss';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {Tabs, Row, Modal} from 'antd';
import routerList from '../../router/router_config'
import { imgUrl } from '@/config/secret.js'
import {Helmet} from "react-helmet";
const {TabPane} = Tabs;


@withRouter
class Header extends Component {
    state = {
        menuList: [{
            name: '首页'
        }, {
            name: '院校中心'
        }
        ],
        userInfo:'',
        fullName:'',
        portraitId:'',
        title:''
    };

    componentDidMount() {
        console.log("this.props.routers", this.props.match.path, routerList)
        this.setState({
            menuList:routerList,
            fullName:localStorage.getItem("fullName")?localStorage.getItem("fullName"):"",
            portraitId:localStorage.getItem("portraitId")?localStorage.getItem("portraitId"):"",
        },()=>{
            this.state.menuList.map((item,index)=>{
                if(this.props.match.path==item.path){
                    this.setState({
                        title:item.name
                    })
                }
            })
        })
    }
    //确定退出登录
    handleLogout = () => {
        // console.log(this.state.userInfo)
        Modal.confirm({
            title: '温馨提示',
            content: '确定要退出登录吗 ？',
            cancelText: "关闭",
            centered:true,
            className: "ModalConfirm-pic",
            okType: 'danger',
            onOk:() => this.logout()
        })
    };
    logout = () => {
        localStorage.removeItem("fullName");
        localStorage.removeItem("portraitId");
        localStorage.removeItem("OBS_token");
        window.location.reload();
    }
    render() {
        const {menuList,fullName,portraitId,title} = this.state
        return (
            <div className='headersIndex'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <div className="headersIndex-warpcenter">
                    <div className="headersIndex-warp">
                        <div className='header-top'>
                            <Link to={"/"}>
                                <img className='header-logo' src={require('../../assets/img/child-header-logo.png')}/>
                            </Link>
                            {/*<Link to={"/"}>*/}
                            {/*    <img className='icon-down' src={require('../../assets/img/icon-down.png')}/>*/}
                            {/*</Link>*/}
                        </div>
                        <div className='header-cont header-contpage'>
                            <ul className='header-menu' onChange={this.callback}>
                                {/*  <Link to={'/'}>
                                <li className='badeg'>院校中心</li>
                            </Link>*/}
                                {menuList&&menuList.map((item,index)=>{
                                    console.log("item.pathitem.pathitem.path",item.path)
                                    return(
                                        index>0&&!item.nameHide&& <Link key={index}  target={item.children&&!item.blank&&"_blank"} to={item.children?item.children[0]&&item.children[0].path:item.path}>
                                            <li className={item.ifShowTipImg?'badeg':this.props.match.path==item.path?'badegred':''}>{item.name}</li>
                                        </Link>

                                    )
                                })}
                            </ul>
                            {fullName? <span className="a-last">
                          <span  className={` humanName`}>
                              {fullName}
                          </span>
                          <i className="img">
                                <img  src={portraitId?`${imgUrl}/api/pt/api/v1/media/showThumbnail/${portraitId}`:require("../../assets/img/gr-active.png")}  />
                              </i>
                          <span  onClick={this.handleLogout} className={` loginout`}>
                              退出
                          </span>
                      </span>:
                                <div className="right-text">
                                    <Link to={"/login"} className='reg-btn login-btn'>
                                        登录
                                    </Link>
                                    <Link className='reg-btn' to={"/registered"}>
                                        注册
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
