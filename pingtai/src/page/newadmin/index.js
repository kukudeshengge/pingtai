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
} from 'antd';
import {UploadOutlined, InboxOutlined} from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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

export default class Addnaews extends React.Component {
    state = {
        loading: false,
    };
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

    render() {
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
        const uploadButton = (
            <div>上传图片</div>
            /*  <div>
                  {this.state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
                  <div className="ant-upload-text">Upload</div>
              </div>*/
        );
        const {imageUrl} = this.state;
        return (
            <div>
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        ['input-number']: 3,
                        ['checkbox-group']: ['A', 'B'],
                        rate: 3.5,
                    }}
                >
                    <Form.Item name="form" label="资讯来源" rules={[{required: true, message: '请输入资讯来源'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="author" label="资讯作者" rules={[{required: true, message: '请输入资讯作者'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="select"
                        label="资讯类型"
                        hasFeedback
                        rules={[{required: true, message: '请选择资讯分类'}]}
                    >
                        <Select placeholder="Please select a country">
                            <Option value="china">China</Option>
                            <Option value="usa">U.S.A</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="newsname" label="资讯标题" rules={[{required: true, message: '请输入资讯标题'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="radio-group" label="是否置顶">
                        <Radio.Group>
                            <Radio value="a">是</Radio>
                            <Radio value="b">否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="资讯封面">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
