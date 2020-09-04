import React, {Component} from 'react';
import './index.scss';
import {withRouter} from "react-router-dom";
import {Tabs, Row, Col, Radio, Card} from 'antd';
import {citySelect,catagorySelectlist} from '@/api/certificate';

@withRouter
class Header extends Component {
    state = {
        schoolTypeList:[],//学校类型
        schoolTypeVal:'',//学校类型值
        cityList:[],//城市列表
        cityListVal:'',//城市列表值
    };
    componentDidMount() {
        this.catagorySelectlist()
        this.citySelect()
    }
    catagorySelectlist = async () => {
        let schoolTypeList = await catagorySelectlist();
        this.setState({
            schoolTypeList,
            schoolTypeListlVal:''
        },()=>{
        })
    }
    citySelect = async () => {
        let cityList = await citySelect(this.state.schoolTypeVal);
        this.setState({
            cityList,
        })
    }
    onChangeSelect=(val)=>{
        const {cityListVal}=this.state
        this.setState({
            schoolTypeVal:val.target.value
        },()=>{
            console.log("sc6666666666666666666hoolTypeVal",this.state.schoolTypeVal)
            console.log("6666666666",this.state.cityListVal)
            this.citySelect()
            this.props.getClassify(this.state.cityListVal,this.state.schoolTypeVal)
        })
    }
    onChangeSecondSelect=(val)=>{
        this.setState({
            cityListVal:val.target.value
        },()=>{
            this.props.getClassify(this.state.cityListVal,this.state.schoolTypeVal)
        })
    }
    render() {
        const {schoolTypeList,schoolTypeVal,cityList,cityListVal}=this.state
        const {schoolType}=this.props
        return (
            <Card className="center-content-paper">
                <Row className="paper-common" id="paperCommon">
                    <Col span={2} className="paper-year">
                        学校类型
                    </Col>
                    <Col span={22} className="paper-year-right">
                        <Radio.Group  defaultValue={schoolTypeVal}  onChange={this.onChangeSelect}>
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
                        <Radio.Group   defaultValue={cityListVal} onChange={this.onChangeSecondSelect} >
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
