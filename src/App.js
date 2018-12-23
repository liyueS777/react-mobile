import React, { Component } from 'react';
import { HashRouter as Router,Route,Switch,Redirect,withRouter} from 'react-router-dom'
import { Provider,connect } from 'react-redux'
import store  from './store'
import './assets/css/common/base.css'
import './config/flexible'
import routes from './routes/index'
import './assets/css/app.less'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {a:1}
  }
  componentDidMount(){
    console.log('app',this.props)
  }
  setTitle = (t) =>{
    document.title = t
  }
  componentWillReceiveProps(nextProps){
    console.log('app componentWillReceiveProps:',nextProps)
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="routerView">
              <Switch>
                {
                  routes.map((route,key) =>{
                    if(route.exact){
                      return <Route key={key}  path={route.path} exact render={
                        props =>
                        (<route.component {...props} meta={route.meta} onEnter={()=> this.setTitle.bind(this,route.meta.title)} routes={route.routes}  />)
                      }
                      />
                    }else {
                      return <Route key={key} path={route.path}  render={
                        props =>
                        (<route.component {...props} meta={route.meta} onEnter={() => this.setTitle.bind(this,route.meta.title)}  routes={route.routes} />)
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
      </Provider>
    );
  }
}
export default App
// const mapStateToProps = (state) => {

//   return {
//     login:state.login.loginStatus
//   }
// }
// export default connect(mapStateToProps,null)((App));
