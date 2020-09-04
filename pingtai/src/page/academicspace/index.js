import React, { Component } from 'react';
import './index.scss';
import RouteView from '@/router/router_view';
import Footer from '../../components/footer';
import HeaderOne from '@/components/schoolHeader/headerOne.js';
import HeaderTwo from '@/components/schoolHeader/headerTwo.js';

export default class Academicspace extends Component {
    render() {
        let type = sessionStorage.headerType ? sessionStorage.headerType : '';
        return (
            <div className='resource_main resource_mainlist'>
                <div className="schoolHeader" style={{ height: type === '2' ? '276px' : '335px' }}>
                    {
                        type === '1' ? <HeaderOne /> : <HeaderTwo />
                    }
                </div>           
                <div className="resource_container academicspace_container">
                    <RouteView routers={this.props.routers} />
                </div>
                <div className="resource_footer">
                    <Footer />
                </div>
            </div>
        )
    }
}
