import React, { Component } from 'react';
import './index.scss';
import RouteView from '@/router/router_view';
import  Heder from '../../components/headersSubset'
import  Footer from '../../components/footer'

export default class index extends Component {
    state={
    }
    render() {
        console.log("this.props",this.props)
        return (
            <div className='resource_main'>
                <div className="resource_header">
                    <Heder/>
                </div>
                <div className="resource_container">
                    <RouteView routers={this.props.routers} />
                </div>
                <div className="resource_footer">
                    <Footer/>
                </div>
            </div>
        )
    }
}
