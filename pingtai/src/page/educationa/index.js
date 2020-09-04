
import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import {Button, Col,Row} from 'antd';
import RouteView from '@/router/router_view';
import Header from '../../components/headersIndex'
import  Footer from '../../components/footer'


// const mapStateToProps = ({EDUCATION}) => {
//     return {
//
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//
//     };
// }

export default class Educationb extends React.Component {
    state={
        contentData:[
            {
                title:"智慧课堂",
                english:"Wisdom classroom",
                desc:"GPS签到、备课、直播教学、录播教学、混合教学、实时互动、互动答题、投票问卷、课堂报告、多样作业、自动批阅",
            },
            {
                title:"智慧学习",
                english:"wisdom learning",
                desc:"协作式学习、自驱动学习、个性化学习、进度追踪、学情分析、定制专属学习计划",
            },
            {
                title:"智慧考评",
                english:"wisdom evaluation",
                desc:"一课一案、模式设置、全程监控、多种提醒、自动组卷、智能评阅、线上考试、线下考试、混合考试、电子存档、成绩统计、智能分析、考情画像",
            },
            {
                title:"终身学习档案",
                english:"Learning files",
                desc:"360度学情跟踪、全方位的评价模型和分析模型、教师终身学习档案、学生终身学习档案。",
            },
            {
                title:"智慧管理",
                english:"Wisdom management",
                desc:"实现环境、资源、应用的智慧管理，实现教育过程的全面信息化",
            },
            {
                title:"大数据分析",
                english:"Big data analysis",
                desc:"丰富的基础数据、教学数据、行为数据，多维度院校数据、专业数据、教师数据、学生数据，多角度（专业、教师、学生）精准画像",
            },
            {
                title:"职教圈子",
                english:"Vocational education circles",
                desc:"校校互通、师师互通、生生互通、师生互通、学习交流、问答社区、兴趣圈子、活动讨论，共建泛在学习环境的圈子文化",
            },
            {
                title:"资源中心",
                english:"Resource center",
                desc:"国家级资源、省级资源、校级资源、资深企业资源、优质内容供应者的资源、校本资源库、开放资源库、资源审核机制、精准资源订阅与推荐",
            },
            {
                title:"实训基地",
                english:"Practice base",
                desc:"个性化实训基地、统筹实训管理、统筹资源下发、综合智能评价，实现基地的智慧管控",
            },
        ]
    }
    render() {
        return (
            <div className='resource_main'>
                <div className="resource_header" style={{height:"65px"}}>
                    <Header/>
                </div>
                <div className="resource_container">
                    <div className="wisdom-wrap">
                        <div className="banner-box">
                            <img src={require("../../assets/img/school_space/wisdom-banner.png")}
                                 className="banner-img"/>
                            <div className="banner-position Common-content">
                                <p className="banner-desc">College Online</p>
                                <p className="banner-tit">构建职业教育数字校园</p>
                                <p className="banner-english">打造现代教育信息化服务体系</p>
                            </div>
                        </div>

                        <div className="wisdom-content">
                            <div className="wisdom-why">
                                <div className="Common-content">
                                    <h3 className="wisdom-why-tit">职业教育云平台</h3>
                                    <p className="wisdom-desc">服务于现代化教育体系，基于大数据、人工智能和区块链技术，为职业院校建设一体化的数字校园平台。</p>
                                    <p className="wisdom-desc">职业教育云平台打通学校与学校、学校与企业、企业与企业之间的壁垒，开通院校空间、教师空间、学生空间、企业空间的量身定制式空间服务，实现多维度、<br/>强连接的互融互通。建设优质的校企圈子体系，形成管理者、教师、学生的终身学习/进修机制和终身档案机制，为企业和社会提供精准推荐的技能型人才供给，<br/>逐渐构成未来职业教育理想形态。</p>
                                    <div className="desc-img-box">
                                        <img src={require("../../assets/img/school_space/wisdom-desc-img.svg")}/>
                                    </div>
                                </div>
                            </div>
                            <div className="wisdom-space">
                                <div className="Common-content">
                                    <h3 className="wisdom-why-tit">云端院校 专属空间</h3>
                                    <p className="wisdom-space-desc">打造互联网+教育环境下的新教学模式，实现多端实时同步的教学形式，重塑课堂+学习+考试+评价+管理</p>
                                    <Row className="wisdom-space-box">
                                        {
                                            this.state.contentData&&this.state.contentData.map((item,index)=>{
                                                return (
                                                    <Col span={8}>
                                                        <div className="wisdom-space-item" key={index}>
                                                            <img src={require(`../../assets/img/school_space/wisdom${index + 1}.png`)} className="wisdom-space-bg"/>
                                                            <p className="space-img-bg"></p>
                                                            <div className="space-cont">
                                                                <img src={require(`../../assets/img/school_space/wisdom-icon${index + 1}.png`)} className="space-icon"/>
                                                                <p className="space-tit">{item.title}</p>
                                                                <p className="space-desc">{item.english}</p>
                                                            </div>
                                                            <div className="shade-box">
                                                                <div className="shade-cont">
                                                                    <p className="shade-tit">{item.title}</p>
                                                                    <p className="shade-desc">{item.english}</p>
                                                                    <p className="shade-text">{item.desc}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>
                                <div className="img-box">
                                    <img src={require("../../assets/img/school_space/wisdom10.png")}/>
                                    <img src={require("../../assets/img/school_space/wisdom11.png")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="resource_footer">
                    <Footer/>
                </div>
            </div>
        )
    }
}
