import React from 'react';
import { Button } from 'antd-mobile'
import { withRouter} from 'react-router-dom'

import { observer,inject } from 'mobx-react'

@inject("LoginStore","UserInfoStore")
@observer
class MobxComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    getProps = () =>{
        console.log(this.props,this.props.UserInfoStore.getUserInfo())
    }
    setLoginMessage = (p)=>{
        this.props.LoginStore.setLoginMessage(p)
    }
    setFilterNum = (p) =>{
        this.props.UserInfoStore.setFilterNum(p)
    }
    render() {
        console.log('Mobx',this.props,this.props.LoginStore.loginMessage);
        console.log('HOME-Mobx:',this.props.UserInfoStore.filterNums)

        return (
            <div>
                <div>Mobx</div>
                <Button className="ly-btn-medium" onClick={this.props.UserInfoStore.setUserInfo.bind(this,{a:1})}>setUserInfo</Button>
                <Button className="ly-btn-medium" onClick={this.setLoginMessage.bind(this,666)}>loginStatus：{this.props.LoginStore.loginMessage}</Button>
                <Button className="ly-btn-medium" onClick={this.getProps}>getProps</Button>
                <Button className="ly-btn-medium" onClick={this.setFilterNum.bind(this,this.props.UserInfoStore.filter+1)}>setFilterNum</Button>
                <span style={{width:'0.16rem'}}>{this.props.UserInfoStore.userInfo.c}</span>
                <h4>{this.props.UserInfoStore.filterNums}</h4>
                <p>{this.props.LoginStore.loginMessage}</p>
            </div>
        );
    }
}

export default withRouter(MobxComp)