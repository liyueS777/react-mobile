import React from 'react';
import { Button } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

// import { check_login } from '../../store/actionCreator'
import { getQueryString } from '../../config/utils'
import '../../assets/css/Login.less'
import { observer,inject } from 'mobx-react'




@inject("LoginStore","UserInfoStore")
@observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        console.log('login:',this.props);
        this.props.onEnter()()
    }
    login = () => {
        this.props.LoginStore.setLoginMessage(666,true);
        // var redirect = this.props.location.search
        var redirect = getQueryString(this.props.location.search.substr(1),"redirect")
        this.props.history.push(redirect?redirect:'/')
    }
    render() {
        return (
            <div className="login-module">
                <div className="loginDesp">login</div>
                <Button className="ly-btn-medium" onClick={this.login}>登录</Button>
            </div>
        );
    }
}

export default withRouter(Login)