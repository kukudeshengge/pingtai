import React from "react";
import { Form, Radio, Button } from "antd";
import "./index.scss";
import { withRouter } from "react-router-dom";
// import a from "@/until/axios_instans.js"
import { getTag } from "@/api/resource/resourceVr.js";
// import { getShowImage } from "@/api/media/image.js";
import {
  indexVocationEducatiom,
  getConfSubjectList,
} from "@/api/resource/resource_home.js";
import { getHotCategory } from "@/api/resource/course.js";
import { imgUrl } from "@/config/secret.js";
export default Form.create()(
  withRouter(
    class ResourceCenterHome extends React.Component {
      state = {
        tagList: [],
        hightList: [],
        lowList: [],
        hotCategoryList: [],
        hotClassify: "",
        subjectList: [],
        spA: true,
        spB: false,
        spC: false,
      };
      componentDidMount() {
        // console.log(this.props, "`````````````````");
        // a.get("/api/media/api/v1/media/getDefaultConfSubjectImg")
        this.getTag();
        this.indexVocationEducatiom();
        this.indexVocationEducatioms();
        this.getHotCategory();
      }
      jumpDetail = () => {
        this.props.history.push("/resource-center/resourceDetail");
      };
      //获取vr实训资源数据
      getTag = () => {
        getTag().then((res) => {
          if (res) {
            this.setState({ tagList: res });
          }
        });
      };
      //获取职教体系标准列表---高职
      async indexVocationEducatiom() {
        let res = await indexVocationEducatiom({ stageId: 2 });
        if (res && res.length) {
          this.setState({
            hightList: res,
          });
        }
      }
      //获取职教体系标准列表---中职
      async indexVocationEducatioms() {
        let res = await indexVocationEducatiom({ stageId: 1 });
        if (res && res.length) {
          this.setState({
            lowList: res,
          });
        }
      }
      //获取课程的热门分类
      async getHotCategory() {
        let res = await getHotCategory();
        if (res && res.length) {
          this.setState(
            {
              hotCategoryList: res,
            },
            () => {
              this.getConfSubjectList();
            }
          );
        }
      }
      //获取课程列表
      async getConfSubjectList() {
        let arr = [];
        if (this.state.hotClassify !== "") {
          arr.push(this.state.hotClassify);
        }
        let res = await getConfSubjectList({ courseCategoryIds: arr });
        this.setState({
          subjectList: res,
        });
      }
      //跳转到课程详情
      jumpCourse = (v) => {
        sessionStorage.setItem("resourceDetail_id", v.id);
        this.props.history.push("/resource-center/courseDetail");
      };
      //跳转到资源详情
      jumpResourceDetail = (v) => {
        sessionStorage.setItem("resourceData", JSON.stringify(v));
        this.props.history.push("/resource-center/resourceDetail");
      };
      render() {
        let {
          tagList,
          hightList,
          lowList,
          subjectList,
          spA,
          spB,
          spC,
        } = this.state;
        let gzImgList = [
          {
            url: require("@/assets/img/resource_center/gz_1.png"),
          },
          {
            url: require("@/assets/img/resource_center/gz_2.png"),
          },
          {
            url: require("@/assets/img/resource_center/gz_3.png"),
          },
          {
            url: require("@/assets/img/resource_center/gz_4.png"),
          },
        ];
        let zzImgList = [
          {
            url: require("@/assets/img/resource_center/zz_1.png"),
          },
          {
            url: require("@/assets/img/resource_center/zz_2.png"),
          },
          {
            url: require("@/assets/img/resource_center/zz_3.png"),
          },
          {
            url: require("@/assets/img/resource_center/zz_4.png"),
          },
        ];
        let icon_list = [
          {
            url: require("@/assets/img/resource_center/va_icon1.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon2.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon3.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon4.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon5.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon6.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon7.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon8.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon9.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon10.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon11.png"),
          },
          {
            url: require("@/assets/img/resource_center/va_icon12.png"),
          },
        ];
        return (
          <div className="resource_center_wrap resource_center_home">
            {/* banner */}
            <div className="banner_w">
              <div className="banner">
                <dl className="txt">
                  <dd>High Quality Resources</dd>
                  <dt>汇聚大量优质资源</dt>
                  <dd>
                    平台构建大型教育资源中心，实现国家级资源、省级资源、校级资源、资深企业资源、优质内容供应者资源的汇聚与积累
                  </dd>
                </dl>
                <img
                  alt=""
                  src={require("../../../../assets/img/resource_center/home_banner.png")}
                />
              </div>
            </div>
            {/* banner */}
            {/* advertising */}
            <div className="advertising_w">
              <div className="advertising">
                <dl>
                  <dt>
                    <img
                      style={{
                        width: 22,
                      }}
                      alt=""
                      src={require("@/assets/img/resource_center/adv_icon1.png")}
                    />
                  </dt>
                  <dd>
                    <h2>海量资源</h2>
                    <p>汇聚企、校、个人的大量资源</p>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <img
                      alt=""
                      src={require("@/assets/img/resource_center/adv_icon4.png")}
                    />
                  </dt>
                  <dd>
                    <h2>优质资源</h2>
                    <p>供给教育教学的优质资源</p>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <img
                      alt=""
                      src={require("@/assets/img/resource_center/adv_icon3.png")}
                    />
                  </dt>
                  <dd>
                    <h2>多样资源</h2>
                    <p>覆盖职业教育领域资源</p>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <img
                      alt=""
                      src={require("@/assets/img/resource_center/adv_icon2.png")}
                    />
                  </dt>
                  <dd>
                    <h2>VR/AR实训资源</h2>
                    <p>丰富的虚拟仿真实训资源</p>
                  </dd>
                </dl>
              </div>
            </div>
            {/* advertising */}
            {/* content */}
            <div className="content">
              {/* title */}
              <dl className="title" style={{ marginBottom: 40 }}>
                <dt>
                  <img
                    alt=""
                    style={{ width: "24px", height: "26px" }}
                    src={require("@/assets/img/resource_center/tv.png")}
                  />
                  <b className="right_middle">推荐课程</b>
                  <span>
                    汇聚大量企业、院校和优秀内容生产者的优质课程，为学习者构建职场应用型知识模型
                  </span>
                </dt>
                <dd
                  onClick={() => {
                    this.props.history.push(`/resource-center/list`);
                  }}
                >
                  <span>查看更多</span>
                  <img
                    alt=""
                    src={require("@/assets/img/resource_center/right.png")}
                  />
                </dd>
              </dl>
              {/* tag */}
              {/* <dl className="resource_classify">
                <dt>热门分类</dt>
                <dd>
                  <Radio.Group
                    value={hotClassify}
                  // onChange={(e) => {
                  //   this.setState(
                  //     {
                  //       hotClassify: e.target.value,
                  //     },
                  //     () => {
                  //       this.getHotCategory();
                  //     }
                  //   );
                  // }}
                  >
                    <Radio.Button value="">全部</Radio.Button>
                    {hotCategoryList.map((item, index) => {
                      return (
                        <Radio.Button
                          key={index}
                          value={item.id}
                          onClick={() => {
                            this.props.history.push(
                              `/resource-center/list?${encodeURI(
                                JSON.stringify(item)
                              )}`
                            );
                          }}
                        >
                          {item.courseCategoryName}
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
                </dd>
              </dl> */}
              {/* classify_list */}
              <div className="classify_list">
                {subjectList && subjectList.length
                  ? subjectList.map((item, index) => {
                      return (
                        <dl onClick={() => this.jumpCourse(item)} key={index}>
                          <dt>
                            <img
                              alt=""
                              src={`${imgUrl}/api/pt/api/v1/media/showThumbnail/${item.fileId}`}
                            />
                            <div name="遮罩层">
                              <img
                                alt=""
                                src={require("@/assets/img/resource_center/play.png")}
                              />
                            </div>
                          </dt>
                          <dd>
                            <h2>{item.subjectName}</h2>
                            <p>
                              {/* <span>主讲:李老师</span> */}
                              <span>学时：{item.period}</span>
                            </p>
                          </dd>
                        </dl>
                      );
                    })
                  : ""}
              </div>
              {/* title */}
              <dl className="title">
                <dt>
                  <img
                    alt=""
                    src={require("@/assets/img/resource_center/vrar.png")}
                  />
                  <b className="right_middle">(VR/AR)实训资源</b>
                  <span>
                    融入实践实训环节，满足新职业人虚拟仿真技能需求，学生能跨时空场景，沉浸式学习
                  </span>
                </dt>
                <dd>
                  <Button style={{ cursor: "auto" }}>12+热门方向</Button>
                  <Button style={{ cursor: "auto" }}>400+资源</Button>
                  <span
                    onClick={() => {
                      this.props.history.push(`/resource-center/vr`);
                    }}
                  >
                    查看更多
                  </span>
                  <img
                    alt=""
                    src={require("@/assets/img/resource_center/right.png")}
                  />
                </dd>
              </dl>
              {/* practical_training  */}
              <div className="practical_training">
                {tagList.map((item, index) => {
                  return (
                    <dl
                      onClick={() => {
                        sessionStorage.setItem(
                          "classifyIndex",
                          JSON.stringify(item)
                        );
                        this.props.history.push("/resource-center/vr");
                      }}
                      key={item.id}
                    >
                      <dt>
                        {item.classifyImg ? (
                          <img
                            src={`${imgUrl}/api/pt/api/v1/media/showThumbnail/${item.classifyImg}`}
                            alt="图片"
                          />
                        ) : null}
                      </dt>
                      <dd>
                        <h2>
                          <img
                            alt=""
                            src={icon_list[index].url}
                            style={{
                              width: 20,
                              verticalAlign: "middle",
                              marginRight: 10,
                            }}
                          />
                          {item.classifyName}
                        </h2>
                        <p>{item.englishDesc}</p>
                      </dd>
                    </dl>
                  );
                })}
              </div>
              {/* title */}
              <dl className="title">
                <dt>
                  <img
                    alt=""
                    src={require("@/assets/img/resource_center/zhijiao.png")}
                  />
                  <b className="right_middle">职教体系标准</b>
                  <span>
                    服务产业转型升级对人才培养的新要求，行业企业深度参与，将行业企业的新技术、新工艺、新规范等反映到培养规格和课程体系中
                  </span>
                </dt>
                <dd
                  onClick={() => {
                    this.props.history.push(`/resource-center/system-standard`);
                  }}
                >
                  <span>查看更多</span>
                  <img
                    alt=""
                    src={require("@/assets/img/resource_center/right.png")}
                  />
                </dd>
              </dl>
              {/* system_standard */}
              <div className="system_standard">
                <h2>
                  <span>高职</span>
                  <span>覆盖高职19个大类，347个专业的建设标准</span>
                </h2>
                <div className="main">
                  {hightList.map((item, index) => {
                    return (
                      <dl
                        onClick={() => this.jumpResourceDetail(item)}
                        key={index}
                      >
                        <dt>
                          <img alt="" src={gzImgList[index].url} />
                        </dt>
                        <dd>
                          <h2 title={item.fileName}>{item.fileName}</h2>
                          <p>
                            分类：{item.bigMajorName}/{item.medMajorName}
                          </p>
                        </dd>
                      </dl>
                    );
                  })}
                </div>
                <h2>
                  <span>中职</span>
                  <span>覆盖高职19个大类，347个专业的建设标准</span>
                </h2>
                <div className="main">
                  {lowList.map((item, index) => {
                    return (
                      <dl
                        onClick={() => this.jumpResourceDetail(item)}
                        key={index}
                      >
                        <dt>
                          <img alt="" src={zzImgList[index].url} />
                        </dt>
                        <dd>
                          <h2 title={item.fileName}>{item.fileName}</h2>
                          <p>分类：{item.bigMajorName}</p>
                        </dd>
                      </dl>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* content */}
            {/* enterprise_project */}
            <div className="enterprise_project_w">
              <div className="enterprise_project">
                <h2>企业专题</h2>
                {/* title */}
                <dl className="title">
                  <dt>
                    <img
                      alt=""
                      src={require("@/assets/img/resource_center/shouxin.png")}
                    />
                    <b>企业专题·首信学院</b>
                  </dt>
                  <dd>
                    <span>
                      <a
                        href="https://case1.es.cvei.cn/"
                        target="_aboutblank"
                        style={{ marginRight: "8px" }}
                      >
                        进入企业空间
                      </a>

                      <img
                        alt=""
                        src={require("@/assets/img/resource_center/right.png")}
                      />
                    </span>
                    {/* <span>
                      查看企业资源
                      <img
                        alt=""
                        src={require("@/assets/img/resource_center/right.png")}
                      />
                    </span> */}
                  </dd>
                </dl>
                {/* special_main */}
                <dl className="special_main">
                  <dt>
                    <div
                      className={spA ? "special_active_l" : ""}
                      onMouseOver={() => {
                        this.setState({
                          spA: true,
                          spB: false,
                          spC: false,
                        });
                      }}
                    >
                      <dl>
                        <dt>
                          <h2>通识型培养目标</h2>
                          <p>
                            对人工智能的发展历史、现在及未来展望有深度了解；
                          </p>
                          <p>
                            掌握人工智能在各领域的应用，如：智慧城市、智慧医疗、农业、机器人领域等；
                          </p>
                          <p>
                            了解人工智能相关领域：机器学习、计算机视觉、物联网、硬件、信息安全等；
                          </p>
                        </dt>
                        <dd>▶</dd>
                      </dl>
                      <img
                        alt=""
                        src={require("@/assets/img/resource_center/special_img.png")}
                      />
                    </div>
                    <div
                      className={spB ? "special_active_l" : ""}
                      onMouseOver={() => {
                        this.setState({
                          spA: false,
                          spB: true,
                          spC: false,
                        });
                      }}
                    >
                      <dl>
                        <dt>
                          <h2>通用型培养目标</h2>
                          <p>
                            掌握机器学习、计算机视觉、神经网络、自然语言语音处理的入门专业知识；
                          </p>
                          <p>
                            Python的基本运用能力，对基本机器学习、影像处理和神经网络算法进行编程；
                          </p>
                          <p>
                            熟悉人工智能风险、社会影响、道德规范等比科技更广阔的层面；
                          </p>
                        </dt>
                        <dd>▶</dd>
                      </dl>
                      <img
                        alt=""
                        src={require("@/assets/img/resource_center/special_img3.png")}
                      />
                    </div>
                    <div
                      className={spC ? "special_active_l" : ""}
                      onMouseOver={() => {
                        this.setState({
                          spA: false,
                          spB: false,
                          spC: true,
                        });
                      }}
                    >
                      <dl>
                        <dt>
                          <h2>实用型培养目标</h2>
                          <p>
                            五大领域：机器学习、计算机视觉、自然语言处理、数据科学、物联网；
                          </p>
                          <p style={{ maxWidth: 430 }}>
                            学习者分领域深度学习，从初级到高级，最终成为高端人工智能工程师，在领域内有所建树；
                          </p>
                        </dt>
                        <dd>▶</dd>
                      </dl>
                      <img
                        alt=""
                        src={require("@/assets/img/resource_center/special_img1.png")}
                      />
                    </div>
                  </dt>
                  <dd>
                    <img
                      style={{ marginTop: 80 }}
                      alt=""
                      src={require("@/assets/img/resource_center/special_img.png")}
                    />
                  </dd>
                </dl>
                {/* title */}
                <dl className="title">
                  <dt>
                    <img
                      alt=""
                      src={require("@/assets/img/resource_center/renda.png")}
                    />
                    <b>企业专题·人大数字</b>
                  </dt>
                  <dd>
                    {/* <span>
                      进入企业空间
                      <img
                        alt=""
                        src={require("@/assets/img/resource_center/right.png")}
                      />
                    </span>
                    <span>
                      查看企业资源
                      <img
                        alt=""
                        src={require("@/assets/img/resource_center/right.png")}
                      />
                    </span> */}
                  </dd>
                </dl>
                {/* special_main */}
                <dl className="special_main">
                  <dt>
                    <img
                      style={{ maxWidth: 305 }}
                      alt=""
                      src={require("@/assets/img/resource_center/special_img_2.png")}
                    />
                  </dt>
                  <dd>
                    <span>◀</span>
                    <div>
                      <h2>职教学苑</h2>
                      <p>
                        汇聚人教特色推出的财会课程、教师资格课程、人力课程、财税实训、自考课程、教师招聘课程、英语课程
                        ；
                      </p>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        );
      }
    }
  )
);
