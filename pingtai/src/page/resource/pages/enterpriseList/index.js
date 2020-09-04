import React, { Component } from 'react';
import './index.scss';
import '../../index.scss';  //引用父组件css

import "swiper/dist/css/swiper.min.css";
import Swiper from 'swiper'

import { Input, Col, Table, Modal,  } from 'antd';
import Empty from "../../../../components/emptypage";
import Applyuse from "@/components/applyuse/applyuse";
import {jslist, esAllCourseList, esSyCourseList, esTyCourseList} from './jslist_config'
const { Search } = Input;



export default class index extends Component {
    state={
      cur: 0,
      realIndex: 0,
      swiperListArr:jslist,
      esAllCourseList:esAllCourseList,
      esSyCourseList:esSyCourseList,
      esTyCourseList:esTyCourseList,
      coverFlag: false,

      modal1Visible: false,
    };

    componentDidMount() {

      let _this = this;
      this.mySwiper = new Swiper('.swiper-container', {
        loop:true,
        // autoplay:{
        //   delay:3000,
        //   disableOnInteraction:false
        // },
        observer:true,
        pagination: {
          el: '.swiper-pagination111',
          clickable: true,
          renderBullet: (index, className) => {
            if (index < this.state.swiperListArr.length ) {
              //return `<div class=${className}><img  src=${React.SWEPER_URL+_this.state.swiperListArr[index].url} ></img> </div>`;
              return `<div class=${className}><img  src=${require('../../../../assets/img/resource_center/users/'+_this.state.swiperListArr[index].url)} ></img> </div>`;
            } else {
              return 'dfffffffffffdredsffd'
            }
          },
         
  
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
    }
    
    setcur(e) {
      this.setState({
        realIndex: this.mySwiper.realIndex
      })
    }

    //申请使用咨询
    Consultation = (e) => {
      this.setState({
          coverFlag: true,
      })
    }

    cancel = e => {
        this.setState({ coverFlag: false, });
    }

    closeModal = () => {
      this.setState({ 
        coverFlag: false 
      });
    }

    render() {
      let { coverFlag, modal1Visible,} = this.state;
        return (
          <div className="system_standard  ep_resources">
            <div className="ep_top_wrap mbottom20" style={{paddingTop:40}}>
              <span className="eq_logo fleft">
                <img src={require('@/assets/img/resource_center/eq_logo.png')} alt="" />

              </span>
              <span className="eq_title fleft mleft20">企业专题·首信学院</span>
              <div className="fright">
                <span className="eq_title_link01 mright60"><a href="https://case1.es.cvei.cn/" target="_aboutblank">进入企业空间</a></span>
                <span className="eq_title_link01 mright30" onClick={() => this.Consultation()} >申请使用咨询</span>
                {/* */}
              </div>

            </div>
            <div className="eq_course_wrap mbottom30">
              <div className="eq_course_text_title01">
                <span className="squre">通识型课程</span>
                <span className="eq_course_text01">适用对象：零基础学生</span>
              </div>
              
            </div>
            <div className="eq_cousetable_wrap">
              <h2 className="eq_cousetable_title01">全部课程展示</h2>
              <div className="eq_cousetable_list">
              {/* {
                  [...new Array(28)].map((v, i) => {
                    return <dl>
                      <dt>课程一</dt>
                      <dd>人工智能概述</dd>
                    </dl>
                  })
              } */}
               {
                  esAllCourseList.map((v, i) => {
                    return <dl key={i}>
                      <dt>课程{v.courseNum}</dt>
                      <dd>{v.courseName}</dd>
                    </dl>
                  })
              } 
              </div>
            </div>
            <div className="eq_course_wrap mbottom30 mtop40">
              <div className="eq_course_text_title01">
                <span className="squre">通用型课程 </span>
                <span className="eq_course_text01">适用对象：具备基本大学数学基础知识</span>
              </div>
              
            </div>
            <div className="eq_cousetable_wrap">
              
              <div className="eq_cousetable_list02">
              {/* {
                  [...new Array(7)].map((v, i) => {
                    return <dl>
                    <h2 className="eq_cousetable_title02">课程一</h2>
                      
                      <dd>人工智能概述</dd>
                    </dl>
                  })
                  

              } */}
              {
                 esTyCourseList.map((v, i) => {
                    return <dl key={i}>
                    <h2 className="eq_cousetable_title02">课程{v.courseNum}</h2>
                      <dd>{v.courseName}</dd>
                    </dl>
                  })
              }
                
              </div>
            </div>

            <div className="eq_course_wrap mbottom30  mtop40">
              <div className="eq_course_text_title01">
                <span className="squre">实用型课程 </span>
                <span className="eq_course_text01">适用对象：具备Python基本技能或完成通用型课程学员</span>
              </div>
              
            </div>
            <div className="eq_cousetable_wrap mbottom40">
              
              <div className="eq_cousetable_list03">
              
                {/* {
                  [...new Array(6)].map((v, i) => {
                    return <div className="table_list01">
                    <h2 className="eq_cousetable_title03">机器学习</h2>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        
                        <div className="tr_column01 bg01" style={{borderTopLeftRadius:'5px'}}>
                          <span className="tr_transform" >初级</span> 
                        </div>

                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">机器学习（11门）</span>
                          <span className="tr_column02 bg01">机器学习案例与实践</span>
                          <span className="tr_column02 bg01">深度学习</span>
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg01" style={{borderTopRightRadius:'5px'}}>100课时</span>
                          <span className="tr_column03 bg01">100课时</span>
                          <span className="tr_column03 bg01">50课时</span>
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg02">
                          <span className="tr_transform" >中级 </span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg02">机器学习（11门）</span>
                          <span className="tr_column02 bg02">机器学习案例与实践</span>
                          <span className="tr_column02 bg02">深度学习</span>
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg02">100课时</span>
                          <span className="tr_column03 bg02">100课时</span>
                          <span className="tr_column03 bg02">50课时</span>
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg01" style={{borderBottomLeftRadius:'5px'}}>
                        <span className="tr_transform" >高级</span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">机器学习（11门）</span>
                          <span className="tr_column02 bg01">机器学习案例与实践</span>
                          <span className="tr_column02 bg01">深度学习</span>
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg01">100课时</span>
                          <span className="tr_column03 bg01">100课时</span>
                          <span className="tr_column03 bg01" style={{borderBottomRightRadius:'5px'}}>50课时</span>
                        </div>
                      </div>

                    </div>
                  </div>
                  })
              } */}
                  {/*机器学习*/}
                  <div className="table_list01">
                    <h2 className="eq_cousetable_title03">机器学习</h2>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        
                        <div className="tr_column01 bg01" style={{borderTopLeftRadius:'5px'}}>
                          <span className="tr_transform" >初级</span> 
                        </div>

                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">机器学习（11门）</span>
                          <span className="tr_column02 bg01">机器学习实作</span>
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg01" style={{borderTopRightRadius:'5px'}}>100课时</span>
                          <span className="tr_column03 bg01">100课时</span>
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg02">
                          <span className="tr_transform" >中级 </span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg02">机器学习高级理论（4门）</span>
                          <span className="tr_column02 bg02">深度学习（4门）</span>
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg02">100课时</span>
                          <span className="tr_column03 bg02">100课时</span>
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg01" style={{borderBottomLeftRadius:'5px'}}>
                        <span className="tr_transform" >高级</span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">机器学习案例与实践（5门）</span>
                          
                        </div>
                        
                        <div className="tr_item02">       
                          
                          <span className="tr_column03 bg01" style={{borderBottomRightRadius:'5px'}}>50课时</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/*计算机视觉*/}
                  <div className="table_list01">
                    <h2 className="eq_cousetable_title03">计算机视觉</h2>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        
                        <div className="tr_column01 bg01" style={{borderTopLeftRadius:'5px'}}>
                          <span className="tr_transform" >初级</span> 
                        </div>

                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">图像处理（11门）</span>
                          
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg01" style={{borderTopRightRadius:'5px'}}>100课时</span>
                          
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg02">
                          <span className="tr_transform" >中级 </span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg02 tr_transform" style={{height:'52px',lineHeight:'52px'}}>计算机视觉（16门）</span>
                          
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg02 tr_transform" style={{height:'52px',lineHeight:'52px'}}>100课时</span>
                          
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg01" style={{borderBottomLeftRadius:'5px'}}>
                        <span className="tr_transform" >高级</span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">自动驾驶应用</span>
                          <span className="tr_column02 bg01">机器人视觉</span>
                        </div>
                        
                        <div className="tr_item02">       
                        <span className="tr_column03 bg01">100课时</span>
                          <span className="tr_column03 bg01" style={{borderBottomRightRadius:'5px'}}>100课时</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/*自然语言处理*/}
                  <div className="table_list01">
                    <h2 className="eq_cousetable_title03">自然语言处理</h2>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        
                        <div className="tr_column01 bg01" style={{borderTopLeftRadius:'5px'}}>
                          <span className="tr_transform" >初级</span> 
                        </div>

                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">自然语言处理（7门）</span>
                          
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg01" style={{borderTopRightRadius:'5px'}}>100课时</span>
                          
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg02">
                          <span className="tr_transform" >中级 </span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg02">语音识别（12门）</span>
                          
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg02">100课时</span>
                          
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg01" style={{borderBottomLeftRadius:'5px'}}>
                        <span className="tr_transform" >高级</span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">问答系统/对话系统应用</span>
                          <span className="tr_column02 bg01">虚拟助理</span>
                          <span className="tr_column02 bg01">机器翻译</span>
                        </div>
                        
                        <div className="tr_item02">       
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                          <span className="tr_column03 bg01" style={{borderBottomRightRadius:'5px'}}>100课时</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/*数据科学*/}
                  <div className="table_list01">
                    <h2 className="eq_cousetable_title03">数据科学</h2>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        
                        <div className="tr_column01 bg01" style={{borderTopLeftRadius:'5px'}}>
                          <span className="tr_transform" >初级</span> 
                        </div>

                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01"  style={{height:'52px',lineHeight:'52px'}}>数据科学（6门）</span>
                          
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg01" style={{borderTopRightRadius:'5px',height:'52px',lineHeight:'52px'}} >100课时</span>
                          
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg02">
                          <span className="tr_transform" >中级 </span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg02" style={{height:'54px',lineHeight:'54px'}}>进阶数据科学（12门）</span>
                          
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg02" style={{height:'54px',lineHeight:'54px'}}>100课时</span>
                          
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg01" style={{borderBottomLeftRadius:'5px'}}>
                        <span className="tr_transform" >高级</span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">运营管理与分析</span>
                          <span className="tr_column02 bg01">市场营销管理与分析</span>
                          <span className="tr_column02 bg01">金融分析</span>
                          <span className="tr_column02 bg01">经济分析</span>
                          <span className="tr_column02 bg01">创新设计思想方法论</span>
                        </div>
                        
                        <div className="tr_item02">       
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                          <span className="tr_column03 bg01" style={{borderBottomRightRadius:'5px'}}>100课时</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/*物联网*/}
                  <div className="table_list01">
                    <h2 className="eq_cousetable_title03">物联网</h2>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        
                        <div className="tr_column01 bg01" style={{borderTopLeftRadius:'5px'}}>
                          <span className="tr_transform" >初级</span> 
                        </div>

                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">物联网基础（4门）</span>
                          
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg01" style={{borderTopRightRadius:'5px'}}>100课时</span>
                          
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg02">
                          <span className="tr_transform" >中级 </span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg02">物联网应用（4门）</span>
                          
                          
                        </div>
                        
                        <div className="tr_item02">       
                          <span className="tr_column03 bg02">100课时</span>
                          
                          
                        </div>
                      </div>
  
                    </div>
                    <div className="tr_wrap">
                      <div className="tr_wrap_content">
                        <div className="tr_column01 bg01" style={{borderBottomLeftRadius:'5px'}}>
                        <span className="tr_transform" >高级</span>
                        </div>
                        <div className="tr_item01 ">
                          <span className="tr_column02 bg01">互联汽车</span>
                          <span className="tr_column02 bg01">智慧城市架构</span>
                          <span className="tr_column02 bg01">水资源</span>
                          <span className="tr_column02 bg01">智能电网</span>
                          <span className="tr_column02 bg01">智能家居</span>
                          <span className="tr_column02 bg01">远程医疗</span>
                          <span className="tr_column02 bg01">物联网和云计算</span>
                        </div>
                        
                        <div className="tr_item02">       
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                        <span className="tr_column03 bg01">100课时</span>
                          <span className="tr_column03 bg01" style={{borderBottomRightRadius:'5px'}}>100课时</span>
                        </div>
                      </div>

                    </div>
                  </div>
              
              </div>
            </div>
            <div className=" jianshi_list_wrap mbottom30 bg02 ptop30 pbottom20">
              <div className="eq_course_wrap ">
                

                <div className="ep_top_wrap mtop40 mbottom20">
                    <span className="eq_logo fleft">
                      <img className="mtop15" src={require('@/assets/img/resource_center/js_ico.png')} alt="" />
                    </span>
                    <span className="eq_title fleft mleft20">讲师阵容  </span>
                  </div>
                  
                <div className="jianshi_list_content">
                  <div className="pagination_swiper_bottom">
                    <div className="swiper-container">
                      <div className="swiper-wrapper">
                        {this.state.swiperListArr.map((v, i) => {
                          return (<div className="swiper-slide" key={i}>
                            <div className="left">
                              {/* <img src={React.SWEPER_URL + v.url} alt="" /> */}
                              <img src={require(`../../../../assets/img/resource_center/users/${v.url}`)}  alt="" />

                            </div>
                            <div className="right">
                              <div className='name'>
                                {v.name}
                              </div>
                              <div className='desc'>
                                {v.desc}
                              </div>
                            </div>
                          </div>)
                        })}
                      </div>
                      <div className="swiper-button-prev" style={{fontFamily: "宋体" , fontWeight: 'bold'}}> ◀ </div>
                      <div className="swiper-button-next" style={{fontFamily: "宋体" , fontWeight: 'bold'}}>  ▶ </div>
                    </div>
                    <div onClick={(e) => {
                      this.setcur(e)
                    }} className="swiper-pagination111">	</div>
                  </div>
                </div>

                <div className="exam_wrap">
                <div className="ep_top_wrap mtop40 mbottom20">
                    <span className="eq_logo fleft">
                      <img className="mtop15" src={require('@/assets/img/resource_center/exam_ico.png')} alt="" />
                    </span>
                    <span className="eq_title fleft mleft20">考试认证 </span>
                  </div>

                  <div className="eq_course_wrap mbottom130  mtop40">
                  <div className="exam_list">
                      <div className="exam_list_item">
                        <img src={require('../../../../assets/img/resource_center/exam_zs01.png')} alt="" />
                        <div className="text_gray01 mtop30 mbottom10">国际证书---CIE证书</div>
                        <div className=""><span className="text_gray01">颁发机构：</span><span  className="text_gray02">美洲中国工程师学会 </span></div>
                      </div>

                      <div className="exam_list_item">
                        <img src={require('../../../../assets/img/resource_center/exam_zs02.png')} alt="" />
                        <div className="text_gray01 mtop30 mbottom10">国际证书---CIE证书</div>
                        <div className=""><span className="text_gray01">颁发机构：</span><span  className="text_gray02">美洲中国工程师学会 </span></div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
            

            <div className="ep_top_wrap  mbottom20">
              <span className="eq_logo fleft">
                <img src={require('@/assets/img/resource_center/eq_logo.png')} alt="" />

              </span>
              <span className="eq_title fleft mleft20">企业专题·人大学院</span>
              <div className="fright">
                {/* <span className="eq_title_link01 mright60">教职学苑</span>
                <span className="eq_title_link01 mright60">进入企业空间</span> */}
                <span className="eq_title_link01 mright30" onClick={() => this.Consultation()}>申请使用咨询</span>
              </div>

            </div>
            <div className="ep_top_wrap  mbottom20">
              <div className="college_list">
                <div className="college_list_item">
                  <img src={require('../../../../assets/img/resource_center/col_ico_01.png')} alt="" />
                  <p>财会课程</p>
                </div>
                
                <div className="college_list_item">
                  <img src={require('../../../../assets/img/resource_center/col_ico_02.png')} alt="" />
                  <p>教师资格证</p>
                </div>

                <div className="college_list_item">
                  <img src={require('../../../../assets/img/resource_center/col_ico_03.png')} alt="" />
                  <p>人力课程 </p>
                </div>

                <div className="college_list_item">
                  <img src={require('../../../../assets/img/resource_center/col_ico_04.png')} alt="" />
                  <p>财税实训</p>
                </div>

                <div className="college_list_item">
                  <img src={require('../../../../assets/img/resource_center/col_ico_05.png')} alt="" />
                  <p>英语课程</p>
                </div>

                <div className="college_list_item">
                  <img src={require('../../../../assets/img/resource_center/col_ico_06.png')} alt="" />
                  <p>自考课程</p>
                </div>

                <div className="college_list_item">
                  <img src={require('../../../../assets/img/resource_center/col_ico_07.png')} alt="" />
                  <p>高校思政课程 </p>
                </div>
                
                <div className="college_list_item">
                  <img src={require('../../../../assets/img/resource_center/col_ico_03.png')} alt="" />
                  <p>教师招聘课程 </p>
                </div>
              </div>

            </div>
            
            <div className="ep_top_wrap mtop40 mbottom20">
              <span className="eq_logo fleft">
                <img className="mtop15" src={require('@/assets/img/resource_center/other_ico.png')} alt="" />

              </span>
              <span className="eq_title fleft mleft20">其他企业专题</span>
              <div className="fright">
                <span className="eq_title_link01 mright30" onClick={() => this.Consultation()}>申请使用咨询 </span>
                
              </div>

            </div>
            
            <div className="eq_course_wrap   mtop40" style={{marginBottom:164}}>
              <div className="other_list">
                <div className="other_list_item">
                  <img src={require('../../../../assets/img/resource_center/logo_college01.png')} alt="" />
                  <p>北京市空越技术有限公司</p>
                </div>

                <div className="other_list_item">
                  <img src={require('../../../../assets/img/resource_center/logo_college02.png')} alt="" />
                  <p>邦锐亿得(北京)科技有限责任公司</p>
                </div>

                <div className="other_list_item">
                  <img src={require('../../../../assets/img/resource_center/logo_college03.png')} alt="" />
                  <p>北京开放大学</p>
                </div>
              </div>
            </div>
            <Modal className='Modal-butApplyuse'
                        visible={coverFlag}
                        destroyOnClose={true}
                        maskClosable={false}
                        onCancel={this.cancel}
                        closable={false}
                        footer={
                            null
                        }
                    >
                        <Applyuse closeModal={this.closeModal} />
                    </Modal>
            
          </div>

            
        )
    }
}
