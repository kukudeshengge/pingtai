
import React from 'react';
import './index.scss';
import Header from '../../components/headersIndex'
import  Footer from '../../components/footer'
import Empty from "../../components/emptypage";

export default class Recruitmentcenter extends React.Component {
    render() {
        return (
            <div className='resource_main'>
                <div className="" style={{height:"66px"}}>
                    <Header/>
                </div>
                <div>
                    <Empty/>
                </div>
                <div className="resource_footer" >
                    <Footer/>
                </div>
            </div>

        )
    }
}
