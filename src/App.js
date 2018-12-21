import React, { Component } from 'react';
import { HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import './assets/css/common/base.css'
import './config/flexible'
import './assets/css/app.less'
import Login from './views/Login/index'
import Home from './views/Home/index'
import NotFind from './views/NotFind/index'

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
          <div className="routerView">
            {/* <Switch> */}
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/404' component={NotFind} />
              <Route render={() => <Redirect to="/404" />} />
            {/* </Switch> */}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
