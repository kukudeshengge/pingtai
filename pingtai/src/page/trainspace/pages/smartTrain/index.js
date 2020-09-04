import React, { Component } from "react";
import './index.scss';
import '../../index.scss';  //引用父组件css
//import "swiper/dist/css/swiper.min.css";
//import Swiper from 'swiper'
//import Homess from './Homess'
//import {arr} from './swiper_config'
export default class index extends Component {
  state = {
    cur: 0,
    realIndex: 0,
    //swiperListArr:arr
  }

  componentDidMount() {

    // let _this = this;
    // this.mySwiper = new Swiper('.swiper-container', {
    //   loop:false,
    //   autoplay:{
    //     delay:3000,
    //     disableOnInteraction:false
    //   },
    //   observer:true,
    //   pagination: {
    //     el: '.swiper-pagination111',
    //     clickable: true,
    //     renderBullet: (index, className) => {
    //       if (index < this.state.swiperListArr.length ) {
    //         return `<div class=${className}><img  src=${React.SWEPER_URL+_this.state.swiperListArr[index].url} ></img> </div>`;

    //       } else {
    //         return 'dfffffffffffdredsffd'
    //       }
    //     },


    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   }
    // })
  }
  setcur(e) {
    this.setState({
      realIndex: this.mySwiper.realIndex
    })
  }
  render() {
    const vr_list = [{ t: '教学资源和资源中心资源助力实训，通过灵活调度策略，实现VR / AR实训资源的汇聚和下发', m_t: "VR / AR资源" }, { t: 'VR / AR实训全过程监控与数据收集，实现实训的数字化跟踪，持续监测评估', m_t: "VR / AR过程" }, { t: '统计分析实验过程的学情数据，形成全面立体的可供老师诊断​​决策的学情数据，促进教学效果', m_t: "实训结果分析" }, { t: `实训软硬件的应用，共享，管理，推动教学课程与虚拟仿真实验项目的深度融合，用数据为实训的统筹与决策提供依据`, m_t: "实训管理" }]
    return (
      <div className='portal-index'>

        <div className="main_banner" style={{ height: '390px', }}>
          {/* todo */}
          <div className="text_cc" style={{ width: '1200px', margin: "0 auto", paddingTop: "95px" }}>
            <div className="t_top" style={{
              color: '#FFFFFF',
              fontSize: "18px",
              fontWeight: 'bold',
              position: "relative",
              top: -'3px',
              left: "15px", opacity: 0.2
            }}>
              Hands-on Training Base
             </div>
            <div className="t_big" style={{ color: "#fff", fontSize: "50px", paddingLeft: '15px' }}>
              赋能实践教学
             </div>
            <div className="t_content" style={{
              width: '583px', height: '69px', color: "#fff", fontSize: '16px', fontWeight: 300, opacity: "0.8", position: 'relative', top: "3px", left: '15px', lineHeight: "23px"
            }}>
              量身定制实训基地解决方案，突破数据孤岛，实现优质资源互联互通，实现实训场景全覆盖，实现实训基地的智慧管理，打造真正的跨学科，多专业，集中式，开放共享的智慧实习基地。
             </div>
          </div>

        </div>
        <div className="vr_wrap">
          {/* <div className="vr_top">
            首个国家级职业教育
          <br />
          虚拟仿真（VR）实训基地
          </div> */}

          {/* <div className="vr_middle">
            打造VR产业集群、技术创新、VR应用示范、VR人才集聚、VR政策环境五个高地；<br />构建全球VR产业中心“江西VR产业高地”
          </div> */}
          <div className="vr_bottom">
            {vr_list.map((v, i) => (<div className="item" key={i} style={{ position: (i === 2 || i === 0) ? "relative" : "none", top: (i === 2 || i === 0) ? '0' : "0" }}>
              <div className="top">
                <img src={require(`../../../../assets/img/train_space/fangan${i + 1}.png`)} alt="" />
              </div>
              <div className="middle  mtop20 mbottom10">
                {v.m_t}
              </div>
              <div className="bottom">
                {v.t}
              </div>
            </div>))}
          </div>
        </div>
        {/* <div className="attchement_bg">
          <div className="top">
            一体化实训服务平台
          </div>
          <div className="align-middle">
            面向全国职业教育学校提供虚拟仿真实习实训“资源+设备”的解决方案，面向全国职业教育学校学生，及企业在职人员提供虚拟仿真培训课程及资源服务
          </div>
          <img src={require('../../../../assets/img/train_space/attchement_topbg.png')} alt="" />
        </div> */}

        {/* <div className="pagnation_swiper">
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
              <div className="swiper-button-prev"> &lt; </div>
              <div className="swiper-button-next">  &gt; </div>
            </div>
            <div onClick={(e) => {
              this.setcur(e)
            }} className="swiper-pagination111">	</div>
          </div>
        </div> */}

        {/* <div className="hover_scala">
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
                  引领和带动资源开发企业参与《专业人才培养方案》确定的虚拟仿真实训教学产品；
                       </div>
              </div>
              <div className="hover_item">
                <div className="hover_item_red">模式二</div>
                <div className="top">
                <img src={require('../../../../assets/img/train_space/hover_item2.png')} alt="" />
                </div>
                <div className="text">
                  校企合作自主研发适用国家职业教育虚拟仿真示范实训基地实习实训专业教学资源；
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
        </div> */}

        <div className="zhihui">
          <div>
            <h2 className="zh_text_title">智慧实训基地一体化解决方案</h2>
            <span className="line_red"></span>
            <p className="zh_text_content mbottom20">为职业院校量身定制实训基地解决方案，打破数据孤岛，实现优质资源互联互通，实现实训场景全覆盖，实现实训基地的智慧管理</p>
          </div>
          <div className="content_img">
          </div>
        </div>

        {/* <div className="school_help">
          
        </div> */}

        <div className="jiazhi">
          <div className="jiazhi_content">
            <h2 className="zh_text_title">价值</h2>
            <span className="line_red"></span>
            <div className="zh_text_content mbottom50">量身定制实训基地解决方案，突破数据孤岛，实现优质资源互联互通，实现实训场景全覆盖，实现实训基地的智慧管理</div>
          </div>
          <div className="jiazhi_content">
            <div className="jiazhi_info">
              <div className="jiazhi_info_item">
                <div className="top"><img src={require('../../../../assets/img/train_space/jz_banner_01.png')} alt="" /></div>
                <div className="middle zh_text_title_red mbottom15 mtop35">激活产教融合</div>
                <div className="bottom zh_text_content">构建VR/AR实训、人才、科研项目生态，导入爆发的产业需求，实现“产学研用”一体化，激活产教融合。
</div>
              </div>

              <div className="jiazhi_info_item">
                <div className="top"><img src={require('../../../../assets/img/train_space/jz_banner_02.png')} alt="" /></div>
                <div className="middle zh_text_title_red mbottom15 mtop35">赋能教学</div>
                <div className="bottom zh_text_content">围绕实训目标、内容、过程、效果的关键要素，实现数据的统一管理，进而构建多元化的质量评价体系，赋能教学，服务实训。

</div>
              </div>

              <div className="jiazhi_info_item">
                <div className="top"><img src={require('../../../../assets/img/train_space/jz_banner_03.png')} alt="" /></div>
                <div className="middle zh_text_title_red mbottom15 mtop35">深化产教融合</div>
                <div className="bottom zh_text_content">深化产教融合、校企合作，实现对实训筹备、实训资源、实训过程、实训设备的全面管理，对实训进行全方位360度画像，打造真正跨学科、多专业、集中式、开放共享的智慧实习基地。

</div>
              </div>
            </div>

          </div>

        </div>

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

      </div>
    )
  }
}



