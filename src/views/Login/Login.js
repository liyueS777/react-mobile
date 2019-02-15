import React from 'react';
import { Button,List,InputItem } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

// import { check_login } from '../../store/actionCreator'
import { getQueryString } from '../../config/utils'
import '../../assets/css/Login.less'
import { observer,inject } from 'mobx-react'

const regExp = /^[1][3,4,5,7,8][0-9]{9}$/;


@inject("LoginStore","UserInfoStore")
@observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            errorTips:'',
            phone:'',
            password:''
         };
    }
    componentWillMount(){
        console.log('login:',this.props);
        this.props.onEnter()()
    }
    componentDidMount(){
        console.log(this.inputPhone.state,this.inputPassword)
    }
    inputPhoneChange = (i) => {
        this.setState((prevState)=>{
            return {
                phone:i
            }
        },()=>{
            
            if(!regExp.test(i.replace(/ /g,""))){
                this.setState({
                    errorTips:"请输入正确的手机号格式"
                })
            }else {
                this.setState({
                    errorTips:""
                })
            }
        })
    }
    inputPasswordChange = (i) => {
        this.setState((prevState)=>{
            return {
                password:i
            }
        },()=>{
            
            if(!i.trim()){
                this.setState({
                    errorTips:"请输入密码"
                })
            }else {
                this.setState({
                    errorTips:""
                })
            }
        })
    }
    login = () => {
        if(!regExp.test(this.state.phone.replace(/ /g,""))){
            this.setState({
                errorTips:"请输入正确的手机号格式"
            })
            return
        }
        if(!this.state.password.trim()){
            this.setState({
                errorTips:"请输入密码"
            })
            return
        }
        this.props.LoginStore.setLoginMessage(666,true);
        // var redirect = this.props.location.search
        var redirect = getQueryString(this.props.location.search.substr(1),"redirect")
        this.props.history.push(redirect?redirect:'/')
    }
    render() {
        return (
            <div className="login-module">
                {/* <div className="loginDesp">login</div> */}
                <List renderHeader={() => '请填写用户信息'}>
                    <InputItem
                        type="phone"
                        clear
                        placeholder="请输入手机号"
                        value={this.state.phone}
                        onChange = {this.inputPhoneChange}
                        ref={ref=>{this.inputPhone=ref}}
                    >
                        <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <InputItem
                        type="password"
                        clear
                        value={this.state.password}
                        onChange={this.inputPasswordChange}
                        ref={ref=>{this.inputPassword=ref}}
                        placeholder="请输入密码"
                    >
                        <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                </List>
                <p style={{textAlign:'center',marginTop:'0.1rem',color:'red',fontSize:'0.14rem',height:'0.14rem'}}>{this.state.errorTips}</p>
                <div style={{textAlign:'center',marginTop:'0.1rem'}}><Button className="ly-btn-medium" onClick={this.login}>登录</Button></div>
            </div>
        );
    }
}

export default withRouter(Login)