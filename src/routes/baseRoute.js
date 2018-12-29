import React,{Component} from 'react';
import { Route,Redirect } from 'react-router-dom'
import { baseRootRoute } from './index'
let copy_baseRootRoute = baseRootRoute;
copy_baseRootRoute.slice(0,-1)
export default function BaseCreateRoute(BaseRouteComponent){
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {  };
        }
        render() {
            let requireNeedLoginFlag = this.props.needLogin?this.props.needLogin:false;
            let loginStatus = this.props.loginStatus?this.props.loginStatus:false;
            console.log('BaseCreateRoute:requireNeedLoginFlag:loginStatus',requireNeedLoginFlag,loginStatus)
            if(requireNeedLoginFlag){
                //这里需要对登录特殊对待，登录的情况去首页，非登陆情况去登录页
                //也可以设置登录的路由重定向方向 login_redirect
                if(this.props.path==='/login'){
                    loginStatus?
                    <Redirect to={
                        {
                        pathname: this.props.location.state.pathname?this.props.location.state.pathname:'/',//首页
                        state: { from: this.props.location }
                        }
                    } 
                    />
                    :
                    <BaseRouteComponent {...this.props} />
                }
                return
                    loginStatus?
                    <BaseRouteComponent {...this.props} />
                    :
                    <Redirect  to={
                        {
                        pathname: '/login',
                        state: { from: this.props.location }
                        }
                    } 
                    />
            }else {
                return <BaseRouteComponent {...this.props} />
            }
        }
    }
}