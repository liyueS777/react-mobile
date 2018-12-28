import { createStore } from 'redux'
import reducer from './reducer'
console.log(process.env);
let store;
if(process.env.NODE_ENV==="development"){
    store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}else {
    store = createStore(
        reducer
    )
}
// const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
export default store