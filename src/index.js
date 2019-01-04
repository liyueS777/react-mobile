import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router,Switch} from 'react-router-dom'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { baseRootRoute } from './routes/index'
import { Provider } from 'mobx-react'


import stores from './stores'
import { configure } from 'mobx';
// useStrict(true);//使用严格模式，强制使用action来修改,这是mobx的3的版本
configure({
    enforceActions:true
})
ReactDOM.render(
    <Provider {...stores}>
        <Router basename={baseRootRoute}>
            <div className="App">
                <Switch>
                    <App />
                </Switch>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
