import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button,WhiteSpace,Modal } from 'antd-mobile'
// import { open_tips } from '../../store/actionCreator'
import '../../assets/css/HomeIndex.less'
import { observer,inject } from 'mobx-react'

@inject("UserInfoStore")
@observer
class IndexC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        const that = this;
        this.props.onEnter()()
        console.log('indexxx:',this.props);
        !this.props.UserInfoStore.openBanner &&
        Modal.alert('通知','确定开启广告之旅？',[
            { text: '取消', onPress: ()=> that.props.UserInfoStore.setOpenBanner(false) },
            { text: '好的', onPress: ()=> that.props.UserInfoStore.setOpenBanner(true)  },
        ]);
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

export default withRouter(IndexC)