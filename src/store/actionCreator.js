import { LOGIN_STATUS,OPEN_TIPS } from './actionType'
export const check_login = (value) => ({
    type:LOGIN_STATUS,
    value
})
export const open_tips = (value) => ({
    type:OPEN_TIPS,
    value
})