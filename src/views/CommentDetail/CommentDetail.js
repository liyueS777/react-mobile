import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { check_login } from '../../store/actionCreator'
class CommentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        this.props.onEnter()();
    }
    logout = () => {
        window.localStorage.removeItem('loginStatus')
        this.props.logout(false)
        this.props.history.push('/login')
    }
    render() {
        return (
            <div>
                <h1>这里是CommentDetail</h1>
                <Button onClick={this.logout}>退出</Button>

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