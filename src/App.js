import React, { Component } from 'react';
import { HashRouter as Router,Route,Link,Switch,Redirect,withRouter } from 'react-router-dom'
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
    console.log(this,this.state.a)
  }
  setTitle = (t) =>{
    document.title = t
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className='tabar-bottom-list'>
            <Link to="/home">home</Link>
            <Link to="/login">login</Link>
            <Link to="/commentList">list</Link>
            <Link to="/404">404</Link>
          </div>
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
    );
  }
}

export default App;
