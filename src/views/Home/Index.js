import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button,WhiteSpace,Modal } from 'antd-mobile'
import { open_tips } from '../../store/actionCreator'
import '../../assets/css/HomeIndex.less'
class IndexC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        let that = this
        this.props.onEnter()()
        console.log('indexxx:',this.props);
        Modal.alert('通知','确定开启广告之旅？',[
            { text: '取消', onPress: ()=>that.props.handleOpenStatus(false) },
            { text: '好的', onPress: ()=>that.props.handleOpenStatus(true) },
        ])
    }
    goHomeIndex = () =>{
        this.props.history.push('/home/commentDetail')
    }
    render() {
        return (
            <div className="homeIndex">
                <div className="title">欢迎之家~</div>
                <WhiteSpace className="line-bg-white"></WhiteSpace>
                <div className="content">
                    <Button className="ly-btn-medium" onClick={this.goHomeIndex}>去home展示吧~</Button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      login:state.login.loginStatus,
      openStatus:state.login.openStatus
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        handleOpenStatus(flag){
            if(!flag){window.localStorage.removeItem('openTips')}else{window.localStorage.setItem('openTips',flag)}
            dispatch(open_tips(flag))
        }
    }
}
export default connect(mapStateToProps,mapDispathToProps)(withRouter(IndexC));