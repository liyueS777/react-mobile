import { observable,action } from 'mobx'
class LoginStore {
    @observable loginMessage = window.localStorage.getItem('loginMessage')?JSON.parse(window.localStorage.getItem('loginMessage')):{}
    @action setLoginMessage(uid,loginStatus){
        var j = {
            uid,
            loginStatus
        }
        this.loginMessage = j
        window.localStorage.setItem('loginMessage',JSON.stringify(j))
    }
}
export default new LoginStore()