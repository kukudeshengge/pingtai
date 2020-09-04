import React from 'react';
import {Col, Row, Pagination, Empty} from 'antd';
import './index.scss';
import Header from '../../components/headersIndex'
import Footer from "../../components/footer";

export default class Educationaldata extends React.Component {
    render() {
        return (
            <div className='resource_main'>
                <div className="" style={{height: "66px"}}>
                    <Header/>
                </div>
                <div className="education-information-wrap">
                    <div className="banner-box">
                        <img src={require("../../assets/img/educationdata/education_banner.png")} className="banner-img"/>
                        <div className="banner-position Common-content">
                            <p className="banner-desc">information</p>
                            <p className="banner-tit">全场景数据智能化</p>
                            <p className="banner-english">打破数据孤岛，实现优质数据互联互通，激活数据共享价值，<br/>激发人工智能在教育教学领域更大潜能和应用<br/> 从数据采集，存储建模，到数据分析展示的一体化解决方<br/>案，帮助学校构建大数据中心</p>
                        </div>
                    </div>
                    <div className="information-scheme-box Common-contentwap" >
                        <Row className="scheme-box">
                            <Col span={10}>
                                <p className="left-tit">
                                    <span>教育大数据平台</span>
                                    <span>综合解决方案</span>
                                    <span
                                        className="tit-english">Comprehensive solution of education big data platform</span>
                                </p>
                            </Col>
                            <Col span={14}>
                                <p className="scheme-desc">基于云计算、大数据、人工智能、区块链技术，通过5G+互联网+云的方式，通过两层中台+微服务架构模式，为省市及院校提供教育大数据服务。</p>
                                <p className="scheme-desc">形成教育大数据资产、教学诊改大数据、管理决策大数据、学生画像大数据、学业预警大数据、个性化推荐大数据、多维度运行报告和数据报告，实现全面科学的教学质量监控与评估。</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="information-two ">
                        <div   className="Common-contentwap">
                            <Row className=" information-list" >
                                <Col span={10}>
                                    <h3 className="two-common-tit">沉淀：教育大数据资产</h3>
                                    <p className="two-common-desc">将教学、实训、管理等系统实现全过程常态化应用和沉淀，将教师、学生、管理者产生的大量数据汇聚，其中重要场景的教学环节将涵盖课前、课中、课后教学全过程多个环节的多维教育大数据，进而形成学校的数据基础和优质的教学数据资产。</p>
                                </Col>
                                <Col span={14}>
                                    <div className='two-right'>
                                        <img src={require("../../assets/img/educationdata/education2.png")} className="two-common-img"/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className=" information-list">

                                <Col span={11}>
                                    <h3 className="two-common-tit">精准：教育质量监测与诊断</h3>
                                    <p className="two-common-desc">对多维度数据进行多视角统计、分析、挖掘和预测，对空间、时间、内容的数据形成具有针对性的分析报告，为教育管理者、教师、学生多角色提供个性化分析数据，把数据的价值最大化，满足不同层面的数据服务需求，通过对数据的分析，促进教学不断完善，实现全面科学的教学质量监控与评估。</p>
                                </Col>
                                <Col span={13}>
                                    <div className='two-right'>
                                        <img src={require("../../assets/img/educationdata/education3.png")} className="two-tv-img"/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="title-on">
                        <div>
                            <h3>典型应用场景</h3>
                            <span>纵深，精耕，覆盖教育的全场景解决方案</span>
                        </div>
                    </div>
                    <div className="information-scene">
                        <div  className="Common-contentwap">
                            <Row>
                                <Col span={24} className="scene-item">
                                    <div className="scene-left">
                                        <h3 className="scene-tit">助力管理者/专业数据画像</h3>
                                        <p className="scene-desc">助力管理者/专业数据画像，助力管理者决策
                                            为管理者提供驾驶舱看板以及各维度数据的可视化呈现。
                                            收集，汇聚形成完整的教育大数据体系，构建多层次动态评估指标体系，进行数据挖掘，分析，实施标准化，精细化，智能化的教育管理，实现精确学情诊断，及时预警学业，个性化学习推荐和智能决策支持等，提高教育管理过程的智能性，利用智能大数据分析为教学改进，管理决策提供数据支持</p>
                                    </div>
                                    <div className="scene-right">
                                        <div className="scene-right-item">
                                            <img src={require("../../assets/img/educationdata/education5.png")} className="right-img-bg"/>
                                            {/*<p className="scene-img-bg"></p>*/}
                                            <div className="scene-box">
                                                <div className="shade-cont">
                                                    <img src={require("../../assets/img/educationdata/education-icon1.png")} className="right-img-icon"/>
                                                    <p className="shade-tit">助力管理者/专业数据画像</p>
                                                    <p className="shade-text">Help managers/Professional data portraits</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="scene-item">
                                    <div className="scene-right left-location">
                                        <div className="scene-right-item">
                                            <img src={require("../../assets/img/educationdata/education6.png")} className="right-img-bg"/>
                                            <div className="scene-box">
                                                <div className="shade-cont">
                                                    <img src={require("../../assets/img/educationdata/education-icon2.png")} className="right-img-icon"/>
                                                    <p className="shade-tit">助力教师</p>
                                                    <p className="shade-text">Help Teachers</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="scene-left right-location">
                                        <h3 className="scene-tit">助力教师</h3>
                                        <p className="scene-desc">通过无感知的数据采集，利用互联网技术，实现多源并行数据的集成和融合，学生精准画像和教育过程动态监控管理，充分挖掘教育大数据的应用价值，基于行为分析学理论，分析学生，课程，课堂，职位能力，专业素养等，让数据服务于教学。</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="scene-item">
                                    <div className="scene-left">
                                        <h3 className="scene-tit">助力学生</h3>
                                        <p className="scene-desc">汇总采集学生的学习习惯，学习行为等数据，根据学生定制的个人发展目标，专业知识图谱和未来对口职位能力模型，将其归为个人的能力树，展现学生的成长轨迹，为学生提供立体的学习，分析，追踪，个性化推荐和个性化评价。</p>
                                    </div>
                                    <div className="scene-right">
                                        <div className="scene-right-item">
                                            <img src={require("../../assets/img/educationdata/education7.png")} className="right-img-bg"/>
                                            <div className="scene-box">
                                                <div className="shade-cont">
                                                    <img src={require("../../assets/img/educationdata/education-icon3.png")} className="right-img-icon"/>
                                                    <p className="shade-tit">助力学生</p>
                                                    <p className="shade-text">Help Students</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="information-feature">
                        <div className="Common-contentwap">
                            <div className="feature-header">
                                <h3 className="feature-tit">大数据平台特征</h3>
                                <p className="feature-desc">从数据源接收，到数据采集，数据处理，再到数据分析和挖掘，打通数据生命周期的各个分支</p>
                            </div>
                            <ul className="ul">
                                <li>
                                    <div className="pic"><img src={require("../../assets/img/educationdata/education11.png")}/></div>
                                    <div className="text">
                                        <div className="title">
                                            <h2>全流程</h2>
                                            <span>打通教学与管理数据生命周期各环节</span>
                                        </div>
                                        <p>从数据源接入，到数据采集、数据处理，再到数据分析和挖掘，打通数据生命周期的各个环节，实现数据采集、处理、分析一体化，为院校提供一站式数据服务，实现数据融合，提升数据质量，服务数据分析。</p>
                                    </div>
                                </li>
                                <li className="lia">
                                    <div className="pic"><img src={require("../../assets/img/educationdata/education12.png")}/></div>
                                    <div className="text">
                                        <div className="title">
                                            <h2>全场景</h2>
                                            <span>打通教学与管理数据生命周期各环节</span>
                                        </div>
                                        <p>覆盖教育教学和教育管理的全场景的数据，使用多种分析手段，快速实现从数据采集、数据整合、构建数据中心到数据可视化展现的全过程，帮助学校有序的管理、持续挖掘教学的数据价值。</p>
                                    </div>
                                </li>
                                <li className="lib">
                                    <div className="pic"><img src={require("../../assets/img/educationdata/education13.png")}/></div>
                                    <div className="text">
                                        <div className="title">
                                            <h2>全角色</h2>
                                            <span>一个平台搞定所有人的需求</span>
                                        </div>
                                        <p>为教育管理者提供面向教育数据仓库的数据分析展现，为教师提供助力教学全环节的数据跟踪服务和数据分析能力，为学生实现个性化推荐和定制服务，进而全面推进个性化教学和真正的形成性评价。面向教育环节中的每位成员，一个平台满足各类角色的数据应用场景</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="feature-cont" style={{display:"none"}}>
                                <img src={require("../../assets/img/educationdata/education8.png")} className="feature-cont-img"/>
                                <div className="feature-cont-box different1">
                                    <div className="flow-location">
                                        <p className="flow_tit">全流程</p>
                                        <p className="flow_desc">打通教学与管理数据生命周期各环节</p>
                                        <p className="flow_text">
                                            从数据源接入，到数据采集、数据处理，再到数据分析和挖掘，打通数据生命周期的各个环节，实现数据采集、处理、分析一体化，为院校提供一站式数据服务，实现数据融合，提升数据质量，服务数据分析。</p>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-cont" style={{display:"none"}}>
                                <img src={require("../../assets/img/educationdata/education9.png")} className="feature-cont-img"/>
                                <div className="feature-cont-box different2">
                                    <div className="flow-location">
                                        <div>
                                            <p className="flow_desc">全方位满足所有教育教学分析场景</p>
                                            <p className="flow_tit">全场景</p>
                                        </div>
                                        <p className="flow_text">覆盖教育教学和教育管理的全场景的数据，使用多种分析手段，快速实现从数据采集、数据整合、构建数据中心到数据可视化展现的全过程，帮助学校有序的管理、持续挖掘教学的数据价值。</p>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-cont" style={{display:"none"}}>
                                <img src={require("../../assets/img/educationdata/education10.png")} className="feature-cont-img"/>
                                <div className="feature-cont-box different3">
                                    {/*<img src={require("../../assets/img/educationdata/education8-1.png")} className="feature-cont-img"/>*/}
                                    <div className="flow-location">
                                        <p className="flow_tit">全角色</p>
                                        <p className="flow_desc">一个平台搞定所有人的需求</p>
                                        <p className="flow_text">为教育管理者提供面向教育数据仓库的数据分析展现，为教师提供助力教学全环节的数据跟踪服务和数据分析能力，为学生实现个性化推荐和定制服务，进而全面推进个性化教学和真正的形成性评价。面向教育环节中的每位成员，一个平台满足各类角色的数据应用场景。</p>
                                    </div>
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
