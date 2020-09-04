import React from 'react';
import Simditor from "simditor";
import {message} from 'antd';
import "simditor/styles/simditor.css";
import './index.less'


export default class Test extends React.Component {
    componentDidMount = () => {
        this.props.onRef && this.props.onRef(this);
        this.initEditor();
    };
    html = null;
    state = {
        test: true
    }
    initEditor = () => {
        let config = {
            placeholder: "内容",
            defaultImage: 'images/image.png',
            params: {},
            tabIndent: true,
            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'link', 'hr', 'image', 'indent', 'outdent', 'alignment'],
            upload: {
                url: "https://ts.zjyve.com/api/media/api/v1/media/addMedia", //文件上传的接口地址
                // params: {}, //指定文件上传接口的额外参数,上传的时候随文件一起提交
                fileKey: 'file', //服务器端获取文件数据的参数名
                connectionCount: 1,//文件上传的个数
                leaveConfirm: '正在上传文件'
            },
            toolbarFloat: true, //工具条浮动
            toolbarFloatOffset: 0, //工具条浮动偏移量，具体看官方文档
            toolbarHidden: false,
            pasteImage: false,
            cleanPaste: false,
            textarea: document.getElementById(this.props.id || "container") //这里textarea标签里的id对应
        };
        this.editor = new Simditor(config);// 初始化编辑器
        this.html = this.props.value;
        this.html && this.editor.setValue(this.props.value);//富文本初始内容
        this.editor.uploader.on('uploadsuccess',(res, file, mask) => {
            //获得上传的文件对象
            let img = file.img;
            if (mask.code === 0) {
                img.attr('src', 'https://ts.zjyve.com/api/media/api/v1/media/showThumbnail/' + mask.result.id);//重新给img标签的src属性赋值图片路径
            } else {
                message.error("图片上传失败,请重新上传");
            }
        });

        //监听改变富文本改变事件，更多事件看官方文档
        this.editor.on("valuechanged", (e, src) => {
            this.props.updateState(false)
            const that = this;
            this.html = this.editor.getValue().trim();
            this.props.onChange(this.html)
            setTimeout(function () {
                that.props.updateState(true)
            }, 1000);
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.html && this.state.test) {
            this.setState({test: false})
            this.html = prevProps.value;
            this.html && this.editor.setValue(prevProps.value);
        }
    }

    changeValue = html => {
        this.html = html;
        this.html && this.editor.setValue(this.html);
    }

    render() {
        return (
            <div className="editor-wrapper">
                {/*<textarea id={this.props.id || "container"} autoFocus></textarea>*/}
                <textarea id={this.props.id || "container"}></textarea>
            </div>
        );
    }

}

