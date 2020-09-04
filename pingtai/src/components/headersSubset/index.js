
import React, {Component} from 'react';
import './index.scss';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { Link } from "react-router-dom";
import {Tabs, Row, Col, Modal} from 'antd';
import routerList from '../../router/router_config'
import { imgUrl } from '@/config/secret.js'
import {Helmet} from "react-helmet";
@withRouter
 class Header extends Component {
    state = {
        menuList:[],
        pathName:'',
        fullName:'',
        portraitId:'',
        title:'',
        path:''
    };
    componentDidMount() {
        routerList.map((item,index)=>{
            if(this.props.match.path==item.path){
                this.setState({
                    menuList:item.children,
                    pathName:this.props.match.path+'_logo.png',
                    path:this.props.location.pathname
                },()=>{
                    this.state.menuList.map((item,index)=>{
                        if(this.props.location.pathname==item.path){
                            this.setState({
                                title:item.name
                            })
                        }
                    })
                })
            }
        })
        this.setState({
            fullName:localStorage.getItem("fullName")?localStorage.getItem("fullName"):"",
            portraitId:localStorage.getItem("portraitId")?localStorage.getItem("portraitId"):"",
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(this.state.path!=nextProps.location.pathname){
            routerList.map((item,index)=>{
                if(this.props.match.path==item.path){
                    this.setState({
                        menuList:item.children,
                        pathName:this.props.match.path+'_logo.png',
                        path:nextProps.location.pathname
                    },()=>{
                        this.state.menuList.map((item,index)=>{
                            if(this.props.location.pathname==item.path){
                                this.setState({
                                    title:item.name
                                })
                            }
                        })
                    })
                }
            })
        }

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
        const {menuList,pathName,fullName,portraitId,title}=this.state
        return (
            <div className='headerschoolspace'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            <div className='Common-content'>
                <div className='header-cont header-contindex'>
                    <div className='header-l'>
                        <Link to={menuList&&menuList[0]&&menuList[0].path}>
                            {pathName? <img className='header-logo' src={require(`../../assets/img${pathName}`)}/>:''}
                        </Link>

                        <ul className='header-menu'>
                            {menuList&&menuList.map((item,index)=>{
                                    return(
                                        !item.nameHide&& <Link key={index} onClick={()=>{
                                            if(item.name === "校本资源库"){
                                                window.open("/#/resource-center/home")
                                            }else{
                                                this.props.history.push(item.path)
                                            }
                                        }}>
                                            <li className={this.props.location.pathname==item.path?'active':''}>{item.name}</li>
                                        </Link>

                                    )
                            })}
                        </ul>
                    </div>

                <div className='header-right'>
                    <Link to={"/"} className="gobackmain">
                        返回平台首页
                    </Link>
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
