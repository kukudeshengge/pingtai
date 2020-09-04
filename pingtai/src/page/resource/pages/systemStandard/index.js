import React from "react";
import { Form, Radio, Pagination, Button, Tag, message } from "antd";
import "./index.scss";
import { withRouter } from "react-router-dom";
import {
  vocationeduLabel,
  educationPage,
  getMajors,
} from "@/api/resource/system-standard.js";
import { getDoc } from "@/api/media";
import setName from 'classnames';
import MyEmpty from "@/components/listEmpty";

export default Form.create()(
  withRouter(
    class ResourceCenterHome extends React.Component {
      state = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        standardType: [],
        stageId: 2,
        bigMajorList: [],
        bigMajorId: "",
        majorList: [],
        majorId: "",
        vocationList: [],
        labelVal: "全部",
        bigMajorVal: "",
        majorVal: "",
        checkData: [{ a: "", label: "" }],
        isClick: true,
        labelId: "",
        ifFlag: true
      };
      componentDidMount() {
        this.getVocationeduLabel();
        this.getBigMajors();
        this.getEducationPage();
      }
      //获取标准类型列表
      async getVocationeduLabel() {
        let res = await vocationeduLabel();
        if (res && res.length) {
          this.setState({
            standardType: res,
          });
        }
      }
      //职教体系查询列表
      async getEducationPage() {
        let {
          pageNum,
          pageSize,
          stageId,
          bigMajorId,
          majorId,
          // checkData,
        } = this.state;
        let labelId = [];
        if (this.state.labelId !== "") {
          labelId.push(this.state.labelId);
        }
        let params = {
          pageNum: pageNum,
          pageSize: pageSize,
          stageId: stageId,
          bigMajorId: bigMajorId,
          labelId: labelId,
          medMajorId: majorId,
        };
        let res = await educationPage(params);
        if (res) {
          this.setState({
            vocationList: res.data,
            pageNum: res.pageNum,
            pageSize: res.pageSize,
            total: res.total,
          });
        }
      }

      //根据中高职查询专业大类信息
      async getBigMajors() {
        let res = await getMajors({ stageId: this.state.stageId });
        if (res && res.length) {
          this.setState({
            bigMajorList: res,
          });
        }
      }
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
      //标准类型选中变化
      standardTypeChange(e) {
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
                this.getEducationPage();
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
              this.getEducationPage();
            }
          );
        }
      }
      //pageSize变化
      onShowSizeChange = (current, pageSize) => {
        this.setState(
          {
            pageNum: 1,
            pageSize: pageSize,
          },
          () => {
            this.getEducationPage();
          }
        );
      };
      //pageNum变化
      onPageNumChange = (page, pageSize) => {
        sessionStorage.setItem("pageNum", page);
        this.setState(
          {
            pageNum: page,
          },
          () => {
            this.getEducationPage();
          }
        );
      };
      //跳转详情
      jumpDetail = (item) => {
        sessionStorage.setItem("resourceData", JSON.stringify(item));
        this.props.history.push("/resource-center/resourceDetail");
      };
      render() {
        let {
          pageNum,
          pageSize,
          total,
          standardType,
          labelVal,
          stageId,
          bigMajorList,
          bigMajorId,
          majorList,
          majorId,
          vocationList,
          bigMajorVal,
          majorVal,
          isClick,
          labelId,
          ifFlag
        } = this.state;
        return (
          <>
            <div className="bread_wai">
              <div className="bread">
                <h2>职教体系标准</h2>
                <span>首页 / 职教体系标准</span>
              </div>
            </div>
            <div className="resource_center_wrap system_standard">
              <div className="top_w">
                <div className="top">
                  <div className="filter">
                    <div className="left">
                      <span style={{marginTop:"-1px"}}>筛选条件：</span>
                      <p className="filtrate_l">
                        {/* {checkData.length > 1 ? (
                          checkData.map((item, index) => {
                            return (
                              <span
                                key={index}
                                style={{ margin: "0 10px 0 0" }}
                              >
                                {item.labelName}
                              </span>
                            );
                          })
                        ) : (
                          <span>全部</span>
                        )} */}
                        {labelVal ? labelVal : "全部"}
                        <span style={{ marginLeft: 8 }}>-</span>
                        {stageId === 1 ? "中职" : "高职"}
                        {bigMajorVal ? " - " + bigMajorVal : ""}
                        {majorVal ? " - " + majorVal : ""}
                      </p>
                      <Tag
                        className={setName("reset_lll", { 'on_active': labelId ? true : false })}
                        onClick={() => {
                          this.setState(
                            {
                              labelVal: "全部",
                              labelId: "",
                              stageId: 2,
                              bigMajorVal: "",
                              bigMajorId: "",
                              majorVal: "",
                              majorId: "",
                              checkData: [{ a: "", label: "" }],
                            },
                            () => {
                              this.getBigMajors()
                              this.getEducationPage();
                            }
                          );
                        }}
                      >
                        重置
                      </Tag>
                    </div>
                  </div>
                  <dl className="classify_l">
                    <dt>标准类型</dt>
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
                              this.getEducationPage();
                            }
                          );
                        }}
                      >
                        全部
                      </Tag>
                      {standardType.map((item, index) => {
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
                              this.standardTypeChange(item);
                            }}
                            key={index}
                          >
                            {item.labelName}
                          </Tag>
                        );
                      })} */}
                      <Radio.Group
                        value={labelId}
                        onChange={(e) => {
                          let label = standardType.filter((item) => {
                            return e.target.value === item.id;
                          });
                          this.setState(
                            {
                              labelId: e.target.value,
                              labelVal: label[0] ? label[0].labelName : "全部",
                              bigMajorId: "",
                              bigMajorVal: "",
                            },
                            () => {
                              this.getEducationPage();
                            }
                          );
                        }}
                      >
                        <Radio.Button
                          value=""
                          onClick={() => {
                            this.setState({
                              bigMajorVal: "",
                              bigMajorId: "",
                              majorVal: "",
                              majorId: "",
                            });
                          }}
                        >
                          全部
                        </Radio.Button>
                        {standardType.map((item, index) => {
                          return (
                            <Radio.Button
                              key={index}
                              value={item.id}
                            >
                              {item.labelName}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </dd>
                  </dl>
                  <dl className="classify_l">
                    <dt>职教阶段</dt>
                    <dd>
                      <Radio.Group
                        value={stageId}
                        onChange={(e) => {
                          this.setState(
                            {
                              stageId: e.target.value,
                              bigMajorId: "",
                              bigMajorVal: "",
                              majorId: "",
                              majorVal: "",
                            },
                            () => {
                              this.getBigMajors();
                              this.getEducationPage();
                            }
                          );
                        }}
                      >
                        <Radio.Button key="2" value={2}>
                          高职
                        </Radio.Button>
                        <Radio.Button key="1" value={1}>
                          中职
                        </Radio.Button>
                      </Radio.Group>
                    </dd>
                  </dl>
                  {labelId === "1" ? (
                    <dl className="classify_l">
                      <dt>专业大类</dt>
                      <dd>
                        <Radio.Group
                          value={bigMajorId}
                          onChange={(e) => {
                            let bigMajor = bigMajorList.filter((item) => {
                              return e.target.value === item.majorId;
                            });
                            this.setState(
                              {
                                bigMajorId: e.target.value,
                                majorVal: "",
                                bigMajorVal: bigMajor[0]
                                  ? bigMajor[0].majorName
                                  : "",
                              },
                              () => {
                                if (this.state.stageId === 2) {
                                  this.getMajors();
                                }
                                this.getEducationPage();
                              }
                            );
                          }}
                        >
                          <Radio.Button value="">全部</Radio.Button>
                          {bigMajorList.map((item, index) => {
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
                  {labelId === "1" && stageId !== 1 && bigMajorId !== "" ? (
                    <dl className="classify_l">
                      <dt>专业类</dt>
                      <dd>
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
                                this.getEducationPage();
                              }
                            );
                          }}
                        >
                          <Radio.Button value="">全部</Radio.Button>
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
                  <div className="search_box">
                    <div>
                      <span>共查到{total}个资源</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content_w">
                <div className="standard_content">
                  <div className="content">
                    {vocationList && vocationList.length ? (
                      vocationList.map((item, index) => {
                        return (
                          <dl
                            onClick={() => {
                              // if (ifFlag) {
                              // if (localStorage["OBS_token"]) {
                              this.jumpDetail(item);
                              // } else {
                              // this.setState(
                              //   {
                              //     ifFlag: false,
                              //   },
                              //   () => {
                              //     message.warning(
                              //       "未登录用户无法访问本校系统"
                              //     );
                              //     setTimeout(() => {
                              //       this.setState({
                              //         ifFlag: true,
                              //       });
                              //     }, 3000);
                              //   }
                              // );
                              // }
                              //}
                            }
                            }
                            key={index}
                          >
                            <dt>
                              <img
                                alt=""
                                src={`https://office.necibook.com:8885/?ssl=1&info=1&furl=https://train.cvei.cn${getDoc(
                                  item.fileId
                                )}`}
                              />
                            </dt>
                            <dd>
                              <h2 title={item.fileName}>{item.fileName}</h2>
                              <p>
                                {item.bigMajorName}
                                {stageId === 2 && item.medMajorName !== ""
                                  ? "/" + item.medMajorName
                                  : ""}
                              </p>
                            </dd>
                          </dl>
                        );
                      })
                    ) : (
                        <MyEmpty content="暂无资源" />
                      )}
                  </div>
                  {total ? (
                    <div className="pagination_style">
                      <Pagination
                        showSizeChanger
                        pageSizeOptions={["10", "20", "30", "40"]}
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
            </div>
          </>
        );
      }
    }
  )
);
