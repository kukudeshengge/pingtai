
import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Button } from 'antd';


const mapStateToProps = ({SCHOOLSPACE}) => {
    return {
    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    
    };
}


export default connect(mapStateToProps, mapDispatchToProps) (class Schoolspace extends React.Component {
    render() {
        return (
            <div>   
                Schoolspace
            </div>
        )
    }
})
