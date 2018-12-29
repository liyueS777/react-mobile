import React from 'react';
import { Route,withRouter,NavLink,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../assets/css/Home.less'
import { Toast } from 'antd-mobile'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        console.log('Home',this.props);
        this.props.onEnter()()
    }
    setTitle = (t) =>{
        document.title = t
    }
    render() {
        let loginStatus = this.props.login?this.props.login:(window.localStorage.getItem('loginStatus')?true:false)
        return (
            <div className="home">
                <div className='tabar-bottom-list'>
                    {/* 这里使用 NavLink 是唯一匹配激活的a标签的className ，默认active,如果父组件是/home 子组件是/home/ 也会匹配。建议不写 */}
                    {/* 这里的activeClassName 是自定义该激活路由的classname，可以统一定义也可以自定义 */}
                    <NavLink activeClassName="selected1 a"  to="/home/commentDetail?a=2&c=3">{Number(this.props.login)},commentDetail</NavLink>
                    <NavLink activeClassName="selected2 a"  to="/home/list?d=5">list</NavLink>
                    <NavLink activeClassName="selected2 a"  to="/home/HOC">HOC</NavLink>
                </div>
                <div className="home-body">
                    {
                        this.props.routes.map((route,key)=>{
                            if(route.exact){
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
                                    // 用这个种方式可以在嵌套路由中获取属性
                                    // <Route exact key={key} path={route.path}  render={
                                    //     props =>
                                    //     (<route.component {...props} meta={route.meta} aa='12' onEnter={() => this.setTitle.bind(this,route.meta.title)} />)
                                    //   }
                                    //   />
                                )
                            }else {
                                return (
                                    <Route key={key}  path={route.path} render={
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



                                    // <Route key={key} path={route.path}  render={
                                    //     props =>
                                    //     (<route.component {...props} meta={route.meta} onEnter={() => this.setTitle.bind(this,route.meta.title)} />)
                                    //   }
                                    // />
                                )
                            }
                            
                        })
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      login:state.login.loginStatus
    }
  }
export default connect(mapStateToProps,null)(withRouter(Home));