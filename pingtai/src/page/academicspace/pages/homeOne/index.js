import React from "react";
import { Form, message } from "antd";
import "./index.scss";
import { withRouter, Link } from "react-router-dom";
import { getEducationInformationList, getSpecial } from "@/api/atade";
import { imgUrl } from "@/config/secret.js";
import getData from "@/config/schoolshellData.js";
import { analysisTem } from "@/until/libs";

export default Form.create()(
  withRouter(
    class ResourceCenterHome extends React.Component {
      state = {
        left: [],
        right: [],
        specialList: [],
        flag: true,
        data: sessionStorage["homeData"]
          ? JSON.parse(sessionStorage["homeData"])
          : '',
      };
      componentDidMount() {
        this.getEducationInformationList(1, "left");
        this.getEducationInformationList(2, "right");
        this.getSpecial();
      }
      //通知公告  教育咨讯
      async getEducationInformationList(e, type) {
        const { data } = this.state;
        if (data) {
          let params = {
            sysId: "CS",
            unitId: data.schoolName,
          };
          if (e === 1) {
            params.infoType = "通知公告";
          } else if (e === 2) {
            params.infoType = "教育资讯";
          }
          let res = await getEducationInformationList(params);
          if (res) {
            console.log("res--->", res);
            this.setState({
              [type]: res
            });
          }
        }
      }
      //专题＆要闻
      getSpecial = () => {
        const { data } = this.state;
        if (data) {
          getSpecial({
            sysId: "CS",
            unitId: data["schoolName"],
          }).then((res) => {
            if (res) {
              this.setState({ specialList: res });
            }
          });
        }
      };
      clickItem = (item) => {
        let token = localStorage["OBS_token"];
        let { flag } = this.state;
        if (flag) {
          this.setState({ flag: false });
          console.log(token);
          if (token) {
            message.warning("您非本校学生，无法访问本校系统");
          } else {
            message.warning("未登录用户无法访问本校系统");
          }
          setTimeout(() => this.setState({ flag: true }), 3000);
        }
      };
      jumpDetail = (item) => {
        let data = {
          id: item.id,
        };
        this.props.history.push(
          `/academicspace/announpage?${encodeURI(JSON.stringify(data))}`
        );
      };
      render() {
        let stList = [
          {
            url: require("@/assets/img/acade/icon/s_icon1.png"),
            url_t: require("@/assets/img/acade/icon/b_icon1.png"),
            title: "在线学习平台",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon2.png"),
            url_t: require("@/assets/img/acade/icon/b_icon2.png"),
            title: "校本资源库",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon3.png"),
            url_t: require("@/assets/img/acade/icon/b_icon3.png"),
            title: "顶岗实习平台",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon4.png"),
            url_t: require("@/assets/img/acade/icon/b_icon4.png"),
            title: "智慧实训",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon5.png"),
            url_t: require("@/assets/img/acade/icon/b_icon5.png"),
            title: "资源中心",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon6.png"),
            url_t: require("@/assets/img/acade/icon/b_icon6.png"),
            title: "活动大赛",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon7.png"),
            url_t: require("@/assets/img/acade/icon/b_icon7.png"),
            title: "选课系统",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon8.png"),
            url_t: require("@/assets/img/acade/icon/b_icon8.png"),
            title: "图书馆",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon9.png"),
            url_t: require("@/assets/img/acade/icon/b_icon9.png"),
            title: "校长信箱",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon10.png"),
            url_t: require("@/assets/img/acade/icon/b_icon10.png"),
            title: "招生信息",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon11.png"),
            url_t: require("@/assets/img/acade/icon/b_icon11.png"),
            title: "就业指导",
          },
          {
            url: require("@/assets/img/acade/icon/s_icon12.png"),
            url_t: require("@/assets/img/acade/icon/b_icon12.png"),
            title: "企业招聘",
          },
        ];
        let teaList = [
          {
            url: require("@/assets/img/acade/icon/t_icon1.png"),
            url_t: require("@/assets/img/acade/icon/w_icon1.png"),
            title: "教务管理系统",
          },
          {
            url: require("@/assets/img/acade/icon/t_icon2.png"),
            url_t: require("@/assets/img/acade/icon/w_icon2.png"),
            title: "邮件系统",
          },
          {
            url: require("@/assets/img/acade/icon/t_icon3.png"),
            url_t: require("@/assets/img/acade/icon/w_icon3.png"),
            title: "教师发展中心",
          },
          {
            url: require("@/assets/img/acade/icon/t_icon4.png"),
            url_t: require("@/assets/img/acade/icon/w_icon4.png"),
            title: "资料下载",
          },
          {
            url: require("@/assets/img/acade/icon/t_icon5.png"),
            url_t: require("@/assets/img/acade/icon/w_icon5.png"),
            title: "办公系统（OA ）",
          },
          {
            url: require("@/assets/img/acade/icon/t_icon6.png"),
            url_t: require("@/assets/img/acade/icon/w_icon6.png"),
            title: "科研管理系统",
          },
          {
            url: require("@/assets/img/acade/icon/t_icon7.png"),
            url_t: require("@/assets/img/acade/icon/w_icon7.png"),
            title: "实训基地管理系统",
          },
          {
            url: require("@/assets/img/acade/icon/t_icon8.png"),
            url_t: require("@/assets/img/acade/icon/w_icon8.png"),
            title: "产教融合管理系统",
          },
        ];
        let data = sessionStorage['headerType'] ? getData(sessionStorage['headerType']) : {};
        const { blogroll = [], college = [] } = data;
        let { left, right, specialList } = this.state;
        return (
          <div className="resource_center_wrap academicspace_home_one">
            {/* content_1 */}
            <div className="content_1_w">
              <div className="content_1">
                <div>
                  <h2>
                    <b>通知公告</b>
                    <span
                      className="pointer"
                      onClick={() =>
                        this.props.history.push("/academicspace/announlist")
                      }
                    >
                      查看更多
                    </span>
                  </h2>
                  {left &&
                    left.slice(0, 4).map((item, index) => {
                      let time = item.createDate
                        .split(" ")[0]
                        .replace("-", ".")
                        .split("-");
                      return (
                        <dl onClick={() => this.jumpDetail(item)} key={index}>
                          <dt>
                            <h2>{time[1]}</h2>
                            <p>{time[0]}</p>
                          </dt>
                          <dd>
                            <h2>{item.infoTitle}</h2>
                            <p>
                              {item.infoContent &&
                                analysisTem(item.infoContent)}
                            </p>
                          </dd>
                        </dl>
                      );
                    })}
                </div>
                <div>
                  <h2>
                    <b>教育资讯</b>
                    <span
                      className="pointer"
                      onClick={() =>
                        this.props.history.push(`/academicspace/educnewslist?${encodeURI(JSON.stringify({ id: '21', parentName: "教育资讯" }))}`)
                      }
                    >
                      查看更多
                    </span>
                  </h2>
                  {right &&
                    right.slice(0, 2).map((item, index) => {
                      let time = item.createDate
                        .split(" ")[0]
                        .replace(/\-/g, "/");
                      return (
                        <dl onClick={() => this.jumpDetail(item)} key={index}>
                          <dt>
                            <img
                              alt=""
                              src={`${imgUrl}/api/pt/api/v1/media/showThumbnail/${item.imgId}`}
                            />
                          </dt>
                          <dd>
                            <h2>{item.infoTitle}</h2>
                            <p style={{ minHeight: "72px" }}>
                              {item.infoContent &&
                                analysisTem(item.infoContent)}
                            </p>
                            <p>{time}</p>
                          </dd>
                        </dl>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* content_1 */}
            {/* content_2 */}
            <div className="content_2_w">
              <div className="content_2">
                <div>
                  <h2>
                    <b>学生办事大厅</b>
                    <span className="pointer" onClick={this.clickItem}>
                      进入学生空间
                    </span>
                  </h2>
                  <div>
                    {stList.map((item, index) => {
                      return (
                        <dl onClick={() => this.clickItem(item)} key={index}>
                          <dt>
                            <img alt="" src={item.url} className="icon_s" />
                            <img alt="" src={item.url_t} className="icon_t" />
                          </dt>
                          <dd>{item.title}</dd>
                        </dl>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h2>
                    <b>教工办事大厅</b>
                    <span className="pointer" onClick={this.clickItem}>
                      进入教工空间<i className='r_j'><img src={require('@/assets/img/acade/right_j.png')}  alt=''/></i>
                      进入教工空间
                    </span>
                  </h2>
                  <div>
                    {teaList.map((item, index) => {
                      return (
                        <dl
                          onClick={() => this.clickItem(item)}
                          key={index}
                        >
                          <dt>
                            <img alt="" src={item.url} className="icon_a" />
                            <img alt="" src={item.url_t} className="icon_b" />
                          </dt>
                          <dd>{item.title}</dd>
                        </dl>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {/* content_2 */}
            {/* content_3 */}
            <div className="content_3_w">
              <div className="content_3">
                <h1>学院＆专业</h1>
                <div>
                  {college.map((item, index) => {
                    return (
                      <dl key={index}>
                        <dt>
                          <img alt="" src={item.url} />
                        </dt>
                        <dd>
                          <h2>{item.title}</h2>
                          <p>{item.eng}</p>
                        </dd>
                      </dl>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* content_3 */}
            {/* content_4 */}
            <div className="content_4_w">
              <div className="content_4">
                <h1>专题＆要闻</h1>
                <div>
                  {specialList &&
                    specialList.slice(0, 4).map((item, index) => {
                      return (
                        <dl onClick={() => this.jumpDetail(item)} key={index}>
                          <dt>
                            <img
                              alt=""
                              src={`${imgUrl}/api/pt/api/v1/media/showThumbnail/${item.imgId}`}
                            />
                          </dt>
                          <dd>
                            <h2>{item.infoTitle}</h2>
                            <p>
                              {item.infoContent &&
                                analysisTem(item.infoContent)}
                            </p>
                          </dd>
                        </dl>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* content_4 */}
            {/* content_5 */}
            <div className="content_5">
              <h1>友情链接</h1>
              <div>
                {blogroll &&
                  blogroll.map((item, index) => {
                    return (
                      <span onClick={() => window.open(item.href)} key={index}>
                        <i>{item.name}</i>
                      </span>
                    );
                  })}
              </div>
            </div>
            {/* content_5 */}
          </div>
        );
      }
    }
  )
);
