import React from 'react';
import BaseComponent from './hocModule/Hoc1'
import { Button,WhiteSpace } from 'antd-mobile'


import { observer,inject } from 'mobx-react'
import MyToast from '../../components/toastBox'
@inject("UserInfoStore")
@observer

class HOC2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title:12,
            style:{
                fontSize:'0.16rem'
            }
         };
    }
    addNum = (num) => {
        this.props.UserInfoStore.setFilterNum(num)
    }
    openMyToast = () => {
        MyToast.loading('加载123',3000,()=>{
            console.log(1,this.state.title)
        })
        MyToast.success('加载-success',3000,()=>{
            console.log(2,this.state.title)
        })
    }
    render() {
        console.log('HOC:',this.props)
        return (
            <div className="hoc2" style={this.state.style}>
                <h4>HOC</h4>
                <div>
                    <WhiteSpace className="line-bg-white" />
                    <Button className="ly-btn-medium"  onClick={this.addNum.bind( +this,this.props.UserInfoStore.filter + 1 )}>增加Num-Mobx-{this.props.UserInfoStore.filter}</Button>
                    <WhiteSpace className="line-bg-white" />
                    <Button className="ly-btn-medium" onClick={this.openMyToast}>打开自定义弹窗-loading</Button>
                </div>
            </div>
        );
    }
}

export default BaseComponent(HOC2);