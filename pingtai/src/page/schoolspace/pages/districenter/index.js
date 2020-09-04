/*eslint eqeqeq: ["off", "smart"]*/
import React, {Component} from 'react';
import {
    Row,
    Col,
    // Tabs,
    // BackTop,
    // Input, Radio,
    // Progress,
    Card, Empty
} from 'antd';

import echarts from 'echarts';
import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';
import {geoCoordMap, provienceData} from "./geo";
import { provinceList, cityCount } from '@/api/schoolspace/index';
import {Link} from "react-router-dom";
// const {confirm} = Modal;
// const {Option} = Select;
// const {TreeNode} = Tree;
// const { TabPane } = Tabs;
// const { Search } = Input;
class Doublemonitoring extends Component {
    state = {
        value: 1,
        tabVal: "2020",
        convertData: [],
        cityName: '',
        cityNum: '',
        schoolType: '',
        allProvinceList: [],
        data1Map:[]
    };

    componentDidMount() {
        this.provinceList();
        // this.initalECharts()
    }
    onChangeSelect = async () => {
        let name = this.state.cityName
        let cityInfo = await cityCount({province: "北京市", type: "GZ"});
        this.setState({
            cityName: cityInfo.provinceName,
            cityNum: cityInfo.num,
        })
    }

    provinceList  = () => {
        provinceList({}).then(res => {
            this.setState({
                allProvinceList: res
            },() => {
                this.initalECharts()
            })
        })
    }
    //地图
    initalECharts() {
        let {allProvinceList} = this.state;
        const data1 = [
            { name: '黑龙江', area: '东北大区', type: 'areaCenterCity', value: 343 },
            { name: '吉林', area: '东北大区', type: 'areaCenterCity', value: 294 },
            { name: '辽宁', area: '东北大区', type: 'areaCenterCity', value: 438 },
            { name: '内蒙古', area: '其他', type: 'areaCenterCity', value: 325 },
            { name: '北京', area: '华北大区', type: 'areaCenterCity', value: 137 },
            { name: '天津', area: '华北大区', type: 'areaCenterCity', value: 89 },
            { name: '河北', area: '华北大区', type: 'areaCenterCity', value: 778 },
            { name: '山东', area: '华北大区', type: 'areaCenterCity', value: 790 },
            { name: '山西', area: '华北大区', type: 'areaCenterCity', value: 491 },
            { name: '江苏', area: '华东大区', type: 'areaCenterCity', value: 717 },
            { name: '上海', area: '华东大区', type: 'areaCenterCity', value: 85 },
            { name: '浙江', area: '华东大区', type: 'areaCenterCity', value: 566  },
            { name: '福建', area: '华南大区', type: 'areaCenterCity', value: 284  },
            { name: '广东', area: '华南大区', type: 'areaCenterCity', value: 627 },
            { name: '海南', area: '华南大区', type: 'areaCenterCity', value: 91  },
            { name: '台湾', area: '其他', type: 'areaCenterCity', value: 0  },
            { name: '香港', area: '其他', type: 'areaCenterCity', value: 0 },
            { name: '澳门', area: '其他', type: 'areaCenterCity', value: 0  },
            { name: '河南', area: '华北大区', type: 'areaCenterCity', value: 1022  },
            { name: '安徽', area: '华中大区', type: 'areaCenterCity', value: 625  },
            { name: '江西', area: '华中大区', type: 'areaCenterCity', value: 552  },
            { name: '广东', area: '华南大区', type: 'areaCenterCity', value: 627 },
            { name: '陕西', area: '华西大区', type: 'areaCenterCity', value: 428  },
            { name: '湖北', area: '华中大区', type: 'areaCenterCity', value: 495  },
            { name: '湖南', area: '华中大区', type: 'areaCenterCity', value: 755  },
            { name: '广西', area: '华南大区', type: 'areaCenterCity', value: 405  },
            { name: '宁夏', area: '华西大区', type: 'areaCenterCity', value: 52  },
            { name: '重庆', area: '华西大区', type: 'areaCenterCity', value: 300  },
            { name: '贵州', area: '华西大区', type: 'areaCenterCity', value: 281  },
            { name: '四川', area: '华西大区', type: 'areaCenterCity', value: 641 },
            { name: '云南', area: '华西大区', type: 'areaCenterCity', value: 318 },
            { name: '甘肃', area: '华西大区', type: 'areaCenterCity', value: 256  },
            { name: '青海', area: '其他', type: 'areaCenterCity', value: 48  },
            { name: '西藏', area: '其他', type: 'areaCenterCity', value: 16  },
            { name: '新疆', area: '其他', type: 'areaCenterCity', value: 211  },
            { name: '南海诸岛', area: '其他', type: 'areaCenterCity', value: 0  },
        ];
        let data = [];
        let cityArr = ["北京", "上海", "天津", "重庆"]
        // let tsCityArr = [ "广西壮族自治区", "内蒙古自治区", "宁夏回族自治区", "西藏自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区" ]
        let tsCityArr = [ "广西", "内蒙古", "宁夏", "西藏", "新疆"]

        for (let i = 0; i < data1.length; i++) {
            let oldProvince = data1[i]
            let curProvince = data1[i].name;
            if(cityArr.indexOf(curProvince) > 0) {
                curProvince = curProvince + "市"
            }
            if(tsCityArr.indexOf(curProvince) > 0) {
                if(curProvince ==='广西'){
                    curProvince = "广西壮族自治区";
                }else if(curProvince ==='内蒙古' || curProvince ==='西藏' ){
                    curProvince = curProvince + "自治区";
                }else if(curProvince ==='宁夏'){
                    curProvince = "宁夏回族自治区";
                }else if(curProvince ==='新疆'){
                        curProvince = "新疆维吾尔自治区";
                }
            }
            if (cityArr.indexOf(curProvince) < 0 && tsCityArr.indexOf(curProvince) < 0) {
                curProvince = curProvince + "省"
            }
            cityCount({province: curProvince, type: "ZZ"}).then(res => {
                // let obj = {
                //     name: oldProvince.name,
                //     area: oldProvince.area,
                //     type: oldProvince.type,
                //     value: res.num
                // };
                // data.push(obj);
                oldProvince.value = res.num;
                console.log('oldProvince 0009', oldProvince)
            }, () => {
            });
        }
        this.setState({
            data1Map:data1
        },()=>{
            console.log('7779990', this.state.data1Map)
        })
        echarts.registerMap('china', geoJson);
        for (const item of provienceData) {
            if (item.area === '东北大区') {
                item.itemStyle = {
                    normal: {
                        areaColor: '#000',
                    },
                    emphasis: {
                        areaColor: '#3CA2FC',
                    }
                }
            } else if (item.area === '华北大区') {
                item.itemStyle = {
                    normal: {
                        areaColor: '#6CAFBE',
                    },
                    emphasis: {
                        areaColor: '#6CAFBE',
                    }
                }
            } else if (item.area === '华中大区') {
                item.itemStyle = {
                    normal: {
                        areaColor: '#ADD03C',
                    },
                    emphasis: {
                        areaColor: '#ADD03C',
                    }
                }
            } else if (item.area === '华东大区') {
                item.itemStyle = {
                    normal: {
                        areaColor: '#A13614',
                    },
                    emphasis: {
                        areaColor: '#A13614',
                    }
                }
            } else if (item.area === '华西大区') {
                item.itemStyle = {
                    normal: {
                        areaColor: '#FFBA00',
                    },
                    emphasis: {
                        areaColor: '#FFBA00',
                    }
                }
            } else if (item.area === '华南大区') {
                item.itemStyle = {
                    normal: {
                        areaColor: '#FFD300',
                    },
                    emphasis: {
                        areaColor: '#FFD300',
                    }
                }
            } else if (item.area === '南海诸岛') {
                item.itemStyle = {
                    normal: {
                        borderColor: '#fff', // 区域边框颜色
                        areaColor: '#fff', // 区域颜色
                    },
                    emphasis: {
                        show: false,
                        // borderColor: '#fff',
                        // areaColor:"#fff",
                    }
                }
            } else {
                item.itemStyle = {
                    normal: {
                        areaColor: '#D9D9D9',
                    },
                    emphasis: {
                        areaColor: '#D9D9D9',
                    }
                }
            }
        }
        const myChart = echarts.init(document.getElementById('mainMap'));
        this.state.data1Map && myChart.setOption({
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter(params, ticket, callback) {
                    var tipHtml = '';
                    // cityCount({province: params.name, type: "GZ"}).then(res => {
                    //     num = res.num;
                    // })
                    tipHtml = '<div class="maptit">' +
                        '<h5 class="h5">'+params.name+'&nbsp'+'</h5>'+
                        '<p class="h6">'+"中职院校："+ params.value+' </p>' +
                    '</div>';
                    return tipHtml;
                },
                backgroundColor:'none', // 提示标签背景颜色
                textStyle: { color: '#fff' } ,// 提示标签字体颜色
            },
            dataRange: {
                show:false,
                x: 'left',
                y: 'bottom',
                splitList: [
                    {start: 0, end: 100},
                    {start: 100, end: 200},
                    {start: 200, end: 300},
                    {start: 300, end: 400},
                    {start: 400, end: 100000},
                ],
                color: ['#5DC87E', '#79D2AE', '#9EE7C9','#D1F1E4','#EBFDF4']
            },
            grid: {
                left: '10%',
                right: '10%',
                top: '0',
                bottom: '10%',
                containLabel: true
            },
            geo: {
                show: true,
                map: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                    },
                },
                roam: false,//鼠标缩放
                itemStyle: {
                    normal: {
                        areaColor: '#8EC9FF',
                        borderColor: '#1180c7',
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                    }
                },
            },
            series: [
                {
                    name: '中国地图',
                    type: 'map',
                    roam: true,
                    map: 'china',
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    geoIndex: 0,
                    aspectScale: 0.9, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    data: data1
                },
            ]
        })

        myChart.on('click', params => {
            if (params.name === '海南') {
                this.props.history.push('/Dashboard/map2')
            }
        });
    }

    convertData(data) {
        const res = [];
        for (let i = 0; i < data.length; i++) {
            const geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].area),
                    area: data[i].area,
                    type: data[i].type,
                    InValue: data[i].value
                });
            }
        }
        return this.setState({
            convertData: res
        })
    }

    render() {//Practicallist,tabVal,
        const {convertData} = this.state
        return (
            <div>
                <div className='Collegescenter-banner'>
                    <div className='Common-content'>
                        <h2 className='detail-banner-name'>中职院校 <span  className='crumbs-menu'><Link to="/schoolspace/vocational">首页</Link> / <Link to="/schoolspace/secondary">中职院校</Link> /中职院校分布图</span></h2>
                    </div>
                </div>
                <div className="mainMap">
                    <div id="mainMap" style={{width: '100vm', height: '900px'}}>
                    </div>
                </div>
            </div>
        )
    }
}

export default Doublemonitoring;
