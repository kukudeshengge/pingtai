import React, { Component } from 'react'
import './index.scss';

export default class index extends Component {
    render() {
        return (
            <div className="sys_empty_wrap">
                <img
                  alt=""
                  src={require("@/assets/img/resource_center/resource_empty.png")}
                />
                <p>{this.props.content}</p>
              </div>
        )
    }
}
