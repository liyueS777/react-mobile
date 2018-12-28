import React, { Component } from 'react';
import { Route,Switch,Redirect,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import './assets/css/common/base.css'
import './config/flexible'
import routes from './routes/index'
import './assets/css/app.less'
// import { PrivateRoute } from './routes/auth'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {a:1}
  }
  componentDidMount(){
    console.log('appJsss',this.props);
    this.props.history.listen((r)=>{
      console.log('我这里是监听',r,window.navigator)
      if(r.pathname==='/home/list123'){
        this.props.history.push('/home/list')
      }
    })
  }
  setTitle = (t) =>{
    document.title = t
  }
  render() {
    let loginStatus = this.props.login?this.props.login:(window.localStorage.getItem('loginStatus')?true:false)
    console.log('appJs::loginStatus',loginStatus);
    return (
      <div className="appRouterView">
        <Switch>
          {
            routes.map((route,key) =>{
              if(route.path==='/login'){
                return <Route key={key}  path={route.path} exact render={
                  props => loginStatus?
                  (<Redirect to={
                    {
                      pathname: '/',
                      state: { from: props.location }
                    }
                  } />)
                  :
                  (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                }
                />
              }
              else if(route.exact){
                return <Route key={key}  path={route.path} exact render={
                  props => loginStatus?
                  (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                  :
                  (<Redirect to={
                    {
                      pathname: '/login',
                      state: { from: props.location }
                    }
                  } />)
                }
                />
              }else {
                return <Route key={key} path={route.path}  render={
                  props => loginStatus?
                  (<route.component {...props} meta={route.meta} onEnter={() => this.setTitle.bind(this,route.meta.title)}  routes={route.routes} />)
                  :
                  (<Redirect to={
                    {
                      pathname: '/login',
                      state: { from: props.location }
                    }
                  } />)
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
const mapStateToProps = (state) => {
  return {
    login:state.login.loginStatus
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
      inputChange(e){
          // const action = change_input_value(e.target.value)
          // dispatch(action);
      },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));
