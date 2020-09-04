import React from 'react';
import './index.scss';
import Header from '../../components/headersIndex'
import Footer from '../../components/footer'
import Empty from '../../components/emptypage'
import {Col, Row} from "antd";

export default class Main extends React.Component {
    state = {
        contentData: [
            {
                title: "立足",
                english: "Foothold",
                desc: "面向未来职业学校，实现教育现代化，助力我国成为学习大国、人力资源强国和人才强国",
            },
            {
                title: "搭建",
                english: "build",
                desc: "搭建全方位职业智慧教育云平台和教育大数据平台，为学生、教师、管理者提供一体化空间解决方案",
            },
            {
                title: "链接",
                english: "link",
                desc: "链接学历与非学历、学校与企业、行业与社会、教师&技术工匠与学生，实现人才培养的梯度进阶模式",
            },
            {
                title: "生态",
                english: "ecology",
                desc: "借助5G、人工智能、大数据、区块链技术，深化产教融合，重塑职业教育外部和内部生态环境",
            }
        ],
        listImg:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    }

    render() {
        return (
            <div className='resource_main'>
                <div className="" style={{height: "66px"}}>
                    <Header/>
                </div>
                <div className="main-content" id='main-content'>
                    <div >
                        <div className='main-banner'>
                            <img className='main-banner-img'
                                 src={require('@/assets/img/main/main-banner.png')}/>
                            <div className='Common-contentbanne'>
                                <div className='main-banner-cont Common-content'>
                                    <h2 className='main-banner-tit'>职教强国</h2>
                                    <p className='main-banner-childtit'>构建现代职业教育新形态</p>
                                    <p className='main-banner-doc'>Constructing the new form of modern vocational
                                        education</p>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className='Common-content'>
                          <div className='main-banner'>
                            <Row className="wisdom-space-box">
                                {
                                    this.state.contentData && this.state.contentData.map((item, index) => {
                                        return (
                                            <Col span={6} className="box-col" key={index}>
                                                <div className="wisdom-space-item" key={index}>
                                                    <img src={require(`@/assets/img/main/img${index + 1}.png`)}
                                                         className="wisdom-space-bg"/>
                                                    <p className="space-img-bg"></p>
                                                    <div className="space-cont">
                                                        <img
                                                            src={require(`@/assets/img/main/main-icon${index + 1}.png`)}
                                                            className="space-icon"/>
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

                    </div>
                    <div className='main-center'>
                       <div className='main-center-top Common-content' >
                           <h2  className='top-tit'>现代化的<span className='name-active'>全场景智慧教育</span>生态体系</h2>
                           <p  className='top-childtit'><span>Integrated solution</span></p>
                           <p  className='top-info'>整合智慧教学（智慧课堂）、智慧考评、智慧管理、智慧实训于一体，建立学生与教师的终身学习/发展档案，使教学管理多端互联、实现数据共享、构建教学与实训的立体化，进而全新打造现代化的全场景智慧教育生态体系。<br/><br/>

                               借助移动云计算、大数据、人工智能等新兴科技与教育技术的结合，让智慧教育覆盖100%的教育管理和教育教学场景，覆盖完整的教育教学过程，并全面积累完整的管理和教学数据，帮助学校实现提高教学质量、提升教学效率、简化教学管理，促进高校教学改革的目标，进而完成教育全场景生态闭环。</p>
                       </div>
                    </div>
                    <div className='center-cont'>
                        <div className='center-cont-list'>
                            <div  className='Common-content'>
                            <Row  className='center-cont-box'>
                                <Col span={13}>
                                    <div className='center-left'>
                                        <span className='left-number left-col1'>1</span>
                                        <div className='left-cont'>
                                            <h2 className='center-l-name'>平台</h2>
                                            <p className='center-l-doc'>构建一体化教育云平台，实现教育管理和教育教学的统筹管理，实现混合教学、泛在学习、个性化学习与精细化智能管理<br/><br/>

                                                一体化智慧管理，智慧教学+智慧实训+活动大赛+人才招聘，网络教研+教师进修，企业空间，教育大数据平台</p>
                                        </div>

                                    </div>
                                </Col>
                                <Col span={11}>
                                    <div className='main-r'>
                                        <img className='main-r-img'
                                             src={require('@/assets/img/main/tx-img1.png')}/>
                                    </div>
                                </Col>
                            </Row>
                            </div>
                        </div>
                            <div className=' center-cont-list'>
                                <div  className='Common-content'>
                            <Row className='center-cont-box'>
                                <Col span={13}>
                                    <div className='center-left'>
                                        <span className='left-number left-col2'>2</span>
                                        <div className='left-cont'>
                                            <h2 className='center-l-name'>实训基地</h2>
                                            <p className='center-l-doc'>构建一体化实训基地（VR/AR）管理平台，打破实训数据孤岛、实训应用孤岛，提供一站式的实训中台解决方案<br/>
                                                <br/>

                                                实现虚拟仿真实训资源、通用实训资源的共建共享，实现实训的全过程跟踪和智慧化管理</p>
                                        </div>

                                    </div>
                                </Col>
                                <Col span={11}>
                                    <div className='main-r'>
                                        <img className='main-r-img'
                                             src={require('@/assets/img/main/tx-img2.png')}/>
                                    </div>
                                </Col>
                            </Row>
                                </div>
                        </div>
                        <div className=' center-cont-list'>
                            <div  className='Common-content'>
                            <Row className='center-cont-box'>
                                <Col span={13}>
                                    <div className='center-left'>
                                        <span className='left-number left-col2'>3</span>
                                        <div className='left-cont'>
                                            <h2 className='center-l-name'>资源</h2>
                                            <p className='center-l-doc'>汇聚大量优质教育资源（通用教学资源+仿真资源），精准定位，全面助力教学与学习；<br/><br/>

                                                国家级+省级+校级优质资源，行业企业+出版社+教育机构精品资源，优质内容供应者资源；</p>
                                        </div>

                                    </div>
                                </Col>
                                <Col span={11}>
                                    <div className='main-r'>
                                        <img className='main-r-img'
                                             src={require('@/assets/img/main/tx-img3.png')}/>
                                    </div>
                                </Col>
                            </Row>
                            </div>
                        </div>
                        <div className=' center-cont-list'>
                            <div  className='Common-content'>
                            <Row className='center-cont-box'>
                                <Col span={13}>
                                    <div className='center-left'>
                                        <span className='left-number left-col4'>4</span>
                                        <div className='left-cont'>
                                            <h2 className='center-l-name'>应用</h2>
                                            <p className='center-l-doc'>为学校构建职业教育云平台，为企业构建企业空间，实现互融互通，深化产教融合，培育大国工匠<br/><br/>

                                                实现虚拟空间与现实空间的协同，助力学校集人才培养、科学研究、技术服务于一体，形成终身学习/发展体系</p>
                                        </div>

                                    </div>
                                </Col>
                                <Col span={11}>
                                    <div className='main-r'>
                                        <img className='main-r-img'
                                             src={require('@/assets/img/main/tx-img4.png')}/>
                                    </div>
                                </Col>
                            </Row>
                            </div>
                        </div>
                        <div className=' center-cont-list'>
                            <div  className='Common-content'>
                            <Row className='center-cont-box'>
                                <Col span={13}>
                                    <div className='center-left'>
                                        <span className='left-number left-col1'>5</span>
                                        <div className='left-cont'>
                                            <h2 className='center-l-name'>大数据</h2>
                                            <p className='center-l-doc'>收集、汇聚形成完整的教育大数据体系，构建多层次动态评价指标体系，实现全面科学的教学质量监控与评估。<br/><br/>

                                                教育大数据资产，管理决策大数据，学生画像大数据+学业预警大数据，个性化推荐大数据，多维度运行报告和数据报告</p>
                                        </div>

                                    </div>
                                </Col>
                                <Col span={11}>
                                    <div className='main-r'>
                                        <img className='main-r-img'
                                             src={require('@/assets/img/main/tx-img5.png')}/>
                                    </div>
                                </Col>
                            </Row>
                            </div>
                        </div>
                        <div className=' center-cont-list'>
                            <div  className='Common-content'>
                            <Row className='center-cont-box'>
                                <Col span={13}>
                                    <div className='center-left'>
                                        <span className='left-number left-col6'>6</span>
                                        <div className='left-cont'>
                                            <h2 className='center-l-name'>终身学习档案</h2>
                                            <p className='center-l-doc'>平台围绕服务学生&教师的终身发展为中心，形成学习学分和积分激励体系，打造互联网教育生态系统。通过对知识能力树、动态岗位能力模型和学习者个人学习记录的分析评估，为学习者提供个性化自适应服务，为教育管理部门的科学决策提供数据支撑。</p>
                                        </div>

                                    </div>
                                </Col>
                                <Col span={11}>
                                    <div className='main-r'>
                                        <img className='main-r-img'
                                             src={require('@/assets/img/main/tx-img6.png')}/>
                                    </div>
                                </Col>
                            </Row>
                            </div>
                        </div>
                        <div className='main-fa'>
                            <div className='main-center-top Common-content' >
                                <h2  className='top-tit'>智慧教育<span className='name-active'>一体化解决方案</span></h2>
                                <p  className='top-childtit'><span>Intelligent education integrated solution</span></p>
                                <img className='main-fa-img'
                                     src={require('@/assets/img/main/fa-img.png')}/>
                            </div>
                        </div>
                        <div className='main-hz'>
                            <div className='Common-content' >
                                <h2  className='hz-tit'>合作校企</h2>
                                <p  className='top-childtit'><span>School Enterprise Cooperation</span></p>
                                <Row className='hz-row'>
                                    {
                                        this.state.listImg.map((item, index) => {
                                            return (
                                                <Col span={6} key={index} className="hz-row-col">
                                                    <img src={require(`@/assets/img/main/hz-img${index + 1}.png`)}
                                                         className="hz-img"/>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>

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
