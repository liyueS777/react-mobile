import React from 'react';
import { Route,Link,withRouter,NavLink } from 'react-router-dom'
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
                    {/* 这里使用 NavLink 是唯一匹配激活的a标签的className ，默认active,如果父组件是/home 子组件是/home/ 也会匹配。建议不写 */}
                    {/* 这里的activeClassName 是自定义该激活路由的classname，可以统一定义也可以自定义 */}
                    <NavLink activeClassName="selected1 a"  to="/home/commentDetail">{Number(this.props.login)},commentDetail</NavLink>
                    <NavLink activeClassName="selected2 a"  to="/home/list">list</NavLink>
                </div>
                <div className="home-body">
                    {
                        this.props.routes.map((route,key)=>{
                            if(route.exact){
                                return (
                                    // 用这个种方式可以在嵌套路由中获取属性
                                    <Route exact key={key} path={route.path}  render={
                                        props =>
                                        (<route.component {...props} meta={route.meta} aa='12' onEnter={() => this.setTitle.bind(this,route.meta.title)} />)
                                      }
                                      />
                                    // <Route exact key={key} path={route.path} onEnter={() => this.setTitle.bind(this,route.meta.title)} component={route.component} />
                                )
                            }else {
                                return (
                                    <Route key={key} path={route.path}  render={
                                        props =>
                                        (<route.component {...props} meta={route.meta} onEnter={() => this.setTitle.bind(this,route.meta.title)} />)
                                      }
                                      />
                                    // <Route key={key} path={route.path} onEnter={() => this.setTitle.bind(this,route.meta.title)} component={route.component} />
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