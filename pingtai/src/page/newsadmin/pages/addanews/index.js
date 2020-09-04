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
    Cascader,
    Modal,
    Icon,
    Row,
    Col,
} from 'antd';
import Editor from '../../../../components/Editor/simditor-editor-model'
import { imgUrl } from '@/config/secret.js'
// import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {addInformation,getInfoLabelList} from '@/api/news/index/';
const {Option} = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Addanews extends React.Component {
    state = {
        state:true,
        loading: false,
        fileList: [],
        imageUrl: null,
        acceptType: ".jpeg,.png,.gif,.jpg",
        newsCategory: [],
        sysId:"",
        typeVal:"",
        unitIdType:""
    };
    componentDidMount() {
        // this.getInfoList();
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    //分类下拉框数据
    getInfoLabelList = (value) => {
        this.setState({
            typeVal:false,
        })
        if (value === "PS"){
            this.state.unitIdType = false
        }
        if (value === "CS"){
            this.state.unitIdType = true
        }
        getInfoLabelList(value).then(res => {
            if (res) {
                this.setState({newsCategory: res})
            }
        })
    }
    addInformation = async () => {
        const {sysId,state} = this.state;
        if(state){
            await this.setState({state:false});
            this.props.form.validateFields(async (err, obj) => {
                if (!err) {
                    await this.setState({state: false})
                    let serviceImg = null
                    if (obj.imgId && obj.imgId.file && obj.imgId.file.response && obj.imgId.file.response.result.id) {
                        serviceImg = obj.imgId.file.response.result.id
                    }
                console.log("obj",obj)
                        await addInformation({
                            recommend:0,
                            sysId: obj.sysId,
                            unitId:obj.unitId,
                            infoOrigin:obj.infoOrigin,
                            author: obj.author,
                            infoType:obj.infoType[0],
                            typeDetail:obj.infoType[1]?obj.infoType[1]:obj.typeDetail,
                            infoTitle:obj.infoTitle,
                            isTop:obj.isTop,
                            imgId:serviceImg,
                            infoContent:obj.infoContent

                        }).then(e => {
                            console.log('e',e)
                            if(e){
                                message.success("保存成功")
                                window.location.reload();
                            }
                            // message.destroy();

                        })
                }
            })
        }
        else {
            message.destroy();
            // message.warning("正在输入富文本，请稍后保存")
        }
    }
    handleCancel = () => this.setState({previewVisible: false});
    beforefn = (file) => {
        const {acceptType} = this.state;
        const acceptTypeList = acceptType.split(",");
        const fileName = file.file.name;
        const suffix = fileName.substring(
            fileName.lastIndexOf("."),
            fileName.length
        );
        const fileTypeStatus = acceptTypeList.includes(suffix);
        if (!fileTypeStatus) {
            message.error("不支持的文件格式");
            return;
        }
        const isLt2M = file.file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error("文件不能大于5M");
            return false;
        } else {
            /* this.setState({ loading: true });*/
            this.fileChange(file);
        }
    };
    fileChange = (info) => {
        if (info) {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map((file) => {
                if (file.response) {
                    file.url = file.response.url;
                }
                return file;
            });
            this.setState({fileList});

            if (info.file.status === "done") {
                getBase64(info.file.originFileObj, (imageUrl) =>
                    this.setState({
                        imageUrl,
                        loading: false,
                    })
                );
                if (info.file.response.code === 0) {
                    const result = info.file.response.result;
                    this.setState({
                        result: result,
                        bannerImg: result.id,
                        fileTitle: "",
                        remove: false
                        /*fileTitle:info.file.response.result.fileName*/
                    });
                    message.success(`${info.file.name} 上传成功`);
                } else {
                    this.setState({
                        result: {},
                        fileList: [],
                        bannerImg: undefined,
                        fileTitle: "",
                    });
                    message.error(info.file.response.message);
                }
            } else if (info.file.status === "error") {
                this.setState({
                    result: {},
                    fileList: [],
                    bannerImg: undefined,
                });
                this.props.form.setFieldsValue({fileObj: undefined});
                message.error(`${info.file.name} 上传失败`);
            }
        }
    };
    uploadRemove = (file) => {
        this.state.fileTitle = "";
        this.setState({
            result: {},
            bannerImg: undefined,
            remove: true
        });
    };
    handlePreview = async file => {
        this.setState({
            previewVisible: true,
        });
    };
    updateState =(state)=>{
        this.setState({state})
    }
    hanldeType=(val)=>{
        this.setState({
            typeVal:val&&val[0]&&!val[1]&&true
        },()=>{
            console.log("typeVal",this.state.typeVal)})
        console.log("val",val)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        this.props.form.getFieldValue("infoTitle")
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const normFile = e => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };
        const onFinish = values => {
            console.log('Received values of form: ', values);
        };
        const props = {
            // action: `${imgUrl}/api/media/api/v1/media/addMedia`,
             action: "https://ts.zjyve.com/api/media/api/v1/media/addMedia",
            onChange: this.beforefn,
            onRemove: this.uploadRemove,
        };
        const uploadButton = (
            <div>
                {/*{this.state.loading ? <LoadingOutlined/> : <PlusOutlined/>}*/}
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        const {imageUrl,fileList,newsCategory} = this.state;
        return (
            <div>
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    // onFinish={onFinish}
                    // initialValues={{
                    //     ['input-number']: 3,
                    //     ['checkbox-group']: ['A', 'B'],
                    //     rate: 3.5,
                    // }}
                >
                    <Form.Item
                        name="select"
                        label="系统标识"
                        hasFeedback
                    >
                        {getFieldDecorator(`sysId`, {
                            initialValue: '',
                        })(
                            <Select placeholder="请选择系统标识" onChange={(value) => this.getInfoLabelList(value)}>
                                <Option value="PS">门户</Option>
                                <Option value="CS">院校空间</Option>
                            </Select>
                        )}
                    </Form.Item>
                    {this.state.unitIdType&& <Form.Item
                        name="select"
                        label="学校名字"
                        hasFeedback
                    >
                        {getFieldDecorator(`unitId`, {
                            initialValue: '',
                        })(
                            <Select placeholder="请选择学校名字">
                                <Option value="常州信息职业技术学院">常州信息职业技术学院</Option>
                                <Option value="广州番禺职业技术学院">广州番禺职业技术学院</Option>
                            </Select>
                        )}
                    </Form.Item>}
                    <Form.Item name="form" label="资讯来源" >
                        {getFieldDecorator(`infoOrigin`, {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item name="author" label="资讯作者" >
                        {getFieldDecorator(`author`, {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="select"
                        label="资讯类型"
                        // hasFeedback
                    >
                        {getFieldDecorator(`infoType`, {
                            initialValue: '',
                        })(
                            <Cascader onChange={this.hanldeType}
                                options={newsCategory}
                            />
                        )}
                        {/*<Select placeholder="Please select a country">*/}
                        {/*    <Option value="china">China</Option>*/}
                        {/*    <Option value="usa">U.S.A</Option>*/}
                        {/*</Select>*/}
                    </Form.Item>
                    {this.state.typeVal&& <Form.Item name="typeDetail" label="类型明细" >
                        {getFieldDecorator(`typeDetail`, {
                            initialValue: '',
                        })(
                            <Input/>

                        )}
                    </Form.Item>}
                    <Form.Item name="newsname" label="资讯标题" >
                        {getFieldDecorator(`infoTitle`, {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item name="radio-group" label="是否置顶">
                        {getFieldDecorator(`isTop`, {
                            initialValue: '',
                        })(
                            <Radio.Group>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="资讯封面">
                        <Form.Item className="item-left">
                            {getFieldDecorator(`imgId`, {
                                initialValue: '',
                            })(
                                <Upload
                                    // showUploadList={false}
                                    name="file"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    {...props}
                                    onPreview={this.handlePreview}
                                    fileList={fileList}
                                >
                                    {fileList.length >= 2 ? null : uploadButton}
                                </Upload>
                            )}
                            <Modal visible={this.state.previewVisible} footer={null} maskClosable={false}
                                   onCancel={this.handleCancel}
                                   closable={true}
                                   icon={<Icon type="close"/>
                                   }
                                   className='modal-btn add-modal'

                            >
                                <img alt="example" style={{padding: '20px 0', width: '100%'}} src={imageUrl}/>
                            </Modal>
                        </Form.Item>
                        <span className="span-p">
                                        支持jpg、png、gif、bmp图片格式，需小于5M&nbsp;&nbsp;建议图片尺寸：366*196px
                         </span>
                        {/*<Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>*/}
                        {/*    <Upload*/}
                        {/*        name="avatar"*/}
                        {/*        listType="picture-card"*/}
                        {/*        className="avatar-uploader"*/}
                        {/*        showUploadList={false}*/}
                        {/*        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                        {/*        beforeUpload={beforeUpload}*/}
                        {/*        onChange={this.handleChange}*/}
                        {/*    >*/}
                        {/*        {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}*/}
                        {/*    </Upload>*/}
                        {/*</Form.Item>*/}
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="咨询内容">
                        <Form.Item>
                            {/*{getFieldDecorator(`infoContent`, {*/}
                            {/*    initialValue: '',*/}
                            {/*    rules: [{required: true, message: '是否置顶'}]*/}
                            {/*})(*/}
                            {/*    <Editor id={`option-content-${new Date().getTime()}`} updateState={this.updateState}/>*/}
                            {/*)}*/}
                            {getFieldDecorator(`infoContent`, {
                                initialValue: '',
                            })(
                                <Editor id={`option-content-${new Date().getTime()}`} updateState={this.updateState}/>
                            )}
                        </Form.Item>
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit" onClick={this.addInformation}>
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
Addanews = Form.create()(Addanews);
export default Addanews;
