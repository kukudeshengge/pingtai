import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Col,Row,Button} from 'antd';
import {  Link } from 'react-router-dom'
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';

export default class Certificatehome extends React.Component {
    state = {
        tabPosition: 'left',
        viewSwiper: null,
        previewSwiper: null
    }
    componentDidMount() {
        // 切换
        let galleryThumbs = new Swiper('.preview .swiper-main', {
            spaceBetween: 10,
            slidesPerView: 4,
            loop: false,
            freeMode: true,
            loopedSlides: 5, //looped slides should be the same
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            on: {
                tap: function(){
                    let slides = document.getElementById('preview').getElementsByClassName('swiper-slide');
                    for (let i = 0; i < slides.length; i++) {
                        slides[i].classList.remove('active-nav');
                    }
                    slides[galleryThumbs.clickedIndex].classList.add('active-nav');
                }
            }
        });
        let galleryTop = new Swiper('.view .swiper-main', {
            spaceBetween: 10,
            loop:false,
            loopedSlides: 5, //looped slides should be the same
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    }
    // 切换
    updateNavPosition = () => {

        const {viewSwiper, previewSwiper} = this.state;
        const that = this;
        const preview = document.getElementById('preview');
        const slide   = preview.getElementsByClassName('swiper-slide');
        const len     = slide.length;
        for (let i = 0; i < len; i++) {
            slide[i].classList.remove('active-nav');
        }

        const activeNav = slide[viewSwiper.activeIndex];
        // console.log("activeNav11111",activeNav);
        activeNav.classList.add('active-nav');
        if (activeNav.classList.value.indexOf('swiper-slide-visible') == -1) {
            if (viewSwiper.activeIndex > previewSwiper.activeIndex) {
                const thumbsPerNav = Math.floor(previewSwiper.width / slide[viewSwiper.activeIndex].offsetWidth) - 1
                previewSwiper.slideTo(viewSwiper.activeIndex - thumbsPerNav)
            } else {
                previewSwiper.slideTo(viewSwiper.activeIndex)
            }
        }
    }
    slidePrev = (e) => {
        e.preventDefault()
        const {viewSwiper} = this.state;
        if (viewSwiper.activeIndex == 0) {
            viewSwiper.slideTo(viewSwiper.slides.length - 1, 1000);
            return
        }
        viewSwiper.slidePrev()
    }
    slideNext = (e) => {
        e.preventDefault()
        const {viewSwiper} = this.state;
        if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
            viewSwiper.slideTo(0, 1000);
            return
        }
        viewSwiper.slideNext()
    }
    onDeclareLink=(val)=>{
        console.log("val-----",val)
      if(val==1){
          window.open("https://vslc.ncb.edu.cn/csr-declaraPlatform");
      }else {
          window.open("https://vslc.ncb.edu.cn/csr-scoreCertificate");
      }

    }
    render() {
        return (
            <div className='certificatehome'>
                <div className='certificate-banner'>
                    <img className='banner-img'
                         src={require('@/assets/img/certificate/zs-banner.jpg')}/>
                    <div className='banner-cont Common-content'>
                        <p className='bannersmall-name'>Lifelong Learning Profile</p>
                        <h2 className='banner-name'>1+X证书体系</h2>
                        <p  className='banner-doc'>完善国家职业教育制度体系，深化复合型技术<br/>技能人才培养培训模式改革</p>
                    </div>
                </div>
                <div className='certificate-center'>
                    <div className='Common-content'>
                        <div className='certificate-docbox'>
                            <h2 className='certificate-tit'>什么是1+X ？</h2>
                            <p className='certificate-doc'> 2019年2月13日，国务院印发的《国家职业教育改革实施方案》明确提出，在职业院校、应用型本科高校启动“学历证书+若干职业技能等级证书”制度试点工作，重点围绕服务国家需要、市场需求、学生就业能力提升，从10个左右领域做起，启动1+X证书制度试点工作。</p>

                            <p className='certificate-doc'> “学历证书+职业技能等级证书”制度即1+X证书制度，旨在鼓励学生在获得学历证书的同时，积极取得多类职业技能等级证书。把学历证书与职业技能等级证书结合起来，探索实施1+X证书制度，是职教20条的重要改革部署，也是重大创新。</p>

                            <p className='certificate-doc'> 有关院校将1+X证书制度试点与专业建设、课程建设、教师队伍建设等紧密结合，推进“1”和“X”的有机衔接，提升职业教育质量和学生就业能力。通过试点，深化教师、教材、教法“三教”改革；促进校企合作；建好用好实训基地；探索建设职业教育国家“学分银行”，构建国家资历框架。</p>

                            <p className='certificate-doc'> 1+X证书制度设计对于解决长期以来职业教育与经济社会发展不够紧密的问题，调动社会力量参与职业教育的积极性，深化复合型技术技能人才培养模式和评价模式改革，畅通技术技能人才成长通道，促进就业创业具有重要作用。</p>

                        </div>
                        {/*1+X的三教合一模式start*/}
                        <div className='certificate-pattern'>
                            <div className='certificate-namebox'>
                                <h2 className='certificate-name'><span className='name-badge'>1+X</span>的三教合一模式</h2>
                            </div>
                            <Row className='pattern-cont pattern-row'>
                                <Col span={8} className="pattern-cont-li">
                                    <div className='pattern-list'>
                                        <img className='zs-icon'
                                             src={require('../../../../assets/img/certificate/zs-icon1.png')}/>
                                        <h2 className='pattern-name'>教师</h2>
                                        <p className='pattern-info'>《深化新时代职业教育“双师型”教师队伍建设改革实施方案》提出，把1+X证书制度和相关标准等纳入教师培训的必修模块，培育一批具备职业技能等级证书培训能力的教师，发挥教师教学创新团队在实施1+X证书制度试点中的示范引领作用。</p>
                                    </div>
                                </Col>
                                <Col span={8} className="pattern-cont-li">
                                    <div className='pattern-list'>
                                        <img className='zs-icon'
                                             src={require('../../../../assets/img/certificate/zs-icon2.png')}/>
                                        <h2 className='pattern-name'>教材</h2>
                                        <p className='pattern-info'>《关于组织开展“十三五”职业教育国家规划教材建设工作的通知》明确“十三五”职业教育国家规划教材要适应1+X证书制度试点工作需要，将职业技能等级标准有关内容及要求有机融入教材内容，推进书证融通、课证融通的教材。</p>
                                    </div>
                                </Col>
                                <Col span={8} className="pattern-cont-li">
                                    <div className='pattern-list'>
                                        <img className='zs-icon'
                                             src={require('../../../../assets/img/certificate/zs-icon3.png')}/>
                                        <h2 className='pattern-name'>教法</h2>
                                        <p className='pattern-info'>教育部发布《关于职业院校专业人才培养方案制订与实施工作的指导意见》，鼓励学校积极参与实施1+X证书制度试点，将职业技能等级标准有关内容及要求有机融入专业课程教学，优化专业人才培养方案，促进书证融通。</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {/*1+X的三教合一模式end*/}
                        {/*1+X证书start*/}
                        <div className='certificate-pattern'>
                            <div className='certificate-namebox'>
                                <h2 className='certificate-name'><span className='name-badge'>1+X</span>证书</h2>
                            </div>
                            <Row className='pattern-cont'>
                                <div className="pc-slide">
                                    <div className="preview" id="preview">
                                        {/*<a className="arrow-left" onClick={this.slidePrev}></a>*/}
                                        {/*<a className="arrow-right" onClick={this.slideNext}></a>*/}
                                        <div className="swiper-main swiper-container">
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide active-nav">
                                                    <div className="img">
                                                        <img src={require('../../../../assets/img/certificate/zs-img1.png')} alt=""/>
                                                        <span className="icon"><img src={require('../../../../assets/img/certificate/zs-icon4.png')} alt=""/></span>
                                                    </div>
                                                    <p className="p">10千伏不停电作业职业技能等级证书（初级）
                                                    </p>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="img">
                                                        <img src={require('../../../../assets/img/certificate/zs-img1.png')} alt=""/>
                                                        <span className="icon"><img src={require('../../../../assets/img/certificate/zs-icon4.png')} alt=""/></span>
                                                    </div>
                                                    <p className="p">3D引擎技术应用职业技能等级证书（中级）</p>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="img">
                                                        <img src={require('../../../../assets/img/certificate/zs-img1.png')} alt=""/>
                                                        <span className="icon"><img src={require('../../../../assets/img/certificate/zs-icon4.png')} alt=""/></span>
                                                    </div>
                                                    <p className="p">业财一体信息化应用职业技能等级证书（高级）</p>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="img">
                                                        <img src={require('../../../../assets/img/certificate/zs-img1.png')} alt=""/>
                                                        <span className="icon"><img src={require('../../../../assets/img/certificate/zs-icon4.png')} alt=""/></span>
                                                    </div>
                                                    <p className="p">光伏电站运维职业技能等级证书（高级）</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="view">
                                        <div className="swiper-main swiper-container">
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide">
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >证书简介</h2>
                                                        <p className='modal-info'>主要针对城乡供用电、农用配电、工矿企业供用电、架空输配电线路施工与运行、电力电缆线路施工与运行、继电保护及自动装置运行维护、发电厂及变电站电气设备运行与维护、发电厂及变电站电气设备检修、供用电系统运行与维护、变电设备安装与维护等专业技术方向，适用于从事高压线路带电检修、送电线路、配电线路、变电设备检修等工作岗位（群）的初级技能人员。</p>
                                                    </div>
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >适用人群</h2>
                                                        <p className='modal-info'> 10千伏不停电作业职业技能等级标准主要针对城乡供用电、农用配电、工矿企业供用电、架空输配电线路施工与运行、电力电缆线路施工与运行、继电保护及自动装置运行维护、发电厂及变电站电气设备运行与维护、发电厂及变电站电气设备检修、供用电系统运行与维护、变电设备安装与维护等专业技术方向，从事高压线路带电检修、送电线路、配电线路、变电设备检修等工作岗位（群）。
                                                        </p>
                                                    </div>
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >取证要求</h2>
                                                        <p className='modal-info'>
                                                            考试总成绩合格分数线为80分。考生考试总成绩达80分及以上方可被评定为考试合格。考试合格的考生由各考核站点向评价组织申请颁发相应等级的10千伏不停电作业职业技能等级证书。</p>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >证书简介</h2>
                                                        <p className='modal-info'>主要针对城乡供用电、农用配电、工矿企业供用电、架空输配电线路施工与运行、电力电缆线路施工与运行、继电保护及自动装置运行维护、发电厂及变电站电气设备运行与维护、发电厂及变电站电气设备检修、供用电系统运行与维护、变电设备安装与维护等专业技术方向，适用于从事高压线路带电检修、送电线路、配电线路、变电设备检修等工作岗位（群）的初级技能人员。</p>
                                                    </div>
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >适用人群</h2>
                                                        <p className='modal-info'> 10千伏不停电作业职业技能等级标准主要针对城乡供用电、农用配电、工矿企业供用电、架空输配电线路施工与运行、电力电缆线路施工与运行、继电保护及自动装置运行维护、发电厂及变电站电气设备运行与维护、发电厂及变电站电气设备检修、供用电系统运行与维护、变电设备安装与维护等专业技术方向，从事高压线路带电检修、送电线路、配电线路、变电设备检修等工作岗位（群）。
                                                        </p>
                                                    </div>
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >取证要求</h2>
                                                        <p className='modal-info'>
                                                            考试总成绩合格分数线为80分。考生考试总成绩达80分及以上方可被评定为考试合格。考试合格的考生由各考核站点向评价组织申请颁发相应等级的10千伏不停电作业职业技能等级证书。</p>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >证书简介</h2>
                                                        <p className='modal-info'>主要针对城乡供用电、农用配电、工矿企业供用电、架空输配电线路施工与运行、电力电缆线路施工与运行、继电保护及自动装置运行维护、发电厂及变电站电气设备运行与维护、发电厂及变电站电气设备检修、供用电系统运行与维护、变电设备安装与维护等专业技术方向，适用于从事高压线路带电检修、送电线路、配电线路、变电设备检修等工作岗位（群）的初级技能人员。</p>
                                                    </div>
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >适用人群</h2>
                                                        <p className='modal-info'> 10千伏不停电作业职业技能等级标准主要针对城乡供用电、农用配电、工矿企业供用电、架空输配电线路施工与运行、电力电缆线路施工与运行、继电保护及自动装置运行维护、发电厂及变电站电气设备运行与维护、发电厂及变电站电气设备检修、供用电系统运行与维护、变电设备安装与维护等专业技术方向，从事高压线路带电检修、送电线路、配电线路、变电设备检修等工作岗位（群）。
                                                        </p>
                                                    </div>
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >取证要求</h2>
                                                        <p className='modal-info'>
                                                            考试总成绩合格分数线为80分。考生考试总成绩达80分及以上方可被评定为考试合格。考试合格的考生由各考核站点向评价组织申请颁发相应等级的10千伏不停电作业职业技能等级证书。</p>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >证书简介</h2>
                                                        <p className='modal-info'>主要针对城乡供用电、农用配电、工矿企业供用电、架空输配电线路施工与运行、电力电缆线路施工与运行、继电保护及自动装置运行维护、发电厂及变电站电气设备运行与维护、发电厂及变电站电气设备检修、供用电系统运行与维护、变电设备安装与维护等专业技术方向，适用于从事高压线路带电检修、送电线路、配电线路、变电设备检修等工作岗位（群）的初级技能人员。</p>
                                                    </div>
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >适用人群</h2>
                                                        <p className='modal-info'> 10千伏不停电作业职业技能等级标准主要针对城乡供用电、农用配电、工矿企业供用电、架空输配电线路施工与运行、电力电缆线路施工与运行、继电保护及自动装置运行维护、发电厂及变电站电气设备运行与维护、发电厂及变电站电气设备检修、供用电系统运行与维护、变电设备安装与维护等专业技术方向，从事高压线路带电检修、送电线路、配电线路、变电设备检修等工作岗位（群）。
                                                        </p>
                                                    </div>
                                                    <div className='pattern-modal-list'>
                                                        <h2 className='modal-name' >取证要求</h2>
                                                        <p className='modal-info'>
                                                            考试总成绩合格分数线为80分。考生考试总成绩达80分及以上方可被评定为考试合格。考试合格的考生由各考核站点向评价组织申请颁发相应等级的10千伏不停电作业职业技能等级证书。</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </div>
                        {/*1+X证书end*/}
                    </div>
                </div>
                <div className='certificate-bottom'>
                    <div className='bottom-item'>
                        <div className='bottom-name' >培训评价组织 / 试点院校申报系统</div>
                        <Button onClick={()=>this.onDeclareLink(1)} className='declare-btn'>立即申报</Button>
                    </div>
                    <div className='bottom-item'>
                        <div className='bottom-name' >成绩 /证书查询</div>
                        <Button className='declare-btn query-btn'  onClick={()=>this.onDeclareLink(2)}>立即查询</Button>
                    </div>
                </div>

            </div>
        )
    }
}
