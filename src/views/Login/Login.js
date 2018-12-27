import React from 'react';
import { Button } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { check_login } from '../../store/actionCreator'
import '../../assets/css/Login.less'
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
        this.props.login(true);
        window.localStorage.setItem('loginStatus',true)
        this.props.history.push('/')
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
const mapStateToProps = (state) => {
    return {
      login:state.login.loginStatus
    }
}
  
const mapDispatchToProps = (dispatch) =>{
    return {
        login(status){
            if(!status) return;
            const action = check_login(status)
            dispatch(action);
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login))