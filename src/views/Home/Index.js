import React from 'react';
import { Button,WhiteSpace } from 'antd-mobile'
import '../../assets/css/HomeIndex.less'
class IndexC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        this.props.onEnter()()
        console.log('indexxx:',this.props)
    }
    goHomeIndex = () =>{
        this.props.history.push('/home/list')
    }
    render() {
        return (
            <div className="homeIndex">
                <div className="title">欢迎之家~</div>
                <WhiteSpace className="line-bg-white"></WhiteSpace>
                <div className="content">
                    <Button className="ly-btn-medium" onClick={this.goHomeIndex}>去home展示吧~</Button>
                </div>
            </div>
        );
    }
}

export default IndexC;