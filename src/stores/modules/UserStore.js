import { observable,action, computed } from 'mobx'
class UserInfoStore {
    @observable userInfo= {name:"这里是UserInfoStore的name"};
    @observable filter = window.localStorage.getItem('filterNums') ? +window.localStorage.getItem('filterNums'):0;
    @observable openBanner = window.localStorage.getItem("openBanner")?true:false
    @computed
    get filterNums(){
        return this.filter
    }

    @action setUserInfo(p){
        window.localStorage.setItem('userInfoP',JSON.stringify(p));
        this.userInfo = p;
    }
    @action getUserInfo(p){
        return this.userInfo
    }
    @action setFilterNum(num){
        this.filter = num
        window.localStorage.setItem('filterNums',num)
    }
    @action setOpenBanner(status){
        if(status){
            window.localStorage.setItem("openBanner",1);
            this.openBanner = true;
        }
        else {
            window.localStorage.removeItem("openBanner");
            this.openBanner = false;

        }
    }
}
export default new UserInfoStore()