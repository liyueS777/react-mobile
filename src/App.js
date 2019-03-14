import React, { Component } from 'react';
import { Route,Switch,Redirect,withRouter} from 'react-router-dom'
import './assets/css/common/base.css'
import './config/flexible'
import { routes } from './routes/index'
import './assets/css/app.less'
import { Toast } from 'antd-mobile'

import { observer,inject } from 'mobx-react'

@inject("LoginStore")
@observer
class App extends Component {
  constructor(props){
    super(props)
    this.state = {a:1}
  }
  componentDidMount(){
    this.props.history.listen((r,rr,rrr)=>{
      console.log('我这里是监听',r,rr,rrr,1112,this.props.location)
    })
  }
  setTitle = (t) =>{
    document.title = t
  }
  render() {
    let loginMessage = this.props.LoginStore.loginMessage;
    let loginStatus = (loginMessage.uid && loginMessage.loginStatus)?true:false
    // let loginStatus = this.props.login?this.props.login:(window.localStorage.getItem('loginStatus')?true:false)
    console.log('appJs::loginStatus',loginStatus);
    return (
      <div className="appRouterView">
        <Switch>
          {
            routes.map((route,key) =>{
              if(route.path==='/login'){
                return <Route key={key} path={route.path} exact render={
                  props => {
                    return loginStatus?
                    (<Redirect to={
                                    {
                                      pathname: '/',
                                      state: { from: props.location }
                                    }
                                  } 
                    />)
                    :
                    (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                  }
                }
                />
              }
              //route.meta.multiView 区分嵌套路由，嵌套路由不在主路由设置登录态
              else if(route.meta.multiView){
                //嵌套路由的具体的去设置登录状态，也许有的路由需要登录有的路由不需要登陆，这里是统一设置的
                return (
                  <Route key={key}  path={route.path} render={
                    props => {
                      return (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                    }                  
                  }
                  />
                )
              }
              else if(route.exact){
                return (
                  <Route key={key}  path={route.path} exact render={
                    props => {
                      if(route.meta.needLogin && !loginStatus){
                        Toast.info('请先登录~', 1.5);
                      }
                      return route.meta.needLogin?
                      (
                        loginStatus?
                          (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                        :
                          (<Redirect to={
                                        {
                                          pathname: '/login',
                                          search:"?redirect="+props.location.pathname,
                                          state: { from: props.location }
                                        }
                                      } 
                          />)
                      )
                      :
                      (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                    }                  
                  }
                  />
                )
              }else {
                return <Route key={key} path={route.path}  render={
                  props => {
                    if(route.meta.needLogin && !loginStatus){
                      Toast.info('请先登录~', 1.5);
                    }
                    return route.meta.needLogin?
                    (loginStatus?
                      (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                      :
                      (<Redirect to={
                                      {
                                        pathname: '/login',
                                        search:"?redirect="+props.location.pathname,
                                        state: { from: props.location }
                                      }
                                    } 
                      />)
                    )
                    :
                    (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                  }
                }
                />
              }
            })
          }
          <Route render={() => <Redirect to="/404" />} />
        </Switch>
      </div>

    );
  }
}

export default withRouter(App)
