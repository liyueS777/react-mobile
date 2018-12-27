import React, { Component } from 'react';
import { HashRouter as Router,Route,Switch,Redirect,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
// import store  from './store'
import './assets/css/common/base.css'
import './config/flexible'
import routes from './routes/index'
import './assets/css/app.less'
import { PrivateRoute } from './routes/auth'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {a:1}
  }
  componentDidMount(){
    console.log('appJsss',this.props);
    setTimeout(()=>{
      // this.
    },3000)
  }
  setTitle = (t) =>{
    document.title = t
  }
  componentWillReceiveProps(nextProps){
    console.log('app componentWillReceiveProps:',nextProps)
    
  }
  componentWillUpdate(nextProps){
    console.log('app:componentWillUpdate:',nextProps)
  }
  render() {
    let loginStatus = this.props.login?this.props.login:(window.localStorage.getItem('loginStatus')?true:false)
    console.log('appJs',loginStatus);
    return (
      // <Provider store={store}>
        <Router basename="/app/">
          <div className="App">
            <div className="routerView">
              <Switch>
                {
                  routes.map((route,key) =>{
                    if(route.path=='/login'){
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
          </div>
        </Router>
      // </Provider>
    );
  }
}
// export default App
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
export default connect(mapStateToProps,mapDispatchToProps)(App);
