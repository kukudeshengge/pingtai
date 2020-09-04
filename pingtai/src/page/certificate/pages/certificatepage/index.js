import React from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {Button, Col} from 'antd';
import {queryDetail} from "@/api/certificate";
import {  Link } from 'react-router-dom';


export default class Certificatepage extends React.Component {
    state = {
        querypage: ''
    }

    componentDidMount() {
        const data = this.props.location.search; //地址栏截取
        const param = data.split("?")[1];
        if (param) {
            const codeParam = param.includes("%") ? decodeURI(param) : param;
            const jsonparam = JSON.parse(codeParam);
            console.log("jsonparam",jsonparam)
            this.queryDetailpage(jsonparam.certName)
        }
    }


    queryDetailpage = async (certName) => {
        let querypage = await queryDetail({certCode:certName});
        console.log("querypage",querypage)
        this.setState({
            querypage,
        },()=>{
            console.log("querypage",querypage.初级)
        })
    }

    render() {
        const {querypage} = this.state;
        return (
            <div className='Certificatepage'>
                <div className='Certificatepage-banner zsdetails-banner'>
                    <div className='Common-content'>
                        <h2 className='detail-banner-name'>证书中心
                        </h2>
                        <p className='crumbs-menu zsdetails-ment'><Link to="/certificate/certificatehome">首页</Link> / <Link to="/certificate/certificatecenter">证书中心</Link> / 证书详情页</p>
                    </div>
                </div>
                <div className='details-cont Common-content'>
                    {/*list start*/}
                    {Object.keys(querypage).map((key) =>{
                        console.log("querypage[key]",querypage[key])
                        return(
                            querypage[key].map((item,index)=>{
                                console.log("item",item)
                                return(
                                    <div className='certificatepage-list'>
                                        <h2 className='details-cont-tit'>
                                            {item.certName}{item.certGrade}
                                        </h2>
                                        <dl className='details-cont-list'>
                                            <dt className='details-cont-name'>颁证机构：</dt>
                                            <dd className='details-cont-info'>{item.certOrg}</dd>
                                        </dl>
                                        <dl className='details-cont-list'>
                                            <dt className='details-cont-name'>证书简介：</dt>
                                            <dd className='details-cont-info'>{item.certRemark}</dd>
                                        </dl>
                                        <dl className='details-cont-list'>
                                            <dt className='details-cont-name'>适用人群：</dt>
                                            <dd className='details-cont-info'> {item.usePerson}
                                            </dd>
                                        </dl>
                                        <dl className='details-cont-list'>
                                            <dt className='details-cont-name'>取证要求：</dt>
                                            <dd className='details-cont-info'>
                                                {item.obtainRequire}
                                            </dd>
                                        </dl>
                                    </div>
                                )
                            })
                        )
                    })
                    }

                </div>
            </div>
        )
    }
}

