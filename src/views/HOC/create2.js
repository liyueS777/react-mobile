import React from 'react';
import BaseComponent from './hocModule/Hoc1'
import { Button,WhiteSpace } from 'antd-mobile'


import { observer,inject } from 'mobx-react'

@inject("UserInfoStore")
@observer

class HOC2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            style:{
                fontSize:'0.16rem'
            }
         };
    }
    addNum = (num) => {
        this.props.UserInfoStore.setFilterNum(num)
    }
    render() {
        console.log('HOC:',this.props)
        return (
            <div className="hoc2" style={this.state.style}>
                <h4>HOC</h4>
                <div>
                    <WhiteSpace className="line-bg-white" />
                    <Button className="ly-btn-medium" onClick={this.addNum.bind( +this,this.props.UserInfoStore.filter + 1 )}>增加Num-Mobx-{this.props.UserInfoStore.filter}</Button>
                    <WhiteSpace className="line-bg-white" />
                </div>
            </div>
        );
    }
}

export default BaseComponent(HOC2);