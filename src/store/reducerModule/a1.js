import { LOGIN_STATUS,OPEN_TIPS } from '../actionType'

const defaultState = {
    default:'001',
    loginStatus:window.localStorage.getItem("loginStatus")?true:false,
    openStatus:window.localStorage.getItem("openTips")?true:false,
}
export default (state = defaultState,action) =>{
    
    if(action.type === LOGIN_STATUS){
        const s = JSON.parse(JSON.stringify(state))
        s.loginStatus = action.value;
        return s;
    } 
    else if(action.type === OPEN_TIPS){
        const s = JSON.parse(JSON.stringify(state))
        s.openStatus = action.value;
        return s;
    }

    else {
        return state
    }
}


// import { fromJS } from 'immutable'
// fromJS 是转化为immutable对象，toJs 是转化为JS 对象
//使用immutable 对象
// const defaultState = fromJS({
//     default:'001',
//     inputValue:'hellow world',
//     input_status:false,
//     iList:[
//         {
//             name:'aa',
//             id:1
//         },
//         {
//             name:'bb',
//             id:2
//         },
//     ]
// })
//不使用，不过这个看抉择