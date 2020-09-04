
import React from 'react';
import './index.scss';
export default class EmptySchool extends React.Component {
    goBackPage=()=>{
        console.log('111111111111')
        window.history.back(-1)
    }
    render() {
        return (
            <div className="emptyschool">
            <div className="emptypage">
                <div>
                    <img className='emptyimg' src={require('../../assets/img/empty-page.png')}/>
                </div>
                <div className='empty-right'>
                    <h2 className='empty-name'>学校官网正在建设...</h2>
                    <p className='empty-info'>in construction...</p>
                    <button onClick={this.props.closeModal} className='empty-link'>返回</button>
                </div>
            </div>
            </div>
        )
    }
}
