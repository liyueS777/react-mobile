import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button,WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { check_login } from '../../store/actionCreator'
import '../../assets/css/CommentDetail.less'

import Introduction from './children'

class CommentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        console.log('CommentDetail:',this.props)
        this.props.onEnter()();
    }
    logout = () => {
        window.localStorage.removeItem('loginStatus')
        this.props.logout(false)
        this.props.history.push('/login')
    }
    goBack = () => {
        this.props.history.go(-1)
    }
    changeMeta = (p) => {
        this.props.meta.title=p;
        this.props.onEnter()();
    }
    render() {
        return (
            <div className="commentDtail">
                <h1>这里是CommentDetail</h1>
                <WhiteSpace className="line-bg-white" />
                <Introduction>
                    <WhiteSpace className="line-bg-white" />
                    <div>12344</div>
                </Introduction>
                <Button className="ly-btn-medium" onClick={this.logout}>退出</Button>
                <Button className="ly-btn-medium" onClick={this.goBack}>上一级</Button>
                <Button className="ly-btn-medium" onClick={this.changeMeta.bind(this,666)}>修改meta666</Button>
                <Button className="ly-btn-medium" onClick={this.changeMeta.bind(this,777)}>修改meta777</Button>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      login:state.login.loginStatus
    }
}
  
const mapDispatchToProps = (dispatch) =>{
    return {
        logout(status){
            if(status) return;
            const action = check_login(status)
            dispatch(action);
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CommentDetail))