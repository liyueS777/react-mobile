import React from 'react';
import { Route,Link,withRouter,Switch } from 'react-router-dom'

import CommentList from '../Comment/index'
import CommentDetail from '../CommentDetail/index'

import '../../assets/css/Home.less'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        console.log('Home',this.props);
        // this.props.onEnter()()
    }
    setTitle = (t) =>{
        document.title = t
    }
    goIndex = () =>{
        this.props.history.push('/b')
    }
    render() {
        return (
            <div className="home">
                <button onClick={this.goIndex}>gogo</button>
                <div className='tabar-bottom-list'>
                    <Link to="/home/commentDetail">commentDetail</Link>
                    <Link to="/home/commentList">list</Link>
                </div>
                <div className="home-body">
                {/* <Switch> */}
                    <Route exact path='/home/commentList' component={CommentList} />
                    <Route exact path='/home/commentDetail' component={CommentDetail} />
                {/* </Switch> */}
                </div>
            </div>
        );
    }
}

export default Home