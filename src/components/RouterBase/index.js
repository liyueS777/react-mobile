import React from 'react';
import { Route,Redirect,withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { observer,inject } from 'mobx-react'
@inject("LoginStore")
@observer
export default function BaseAuthRoute(BaseRouteComponent){
    return withRouter(class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {  };
        }
        setTitle = (t) =>{
            document.title = t
        }
        render() {
            let loginMessage = this.props.LoginStore.loginMessage;
            let loginStatus = (loginMessage.uid && loginMessage.loginStatus)?true:false;
            console.log('baseRoute::loginStatus',loginStatus);
            //这里需要对登录特殊对待，登录的情况去首页，非登陆情况去登录页
            //也可以设置登录的路由重定向方向 login_redirect
            /**
             * 1. /login 已经登录情况去location或者首页
             * 2.嵌套路由因为不具有exact，相关权限情况去子路由模板去设置同类型情况权限
             * 3. 非/login 在需要登录权限情况下 未登录：去/login，已登录：去该路由
             */
            if(this.props.path==='/login'){
                return
                    loginStatus?
                    <Redirect to={
                        {
                        pathname: this.props.location.state.pathname?this.props.location.state.pathname:'/',//首页
                        state: { from: this.props.location }
                        }
                    } 
                    />
                    :
                    <Route key={this.props.key} path={this.props.path} render={
                        props => {
                            return (<BaseRouteComponent {...props} meta={this.props.meta} onEnter={()=> this.setTitle.bind(this,this.props.meta.title)} routes={this.props.routes}  />)
                        }                  
                        }
                    />
            }
            else if(this.props.meta.multiView){
                return (
                    <Route key={this.props.key}  path={this.props.path} render={
                        props => {
                        return (<BaseRouteComponent {...props} meta={this.props.meta} onEnter={()=> this.setTitle.bind(this,this.props.meta.title)} routes={this.props.routes}  />)
                        }                  
                    }
                    />
                )
            }
            else if(this.props.exact){
                if(this.props.meta.needLogin && !loginStatus){
                    Toast.info('请先登录~', 1.5);
                }
                if(this.props.meta.needLogin){
                    if(loginStatus){
                        return (
                            <Route key={this.props.key}  path={this.props.path} exact render={
                                props => (
                                <BaseRouteComponent {...props} meta={this.props.meta} onEnter={()=> this.setTitle.bind(this,this.props.meta.title)} routes={this.props.routes}  />
                                )
                            }
                            />
                        )
                    }else {
                        return
                        <Redirect to={
                            {
                                pathname: '/login',
                                search:"?redirect="+this.props.location.pathname,
                                state: { from: this.props.location }
                            }
                            } 
                        />
                    }
                }else {
                    return (
                        <Route key={this.props.key}  path={this.props.path} exact render={
                            props => (
                            <BaseRouteComponent {...props} meta={this.props.meta} onEnter={()=> this.setTitle.bind(this,this.props.meta.title)} routes={this.props.routes}  />
                            )
                        }
                        />
                    )
                }
            }
            else {
                if(this.props.meta.needLogin && !loginStatus){
                    Toast.info('请先登录~', 1.5);
                }
                if(this.props.meta.needLogin){
                    if(loginStatus){
                        return (
                            <Route key={this.props.key}  path={this.props.path} render={
                                props => (
                                <BaseRouteComponent {...props} meta={this.props.meta} onEnter={()=> this.setTitle.bind(this,this.props.meta.title)} routes={this.props.routes}  />
                                )
                            }
                            />
                        )
                    }else {
                        return
                        <Redirect to={
                            {
                                pathname: '/login',
                                search:"?redirect="+this.props.location.pathname,
                                state: { from: this.props.location }
                            }
                            } 
                        />
                    }
                }
                else {
                    return (
                        <Route key={this.props.key}  path={this.props.path} render={
                            props => (
                            <BaseRouteComponent {...props} meta={this.props.meta} onEnter={()=> this.setTitle.bind(this,this.props.meta.title)} routes={this.props.routes}  />
                            )
                        }
                        />
                    )
                }
            }
        }
    })
}