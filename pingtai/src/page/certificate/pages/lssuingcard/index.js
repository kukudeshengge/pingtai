import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import {certUnitCitySelect, queryOrgCollege, queryOrgList} from "@/api/certificate";
import { imgUrl } from '@/config/secret.js'
export default class IssCard extends React.Component {
    state = {
        querylist:[],
        orgCollegeList:[],
        remarkShow:false,
        pageNum:1,
        pageSize:12,
        total:0,
    }
    componentDidMount() {
        this.getIssuingList(this.props.item.id)
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.item.id!=this.props.item.id){
            this.getIssuingList(nextProps.item.id)
            console.log("nextPropsnextPropsnextProps",nextProps)
        }
    }
    allHeight=()=>{
        const {orgCollegeList}=this.state
        const {item}=this.props
        orgCollegeList.map((todo,index)=>{
           let ele=document.getElementById(`cardId${item.id}${index}`)
           let  spreadEle=document.getElementById(`spread${item.id}${index}`)
            if(ele.offsetHeight>80){
                ele.style.height=80+"px"
                spreadEle.style.display="block";
            }
        })
    }
    //展开全部
    showAllText=(key)=>{
        const {item}=this.props
        let ele=document.getElementById(`cardId${item.id}${key}`)
        let packupEle=document.getElementById(`packup${item.id}${key}`)
        let  spreadEle=document.getElementById(`spread${item.id}${key}`)
        ele.style.height=''
        packupEle.style.display="block"
        spreadEle.style.display="none"
    }
    //收起全部
    packUpText=(key)=>{
        const {item}=this.props
        let ele=document.getElementById(`cardId${item.id}${key}`)
        let packupEle=document.getElementById(`packup${item.id}${key}`)
        let  spreadEle=document.getElementById(`spread${item.id}${key}`)
        ele.style.height=80+'px'
        packupEle.style.display="none"
        spreadEle.style.display="block"
    }

    async  getIssuingList(id){
        let orgCollegeList = await queryOrgCollege({"orgId":id});
      this.setState({
          orgCollegeList}
          ,()=>{
          this.allHeight()
          })
    }
    toggleForm=()=>{
        const  {remarkShow}=this.state
        this.setState({
            remarkShow:!remarkShow
        })
    }
    render() {
        const {orgCollegeList,remarkShow,cityListVal,cityList} =this.state
        const {item,index}=this.props
        return (
                            <div className='lilotpage-list' key={index}>
                                <div  className='lilotpage-top'>
                                    <span className="icon">
                                        <img  src={`${imgUrl}/api/pt/api/v1/media/showThumbnail/${item.logoFileId}`} />
                                    </span>
                                    <h2 className='lilotpage-name'>{item.orgName}</h2>
                                </div>
                                <div className='lilotpage-cont'>
                                    <div >
                                        <label className='lable-name'>机构简介：</label>
                                        <div style={{"-webkit-line-clamp":!remarkShow?"2":""}} className='cont-right cont-right-clamp'>{item.remark}</div>
                                    </div>

                                </div>
                                {remarkShow? <Link className='lilotpage-link' onClick={this.toggleForm}>收起详情</Link>:<Link className='lilotpage-link' onClick={this.toggleForm}>查看详情</Link>}

                                <div className='lilotpage-cont lilotpage-conta'>
                                    <label className='lable-name'>试点证书：</label>
                                    <div className='cont-right'>
                                        {item.certArr.map((certItem, index) => {
                                            return (
                                                <span className='zs-namelist'>{certItem}</span>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="lilotpage-cont lilotpage-bottom">
                                    <label className='lable-name'>试点院校：</label>
                                    <div className='cont-right'>
                                        {orgCollegeList.map((todo,key)=> {
                                                return (
                                                    <div className="ul-div">
                                                        <h3>{todo.collegeType}（{todo.collegeNum}所)</h3>
                                                        <ul className="list-ul" id={`cardId${item.id}${key}`}>
                                                            <span style={{"display":"none"}}  id={`spread${item.id}${key}`} className='lilotpage-link' onClick={()=>{this.showAllText(key)}}>展开全部</span>
                                                            <span style={{"display":"none"}}  id={`packup${item.id}${key}`} className='lilotpage-link' onClick={()=>{this.packUpText(key)}}>收起全部</span>
                                                            {todo.collegeList.map((secondTiem,m)=>{
                                                                return <li>{secondTiem}</li>
                                                            })}

                                                        </ul>
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>

        )
    }
}
