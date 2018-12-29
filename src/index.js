import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router,Switch} from 'react-router-dom'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import { baseRootRoute } from './routes/index'
ReactDOM.render(
    <Provider store={store}>
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
