import React from 'react';
import './index.scss';
import {Col, Row, Card, Radio, Input, Button, Pagination,Empty} from 'antd';
import {Link} from 'react-router-dom';
import {getEducationInformationList} from '@/api/news'
import {getShowImage} from '@/api/media/image'
const {Search} = Input;

export default class VcoAnnounlisthome extends React.Component {
    state = {
      gongGaoList: [],
      homeData: sessionStorage["homeData"] ? JSON.parse(sessionStorage["homeData"]) : {},
      infoType: "通知公告",
      sysId: "CS"
    }

    componentDidMount() {
      this.getGongGaoList();
    }

    // 获取公告列表
    async getGongGaoList(id) {
      const {homeData, infoType, sysId,infoContent}=this.state
      const gongGaoList = await getEducationInformationList({
        "infoType": infoType,
        "sysId": sysId,
        "typeDetail": "",
        "unitId":homeData.schoolName,
        "infoContent":infoContent
      })
      if(gongGaoList&&gongGaoList.length>0){
        this.setState({
          gongGaoList,
          infoContent
        })
      }
    }
    reBytesStr=(str)=> {
        str=str.replace(/<\/?.+?>/g,"").replace(/ /g,"").replace(/&(\S*)?;/g,"")
        if((!str && typeof(str) != 'undefined')) {
            return '';
        }
        var num = 0;
        var str1 = str;
        var str = '';
        for(var i = 0, lens = str1.length; i < lens; i++) {
            num += ((str1.charCodeAt(i) > 255) ? 2 : 1);
            if(num > 360) {
                break;
            } else {
                str = str1.substring(0, i + 1);
            }
        }
        if(num>360){
            return str+"……";
        }else{
            return str
        }
    }

    // 替换字符串的所有f替换成e
    // myReplace = String.prototype.myReplace = function(f, e){//把f替换成e
    //   var reg=new RegExp(f,"g"); //创建正则RegExp对象
    //   return this.replace(reg,e);
    // }

  render() {
        const {gongGaoList}=this.state
        return (
                <div className="proclamation-list-wrap">
                    {/*<div className="banner-box">*/}
                    {/*    <img src={require("../../../../assets/img/school-space/notice-banner.png")} className="banner-img"/>*/}
                    {/*    <div className="banner-position Common-content">*/}
                    {/*        <p className="banner-tit">建设专属院校空间</p>*/}
                    {/*        <p className="banner-english">量身定制一体化职教解决方案</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="proclamation-content">
                        <div className="Common-content">
                        <Row className="proclamation-center"  style={{"margin-top":sessionStorage.getItem('headerType') === '1' ?"-80px":"14px"}}>
                            <Col span={22}>
                                    <div className="list-right-box">
                                            <p className="location-tit">当前位置：首页> 公告列表</p>
                                        {
                                          gongGaoList.map((item, index)=>{
                                                return <Row className="right-item-br" key={index}><Link to={`/academicspace/announpage?${encodeURI(JSON.stringify({id: item.id}))}`}>
                                                    <Col span={2}>
                                                        <div className="list-img">
                                                            <img src={require("../../../../assets/img/school-space/notice-icon.png")} />
                                                        </div>
                                                    </Col>
                                                    <Col span={18}>
                                                        <div className="proclamation-top">
                                                            <h3 className="proclamation-tit">{item.infoTitle}</h3>
                                                            <div className="vocational-desc"> </div>
                                                            <p>{this.reBytesStr(item.infoContent)}</p>
                                                        </div>
                                                    </Col>
                                                    <Col span={4}>
                                                        <p className="proclamation-date">{item.createTime.substring(0,16).replace("T"," ")}</p>
                                                    </Col>
                                                    </Link>
                                                </Row>
                                        })
                                        }
                                        {/*<div className="page_box" style={{backGround: '#f6f7fb', width: '100%'}}>*/}
                                        {/*    <Pagination*/}
                                        {/*        showSizeChanger*/}
                                        {/*        onShowSizeChange={this.changePageSize}*/}
                                        {/*        onChange={this.changeNum}*/}
                                        {/*        defaultCurrent={1}*/}
                                        {/*        pageSizeOptions={["12", "24", "36", "48"]}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                    </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                </div>
        )
    }
}
