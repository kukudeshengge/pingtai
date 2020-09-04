import React, {Component} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {Tabs, Row, Col, Radio, Card} from 'antd';
import {secondSelect,getFirstSelect,citySelect} from '@/api/schoolspace'
import {logger} from "redux-logger/src";

const {TabPane} = Tabs;

@withRouter
class Header extends Component {
    state = {
        educationLevel:[],//办学层次
        educationLevelVal:'',//办学层次
        educationLevelVal1: '',
        schoolTypeList:[],//学校类型
        schoolTypeVal:'',//学校类型
        cityList:[],//城市列表
        cityListVal:'',//城市列表
    };

    componentDidMount() {
        this.getFirstSelect()
        this.secondSelect()
    }
    getFirstSelect = async () => {
        const {schoolType}=this.props
        let educationLevel = await getFirstSelect({type:this.props.schoolType});
        educationLevel&&this.setState({
            educationLevel,
            educationLevelVal:schoolType=="GZ"?educationLevel[0]&&educationLevel[0]:schoolType=="ZZ"? educationLevel[0]&&educationLevel[0]: "",
        },()=>{
            this.citySelect().then(()=>{
                const {cityListVal,educationLevelVal,schoolTypeVal}=this.state
                this.props.getClassify(cityListVal,educationLevelVal,schoolTypeVal)
            })
            console.log("educationLevelVal111",this.state.educationLevelVal1)
        })
    }
    secondSelect = async () => {
        let schoolTypeList = await secondSelect({type:this.props.schoolType});
        this.setState({
            schoolTypeList,
            schoolTypeVal:''
        })
    }
    citySelect = async () => {
        const {schoolTypeVal,educationLevelVal}=this.state
        let cityList = await citySelect({'type':this.props.schoolType,'firstName': educationLevelVal, 'secondName': schoolTypeVal,});
        this.setState({
            cityList,
        })
    }
    onChangeSelect=(type,val)=>{
        console.log("val11",val)
        if(type==1){
            this.setState({
                educationLevelVal:val.target.value
            },()=>{
                this.citySelect()
                this.props.getClassify(this.state.cityListVal,this.state.educationLevelVal,this.state.schoolTypeVal)
            })}
       if(type==2){
            this.setState({
                schoolTypeVal:val.target.value
            },()=>{
                this.citySelect()
                this.props.getClassify(this.state.cityListVal,this.state.educationLevelVal,this.state.schoolTypeVal)
            })}
      if(type==3){
            this.setState({
                cityListVal:val.target.value
            },()=>{
                console.log("cityListVal",this.state.cityListVal)
                this.props.getClassify(this.state.cityListVal,this.state.educationLevelVal,this.state.schoolTypeVal)
            })}

    }



    render() {
        const {educationLevel,educationLevelVal,schoolTypeList,schoolTypeVal,cityList,cityListVal}=this.state
        const {schoolType}=this.props
        return (
            <Card className="center-content-paper">
                <Row className="paper-common" id="paperCommon">
                    <Col span={2} className="paper-year">
                        {schoolType=="GZ"?"":schoolType=="DH"?"计划分类":schoolType=="ZZ"?"":""}
                    </Col>
                    <Col span={22} className="paper-year-right">
                        {schoolType=="GZ"?"":schoolType=="DH"?<Radio.Group  defaultValue={educationLevelVal}  onChange={(val)=>{this.onChangeSelect(1,val)}}>
                            {schoolType=="GZ"?"":schoolType=="DH"?<Radio.Button key={-1} value={''}>全部</Radio.Button>:""}
                            {educationLevel&&educationLevel.map((item,index)=>{
                                return(
                                    <Radio.Button key={index} value={item}>{item}</Radio.Button>
                                )
                            })}
                        </Radio.Group>:""}
                    </Col>
                </Row>
                <Row className="paper-common">
                    <Col span={2} className="paper-year">
                        {schoolType=="GZ"?"学校类型":schoolType=="DH"?"分档分类":"学校类型"}
                    </Col>
                    <Col span={22} className="paper-year-right">
                        <Radio.Group  defaultValue={schoolTypeVal}   onChange={(val)=>{this.onChangeSelect(2,val)}}>
                            <Radio.Button key={-1} value={''}>全部</Radio.Button>
                            {schoolTypeList&&schoolTypeList.map((item,index)=>{
                                return(
                                    <Radio.Button key={index} value={item}>{item}</Radio.Button>
                                )
                            })}
                        </Radio.Group>
                    </Col>
                </Row>
                <Row className="paper-common">
                    <Col span={2} className="paper-year">
                        所属省市
                    </Col>
                    <Col span={22} className="paper-year-right">
                        <Radio.Group   defaultValue={cityListVal}  onChange={(val)=>{this.onChangeSelect(3,val)}}>
                            <Radio.Button key={-1} value={''}>全部</Radio.Button>
                            {cityList&&cityList.map((item,index)=>{
                                return(
                                      <Radio.Button key={index} value={item.fullName}>{item.fullName}{item.num&&<span>（{item.num}）</span>}</Radio.Button>
                                )
                            })}
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default Header
