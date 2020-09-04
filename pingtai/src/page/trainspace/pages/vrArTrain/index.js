import React, { Component } from "react";
import './index.scss';
import "swiper/dist/css/swiper.min.css";

import Swiper from 'swiper'
import Homess from './Homess'
import {arr} from './swiper_config'
export default class index extends Component {
  state = {
    cur: 0,
    realIndex: 0,
    swiperListArr:arr
  }

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
            return `<div class=${className}><img  src=${React.SWEPER_URL+_this.state.swiperListArr[index].url} ></img> </div>`;
   
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
  render() {
    const vr_list = [{ t: '首个国家级职业教育虚拟仿真示范实训基地。', m_t: "共建" }, { t: '职业教育虚拟仿真实训基地样板工程。以虚助实深化产教深度融合', m_t: "打造" }, { t: '高素质技术技能人才，助力企业转型省级培养复合型技术技能人才。', m_t: "提供" }, { t: `江西省虚拟现实产业发展以及“五个VR高地”目标的达成`, m_t: "助力" }]
    return (
      <div className='portal-index'>
        {/* <Header navName={"training-basecon"} /> */}

        {/* <div className="main_banner">
          <Homess></Homess>
       
        </div> */}

        
        <div className="attchement_bg pos_rel">
          <div className="top">
            首个国家级职业教育 虚拟仿真（VR）实训基地
          </div>
          <div className="align-middle">
          打造VR产业集群、技术创新、VR应用示范、VR人才集聚、VR政策环境五个高地；构建全球VR产业中心“江西VR产业高地”
          </div>
          <img src={require('../../../../assets/img/train_space/attchement_topbg.png')} alt="" />
          <div className="signet"></div>
        </div>
        <div className="middle_content_wrap01">
        <div className="vr_wrap" style={{backgroundColor:'#fff'}}>
          <div className="vr_top">
          一体化实训服务平台
          </div>

          <div className="vr_middle">
          面向全国职业教育学校提供虚拟仿真实习实训“资源+设备”的解决方案，面向全国职业<br />教育学校学生，及企业在职人员提供虚拟仿真培训课程及资源服务
          </div>
          <div className="vr_bottom">
          {vr_list.map((v, i) => (<div className="item" key={i} style={{ position: (i === 2 || i === 0) ? "relative" : "none", top: (i === 2 || i === 0) ? '-20px' : "0" }}>
              <div className="top">
                <img style={{width:(i===2)?'100px' : (i===3)?"142px":"155px"}}  src={require(`../../../../assets/img/train_space/jidi${i + 1}.png`)} alt="" />
              </div>
              <div className="middle mtop20 mbottom10">
                {v.m_t}
              </div>
              <div className="bottom">
                {v.t}
              </div>
            </div>))}
          </div>
        </div>

        </div>
        <div className="pagnation_swiper">
          <div className="pagnation_swiper_top">
            专家引领
             </div>
          <div className="pagnation_swiper_middle">
            汇集各方专家，共研构建实用性、前沿性的实训基地
       </div>
          <div className="pagination_swiper_bottom">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {this.state.swiperListArr.map((v, i) => {         
                  return (<div className="swiper-slide" key={i}>
                    <div className="left">
                      <img src={React.SWEPER_URL+v.url} alt="" />
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
              {/* <div className="swiper-button-prev" style={{fontFamily: "宋体" , fontWeight: 'bold'}}> &lt; </div>
              <div className="swiper-button-next" style={{fontFamily: "宋体" , fontWeight: 'bold'}}>  &gt; </div> */}
                    <div className="swiper-button-prev">  <img style={{display:"inline-block",width:"102%"}} src={require('../../../../assets/img/train_space/nex.png')} alt=""/> </div>
              <div className="swiper-button-next"><img style={{display:"inline-block",width:"102%"}} src={require('../../../../assets/img/train_space/pre.png')} alt=""/></div>
            </div>
            <div onClick={(e) => {
              this.setcur(e)
            }} className="swiper-pagination111">	</div>
          </div>
        </div>
        <div className="hover_scala">
          <div className="hover_scala_wrap">
            <div className="hover_scala_top">
              成果模式
        </div>
            <div className="hover_scala_middle">
            形成适合虚拟仿真专业教学开发，符合国家战略性新兴产业以及江西区域性支柱产业发展的8大类25个专业
                   </div>
            <div className="hover_scala_bottom">
              <div className="hover_item">
                <div className="hover_item_red">模式一</div>
                <div className="top">
                  <img src={require('../../../../assets/img/train_space/hover_item1.png')} alt="" />
                </div>
                <div className="text">
                引领和带动资源开发企业参与《专业人才培养方案》确定的虚拟仿真实训教学产品。
                       </div>
              </div>
              <div className="hover_item">
                <div className="hover_item_red">模式二</div>
                <div className="top">
                <img src={require('../../../../assets/img/train_space/hover_item2.png')} alt="" />
                </div>
                <div className="text">
                校企合作自主研发适用国家职业教育虚拟仿真示范实训基地实习实训专业教学资源。
                       </div>
              </div>
              <div className="hover_item">
                <div className="hover_item_red">模式三</div>
                <div className="top">
                <img src={require('../../../../assets/img/train_space/hover_item3.png')} alt="" />
                </div>
                <div className="text">
                引入战略新兴企业，及其自主研发的新一代人工智能产品入驻基地，丰富完善基地资源，发挥基地应用示范中心、展示推广中心作用。不求所有，但求所用。
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* <div className="zhihui">
          <div>
            <img src={require('../../../assets/img/train_space/index/zhihui.png')} alt=""/>
          </div>
        </div> */}

        {/* <div className="school_help">
          <img src={require('../../../assets/img/train_space/index/school_help.png')} alt="" />
        </div> */}

        {/* <div className="hezuo">
          <div className="hezuo_wrap">
            <div className="top">合作实训基地</div>
            <div className="middle">
              {Array(8).fill(null).map((_, h) => h).map((v, i) => {
                return (<div className="item" key={v}>
                  <a onClick={
                    ()=>this.props.history.push(`/academyDetail${i+1}`)
                  }><img src={require(`../../../../assets/img/train_space/hezuo${i + 1}.png`)} alt="" /></a>
                </div>)
              })}
            </div>
          </div>
        </div> */}
        {/* <Footer /> */}
      </div>
    )
  }
}


