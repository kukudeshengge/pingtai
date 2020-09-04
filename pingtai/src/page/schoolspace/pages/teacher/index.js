
import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Empty from "../../../../components/emptypage";


const mapStateToProps = ({TEACHER}) => {
    return {
    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    
    };
}


export default connect(mapStateToProps, mapDispatchToProps) (class Teacher extends React.Component {
    render() {
        return (
            <div>
                <Empty/>
            </div>
        )
    }
})
