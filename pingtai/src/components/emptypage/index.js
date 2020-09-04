
import React from 'react';
import './index.scss';
export default class EmptyPage extends React.Component {
    goBackPage=()=>{
        console.log('111111111111')
        window.history.back(-1)
    }
    render() {
        return (
            <div className="emptypagebox">
            <div className="emptypage">
                <div>
                    <img className='emptyimg' src={require('../../assets/img/empty-page.png')}/>
                </div>
                <div className='empty-right'>
                    <h2 className='empty-name'>系统正在建设中...</h2>
                    <p className='empty-info'>in construction...</p>
                    <button onClick={this.goBackPage} className='empty-link'>返回上一页</button>
                </div>
            </div>
            </div>
        )
    }
}
