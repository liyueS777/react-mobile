import React from 'react';
import { Route,Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../assets/css/Home.less'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        console.log('Home',this.props);
        this.props.onEnter()()
    }
    setTitle = (t) =>{
        document.title = t
    }
    componentWillReceiveProps(nextProps){
        console.log('home componentWillReceiveProps:',nextProps)
    }
    render() {
        return (
            <div className="home">
                <div className='tabar-bottom-list'>
                    <Link to="/home/commentDetail">{Number(this.props.login)},commentDetail</Link>
                    <Link to="/home/">list</Link>
                </div>
                <div className="home-body">
                    {
                        this.props.routes.map((route,key)=>{
                            if(route.exact){
                                return (
                                    <Route exact key={key} path={route.path} component={route.component} />
                                )
                            }else {
                                return (
                                    <Route key={key} path={route.path} component={route.component} />
                                )
                            }
                            
                        })
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      login:state.login.loginStatus
    }
  }
export default connect(mapStateToProps,null)(withRouter(Home));