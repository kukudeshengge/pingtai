import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Input, Col, Divider, Pagination, Tag, message, Button } from "antd";
import { getVrlist, getTag, getSonTag } from "@/api/resource/resourceVr.js";
import setName from "classnames";
import MyEmpty from "@/components/listEmpty";
import { imgUrl } from "@/config/secret.js";
const { CheckableTag } = Tag;
const { Search } = Input;

const mapStateToProps = ({ VR }) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Vr extends React.Component {
    state = {
      vrList: [],
      tagList: [],
      sonTagList: [],
      pageNum: 1,
      pageSize: 10,
      resourceName: "",
      total: 0,
      classifyIndex: sessionStorage.classifyIndex
        ? [JSON.parse(sessionStorage.classifyIndex)]
        : [],
      sonIndex: [],
      requestFlag: true,
      sonFlag: true,
      oftenFlag: true,
    };
    componentDidMount() {
      this.getVrlist();
      this.getTag();
    }
    componentWillUnmount() {
      sessionStorage.removeItem("classifyIndex");
    }
    //获取标签数据
    getTag = () => {
      getTag().then((res) => {
        if (res) {
          this.setState({ tagList: res }, () => {
            this.getSonTag();
          });
        }
      });
    };
    //获取子类数据
    getSonTag = () => {
      let { classifyIndex, sonFlag } = this.state;
      let id = classifyIndex.length ? classifyIndex[0].id : "";
      if (id) {
        getSonTag({ id }).then((res) => {
          if (res) {
            // if (sonFlag) {
            //     this.setState(
            //         {
            //             sonTagList: res,
            //             sonIndex: res.length && [res[0].id],
            //             sonFlag: false
            //         }, () => {
            //             this.getVrlist();
            //             console.log(this.state.sonIndex)
            //         });
            // } else {
            this.setState(
              {
                sonTagList: res,
                sonIndex: res.length && [res[0]],
              },
              () => {
                this.getVrlist();
              }
            );
            // }
          }
        });
      } else {
        this.setState({ sonTagList: [], sonIndex: [] }, () => {
          this.getVrlist();
        });
      }
    };
    //获取列表数据
    getVrlist = () => {
      let {
        classifyIndex,
        sonIndex,
        pageNum,
        pageSize,
        resourceName,
      } = this.state;
      getVrlist({
        classifyIds: sonIndex
          ? sonIndex.filter((v) => !v.notSend).map((v) => v.id)
          : classifyIndex,
        pageSize,
        pageNum,
        resourceName,
      }).then((res) => {
        if (res) {
          this.setState({
            vrList: res.data,
            total: res.total,
          });
        }
      });
    };
    //分页切换
    change = (pageNum) => {
      this.setState(
        {
          pageNum,
        },
        () => {
          this.getVrlist();
        }
      );
    };
    //父类tag切换
    changeP = (v) => {
      this.setState(
        {
          classifyIndex: [v],
        },
        () => {
          this.getTag();
        }
      );
      // let { classifyIndex } = this.state;
      // let res = this.filterData(classifyIndex, v, true);
      // if (res.length > 1) {
      //   this.setState({ sonIndex: [] });
      // }
      // this.setState(
      //   {
      //     classifyIndex: res.map((v) => {
      //       v.notSend = false;
      //       return v;
      //     }),
      //   },
      //   () => {
      //     this.getTag();
      //   }
      // );
    };
    //过滤方法
    filterData = (arr, val, flag) => {
      let { oftenFlag } = this.state;
      let index = arr.findIndex((v) => v.id === val.id);
      if (index > -1) {
        arr = arr.filter((v) => v.id !== val.id);
      } else {
        if (flag && arr.length >= 5) {
          if (oftenFlag) {
            this.setState({ oftenFlag: false });
            message.warning("最多选择五个标签");
            setTimeout(() => this.setState({ oftenFlag: true }), 3000);
          }
          return arr;
        }
        arr.push(val);
      }
      return arr;
    };
    //改变父类tag的状态
    changeParentTag = (val) => {
      let { classifyIndex } = this.state;
      classifyIndex = classifyIndex.map((v) => {
        v.notSend = val;
        return v;
      });
      this.setState({ classifyIndex });
    };
    //子类tag切换
    changeS = (v) => {
      // let { sonIndex, classifyIndex } = this.state;
      // let res = this.filterData(sonIndex, v);
      // if (res.length === 0) {
      // this.changeParentTag(false);
      // } else {
      this.changeParentTag(true);
      // }
      this.setState({ sonIndex: [v] }, () => {
        this.getVrlist();
      });
    };
    //切换显示多少条
    onShowSizeChange = (pageNum, pageSize) => {
      this.setState({ pageSize }, () => {
        this.getVrlist();
      });
    };
    //全部
    allFn = () => {
      this.setState({ classifyIndex: [], sonIndex: [] }, () => {
        this.getVrlist();
        this.getSonTag();
      });
    };
    //重置
    reset = () => {
      sessionStorage.removeItem("classifyIndex");
      this.setState({ classifyIndex: [], sonIndex: [], sonTagList: [] }, () =>
        this.getVrlist()
      );
    };
    render() {
      let {
        total,
        resourceName,
        pageNum,
        pageSize,
        vrList,
        tagList,
        classifyIndex,
        sonIndex,
        sonTagList,
      } = this.state;
      return (
        <div className="train_res_sx_l">
          <div className="bread_wai">
            <div className="bread">
              <h2>VR/AR实训资源</h2>
              <span>首页 / VR/AR实训资源</span>
            </div>
          </div>
          <div className="vr_box">
            <div className="top_wai">
              <div className="top">
                <div className="filter">
                  <div className="left" style={{ marginTop: "-2px" }}>
                    <span>筛选条件：</span>
                    <p>
                      {classifyIndex.length ? null : <span>全部</span>}
                      {classifyIndex.map((v, i) => (
                        <span key={i} style={{ marginRight: "10px" }}>
                          {v.classifyName}
                        </span>
                      ))}
                      {sonIndex.length ? <span>-&nbsp;&nbsp;</span> : ""}
                      {sonIndex.map((v, i) => (
                        <span key={i} style={{ marginRight: "10px" }}>
                          {v.classifyName}
                        </span>
                      ))}
                    </p>
                    <Tag
                      className={setName("reset_lll", {
                        on_active1: classifyIndex.length ? true : false,
                      })}
                      style={{ marginTop: "3px" }}
                      onClick={this.reset}
                    >
                      重置
                    </Tag>
                  </div>
                </div>
                <div className="classify">
                  <div className="hot">
                    <div className="left">
                      <span>资源分类</span>
                      <i></i>
                    </div>
                    <div className="right">
                      <div className="right_list">
                        <CheckableTag
                          className={setName("item1", {
                            active: !classifyIndex.length ? true : false,
                          })}
                          onChange={this.allFn}
                        >
                          全部
                        </CheckableTag>
                        {tagList.map((v, i) => {
                          return (
                            <CheckableTag
                              className={setName("item1", {
                                active: classifyIndex.filter(
                                  (item) => item.id === v.id
                                ).length
                                  ? true
                                  : false,
                              })}
                              key={v.id}
                              onChange={() => this.changeP(v, i)}
                            >
                              {v.classifyName}
                            </CheckableTag>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {sonTagList.length ? (
                    <div
                      className="type"
                      style={{
                        display: classifyIndex.length > 1 ? "none" : "flex",
                      }}
                    >
                      <div className="left">
                        <span>子类</span>
                        <i></i>
                      </div>
                      <div className="right">
                        <div className="right_list zlst">
                          {sonTagList.map((v, i) => {
                            return (
                              <CheckableTag
                                key={v.id}
                                className={setName("item", {
                                  active: sonIndex.filter(
                                    (item) => item.id === v.id
                                  ).length
                                    ? true
                                    : false,
                                })}
                                onChange={() => {
                                  this.changeS(v, i);
                                }}
                              >
                                {v.classifyName}
                              </CheckableTag>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="search_box">
                  <div className="left">
                    <span>共查到{total}个实训资源</span>
                  </div>
                  <div className="right">
                    <Search
                      placeholder="资源名称查询"
                      value={resourceName}
                      onChange={(e) =>
                        this.setState({ resourceName: e.target.value })
                      }
                      onSearch={this.getVrlist}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom_wai">
              <div className="bottom">
                {vrList && vrList.length ? (
                  vrList.map((v, i) => {
                    return (
                      <Col key={v.id} className="item" span={6}>
                        <div className="top">
                          <div className="left">
                            <div className="tag_j">
                              {v.classifyName &&
                                v.classifyName.slice(0, 4).replace("-", "")}
                            </div>
                            <img
                              src={`${imgUrl}/api/pt/api/v1/media/showThumbnail/${v.coverFileId}`}
                              alt=""
                            />
                          </div>
                          <div className="right">
                            <h2>
                              <span>{v.resourceName}</span>
                              {v.ifAdapter === 1 ? (
                                <span>适配软硬件：zSpace</span>
                              ) : null}
                            </h2>
                            <p>{v.content}</p>
                          </div>
                        </div>
                        <Divider />
                      </Col>
                    );
                  })
                ) : (
                  <MyEmpty content="暂无实训资源" />
                )}
              </div>
              {total ? (
                <div className="page_box">
                  <Pagination
                    current={pageNum}
                    pageSize={pageSize}
                    pageSizeOptions={["10", "20", "30"]}
                    total={total}
                    onChange={this.change}
                    // showTotal={(total) => `共${total}条`}
                    onShowSizeChange={this.onShowSizeChange}
                    showSizeChanger={true}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  }
);
