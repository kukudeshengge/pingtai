import React, { Component } from "react";
import "./index.scss";
import { Input, Col, Radio, Tag, Pagination, message, Button } from "antd";
import {
  getMajors,
  getHotCategory,
  getConfSubjectList,
} from "@/api/resource/course.js";
import MyEmpty from "@/components/listEmpty";
import { imgUrl } from "@/config/secret.js";
import setName from 'classnames';
const { Search } = Input;

class index extends Component {
  state = {
    isBlock: false,
    stageId: "",
    hotCategoryList: [],
    hotCategoryId: "",
    bigMajorList: [],
    bigMajorId: "",
    checkData: [{ a: "", label: "" }],
    majorCheckData: [{ a: "", label: "" }],
    majorList: [],
    majorId: "",
    majorVal: "",
    subjectName: "",
    pageNum: 1,
    pageSize: 12,
    total: 0,
    courseList: [],
    isClick: true,
    hotId: "",
    hotVal: "",
  };
  componentDidMount() {
    const data = this.props.location.search; //地址栏截取
    const param = data.split("?")[1];
    if (param) {
      const codeParam = param.includes("%") ? decodeURI(param) : param;
      const jsonparam = JSON.parse(codeParam);
      this.state.checkData.push(jsonparam);
    }
    this.getHotCategory();
  }
  //切换分类方式
  changeBlock = () => {
    this.setState(
      {
        isBlock: !this.state.isBlock,
        hotCategoryId: "",
        bigMajorId: "",
        hotCategoryName: "",
        checkData: [{ a: "", label: "" }],
        majorCheckData: [{ a: "", label: "" }],
        stageId: 1,
      },
      () => {
        this.getBigMajors();
        this.getConfSubjectList();
      }
    );
  };
  jumpDetail = (v) => {
    sessionStorage.setItem("resourceDetail_id", v.id);
    this.props.history.push("/resource-center/courseDetail");
    // window.open("/#/resource-center/courseDetail");
  };
  //获取专业大类
  getBigMajors = () => {
    getMajors({ stageId: this.state.stageId }).then((res) => {
      if (res && res.length) {
        this.setState({
          bigMajorList: res,
        });
      }
    });
  };
  //根据中专业大类查询专业类信息
  async getMajors() {
    let params = {
      stageId: this.state.stageId,
      bigMajorId: this.state.bigMajorId,
    };
    let res = await getMajors(params);
    if (res && res.length) {
      this.setState({
        majorList: res,
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
  //热门分类选中
  hotChange(e) {
    let { checkData } = this.state;
    let index = checkData.findIndex((v) => {
      return v.id === e.id;
    });
    if (index < 0) {
      if (checkData.length < 6) {
        checkData.push(e);
        this.setState(
          {
            checkData,
          },
          () => {
            this.getConfSubjectList();
          }
        );
      } else {
        if (this.state.isClick) {
          this.setState(
            {
              isClick: false,
            },
            () => {
              message.warning("最多选择五个标签");
              setTimeout(() => {
                this.setState({
                  isClick: true,
                });
              }, 3000);
            }
          );
        }
      }
    } else {
      checkData.splice(index, 1);
      this.setState(
        {
          checkData,
        },
        () => {
          this.getConfSubjectList();
        }
      );
    }
  }
  //专业大类选中
  bigMajorChange(e) {
    let { majorCheckData } = this.state;
    let index = majorCheckData.findIndex((v) => {
      return v.majorId === e.majorId;
    });
    if (index < 0) {
      if (majorCheckData.length < 6) {
        majorCheckData.push(e);
        this.setState(
          {
            majorCheckData,
          },
          () => {
            if (majorCheckData.length === 2) {
              this.setState(
                {
                  bigMajorId: majorCheckData[1].majorId,
                },
                () => {
                  this.getMajors();
                }
              );
            } else {
              this.setState({
                bigMajorId: "",
                majorVal: "",
                majorId: "",
              });
            }
          }
        );
      } else {
        if (this.state.isClick) {
          this.setState(
            {
              isClick: false,
            },
            () => {
              message.warning("最多选择五个标签");
              setTimeout(() => {
                this.setState({
                  isClick: true,
                });
              }, 3000);
            }
          );
        }
      }
    } else {
      majorCheckData.splice(index, 1);
      this.setState(
        {
          majorCheckData,
        },
        () => {
          if (majorCheckData.length === 2) {
            this.setState(
              {
                bigMajorId: majorCheckData[1].majorId,
              },
              () => {
                this.getMajors();
              }
            );
          } else {
            this.setState({
              bigMajorId: "",
            });
          }
        }
      );
    }
    this.getConfSubjectList();
  }
  //pageSize变化
  onShowSizeChange = (current, pageSize) => {
    this.setState(
      {
        pageNum: 1,
        pageSize: pageSize,
      },
      () => {
        this.getConfSubjectList();
      }
    );
  };
  //pageNum变化
  onPageNumChange = (page, pageSize) => {
    // sessionStorage.setItem('/resource-center/list',page);
    this.setState(
      {
        pageNum: page,
      },
      () => {
        this.getConfSubjectList();
      }
    );
  };
  //获取课程列表
  async getConfSubjectList() {
    let {
      subjectName,
      pageNum,
      pageSize,
      stageId,
      checkData,
      majorId,
      majorCheckData,
      hotId,
    } = this.state;
    let courseCategoryId = [];
    // if (checkData.length > 1) {
    //   checkData.map((item) => {
    //     courseCategoryId.push(item.id);
    //   });
    // }
    if (hotId) {
      courseCategoryId.push(hotId);
    }
    let bigMajorId = [];
    if (majorCheckData.length > 1) {
      majorCheckData.map((item) => {
        bigMajorId.push(item.majorId);
      });
    }
    let params = {
      pageNum: pageNum,
      pageSize: pageSize,
      stageId: stageId,
      subjectName: subjectName,
      courseCategoryIds: courseCategoryId,
      bigMajorId: bigMajorId,
      medMajorId: majorId,
    };
    let res = await getConfSubjectList(params);
    if (res) {
      this.setState({
        courseList: res.data,
        total: res.total,
        pageSize: res.pageSize,
        pageNum: res.pageNum,
      });
    }
  }
  render() {
    let {
      isBlock,
      stageId,
      hotCategoryList,
      bigMajorList,
      majorCheckData,
      majorVal,
      checkData,
      bigMajorId,
      majorList,
      majorId,
      courseList,
      total,
      pageNum,
      pageSize,
      hotId,
      hotVal,
    } = this.state;
    // courseList=[]
    console.log(checkData)
    return (
      <>
        <div  className="bread_wai">
          <div  id='bread' className="bread">
            <h2>课程</h2>
            <span>首页 / 课程</span>
          </div>
        </div>
        <div id='list_box' className="list_box">
          <div className="top_wai">
            <div className="top">
              <div className="filter">
                <div className="left">
                  <span style={{marginTop:"-1px"}}>筛选条件：</span>
                  <p>
                    {!isBlock ? (
                      // checkData.length > 1 ? (
                      //   checkData.map((item, index) => {
                      //     return (
                      //       <span key={index} style={{ margin: "0 10px 0 0" }}>
                      //         {item.courseCategoryName}
                      //       </span>
                      //     );
                      //   })
                      // ) : (
                      //   <span>全部</span>
                      // )
                      hotVal ? (
                        <span>{hotVal}</span>
                      ) : (
                        <span>全部</span>
                      )
                    ) : (
                      <>
                        <span>{stageId === 1 ? "中职" : "高职"}</span>
                        <span>{hotVal ? hotVal : ""}</span>
                        {/* {majorCheckData.length > 1 ? (
                            majorCheckData.map((item, index) => {
                              return (
                                <span
                                  key={index}
                                  style={{ margin: "0 10px 0 0" }}
                                >
                                  {item.majorName}
                                </span>
                              );
                            })
                          ) : (
                              <span></span>
                            )} */}
                        <span style={{ marginRight: 10 }}>
                          {majorVal ? "-" : ""}
                        </span>
                        <span>{majorVal ? majorVal : ""}</span>
                      </>
                    )}
                  </p>
                  <Tag
                    className={setName("reset_lll",{"on_active":hotVal?true:false})}
                    onClick={() => {
                      this.setState(
                        {
                          // checkData: [{ a: "", label: "" }],
                          // stageId: 1,
                          // majorCheckData: [{ a: "", label: "" }],
                          // majorId: "",
                          // majorVal: "",
                          // hotCategoryList: [{ a: "", label: "" }],
                          hotVal: "",
                          hotId: "",
                        },
                        () => {
                          this.getHotCategory();
                        }
                      );
                    }}
                  >
                    重置
                  </Tag>
                </div>
                <div className="right">
                  {/* <img
                    src={require("@/assets/img/resource_center/red_trans.png")}
                    alt=""
                  />
                  <span
                    onClick={this.changeBlock}
                    style={{ marginLeft: "7px" }}
                  >
                    切换其他分类方式
                  </span> */}
                </div>
              </div>
              <div className="classify">
                <dl
                  className="classify_l"
                  style={{ display: isBlock ? "flex" : "none" }}
                >
                  <dt>职教阶段</dt>
                  <dd>
                    <Radio.Group
                      value={stageId}
                      onChange={(e) => {
                        this.setState(
                          {
                            stageId: e.target.value,
                            bigMajorId: "",
                            majorCheckData: [{ id: "", label: "" }],
                            subjectName: "",
                          },
                          () => {
                            this.getBigMajors();
                            this.getConfSubjectList();
                          }
                        );
                      }}
                    >
                      <Radio.Button key="1" value={1}>
                        中职
                      </Radio.Button>
                      <Radio.Button key="2" value={2}>
                        高职
                      </Radio.Button>
                    </Radio.Group>
                  </dd>
                </dl>
                {isBlock ? (
                  <>
                    <dl className="classify_l">
                      <dt>专业大类</dt>
                      <dd className="tag_wrap">
                        {bigMajorList.map((item, index) => {
                          return (
                            <Tag
                              className={
                                majorCheckData.filter((v) => {
                                  return v.majorId === item.majorId;
                                }).length
                                  ? "ant-tag-checkable-checked"
                                  : ""
                              }
                              onClick={() => {
                                this.bigMajorChange(item);
                              }}
                              key={index}
                            >
                              {item.majorName}
                            </Tag>
                          );
                        })}
                      </dd>
                    </dl>
                    {stageId !== 1 && bigMajorId !== "" ? (
                      <dl className="classify_l">
                        <dt>专业类</dt>
                        <dd className="tag_wrap">
                          <Radio.Group
                            value={majorId}
                            onChange={(e) => {
                              let major = majorList.filter((item) => {
                                return e.target.value === item.majorId;
                              });
                              this.setState(
                                {
                                  majorId: e.target.value,
                                  majorVal: major[0] ? major[0].majorName : "",
                                },
                                () => {
                                  this.getConfSubjectList();
                                }
                              );
                            }}
                          >
                            {majorList.map((item, index) => {
                              return (
                                <Radio.Button key={index} value={item.majorId}>
                                  {item.majorName}
                                </Radio.Button>
                              );
                            })}
                          </Radio.Group>
                        </dd>
                      </dl>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <dl className="classify_l">
                    <dt>热门分类</dt>
                    <dd className="tag_wrap">
                      {/* <Tag
                          className={
                            checkData.length === 1
                              ? "ant-tag-checkable-checked"
                              : ""
                          }
                          onClick={() => {
                            this.setState(
                              {
                                checkData: [{ id: "", label: "全部" }],
                              },
                              () => {
                                this.getConfSubjectList();
                              }
                            );
                          }}
                        >
                          全部
                      </Tag>
                        {hotCategoryList.map((item, index) => {
                          return (
                            <Tag
                              className={
                                checkData.filter((v) => {
                                  return v.id === item.id;
                                }).length
                                  ? "ant-tag-checkable-checked"
                                  : ""
                              }
                              onClick={() => {
                                this.hotChange(item);
                              }}
                              key={index}
                            >
                              {item.courseCategoryName}
                            </Tag>
                          );
                        })} */}
                      <Radio.Group
                        value={hotId}
                        onChange={(e) => {
                          let hot = hotCategoryList.filter((item) => {
                            return e.target.value === item.id;
                          });
                          console.log(hot);
                          this.setState(
                            {
                              hotId: e.target.value,
                              hotVal: hot[0] ? hot[0].courseCategoryName : "",
                            },
                            () => {
                              this.getConfSubjectList();
                            }
                          );
                        }}
                      >
                        <Radio.Button value="">全部</Radio.Button>
                        {hotCategoryList.map((item, index) => {
                          return (
                            <Radio.Button key={index} value={item.id}>
                              {item.courseCategoryName}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </dd>
                  </dl>
                )}
              </div>
              <div className="search_box">
                <div className="left">
                  <span>共查到{total}门课</span>
                </div>
                <div className="right">
                  <Search
                    placeholder="请输入课程名称查询"
                    onSearch={(e) => {
                      this.setState(
                        {
                          subjectName: e,
                        },
                        () => {
                          this.getConfSubjectList();
                        }
                      );
                    }}
                    // onChange={(e) => {
                    //   this.setState(
                    //     {
                    //       subjectName: e.target.value,
                    //     },
                    //     () => {
                    //       this.getConfSubjectList();
                    //     }
                    //   );
                    // }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom_wai">
            <div className="bottom">
              {courseList && courseList.length ? (
                courseList.map((v, i) => {
                  return (
                    <Col
                      key={i}
                      className="item"
                      onClick={() => this.jumpDetail(v)}
                      span={6}
                    >
                      <div className="top">
                        <div className="none"></div>
                        <img
                          src={`${imgUrl}/api/pt/api/v1/media/showThumbnail/${v.fileId}`}
                          alt=""
                        />
                      </div>
                      <div className="content">
                        <h2>{v.subjectName}</h2>
                        <p className="vertical_j">
                          {/* <span>主讲：李老师</span> */}
                          <span>学时：{v.period}</span>
                        </p>
                      </div>
                    </Col>
                  );
                })
              ) : (
                <MyEmpty content="暂无课程" />
              )}
            </div>
            {total ? (
              <div className="pagination_style list_pagin">
                <Pagination
                  showSizeChanger
                  pageSizeOptions={["12", "24", "36", "48"]}
                  onShowSizeChange={this.onShowSizeChange}
                  onChange={this.onPageNumChange}
                  defaultCurrent={1}
                  current={pageNum}
                  pageSize={pageSize}
                  total={total}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}

export default index;
