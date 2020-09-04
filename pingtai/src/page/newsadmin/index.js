import React from 'react';
import './index.scss';
import {

    Form,
    Select,
    Input,
    Radio,
    Button,
    message,
    Upload,
    Row,
    Col,
    Table
} from 'antd';
import {UploadOutlined, InboxOutlined} from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {getInformationList} from '@/api/news/index/';
const {Option} = Select;


export default class Newsadmin extends React.Component {
    state = {
        loading: false,
        newsList: [],
        columns: [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
                render:(text,record,index)=>`${index+1}`
            },
            {
                title: '标题',
                dataIndex: 'infoTitle',
                key: 'infoTitle'
            },{
                title: '咨询类型',
                dataIndex: 'infoType',
                key: 'infoType'
            },
            {
                title: '操作',
                dataIndex: 'oper',
                key: 'oper',
                render: (text, record) => {
                    return <div className='oper'>
                        <span >删除</span>
                    </div>
                }
            }],

};
    componentDidMount() {
        this.selectNews()
    }
    async selectNews () {
        let { pageNum,pageSize,sysId} = this.state;
        const news = await getInformationList({sysId:"PS",pageNum:pageNum,pageSize:pageSize});
        console.log("news",news)
        if(news){
            this.setState({
                newsList: news.data,
                pageNum:news.pageNum,
                pageSize:news.pageSize,
                total:news.total,
            })
        }
    }

    render() {
        let { columns,newsList,total,pageNum,pageSize,titleName,tableLoading} = this.state;
        return (
            <div>
                <Table dataSource={newsList} columns={columns} />;
            </div>
        )
    }
}
