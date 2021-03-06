import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button,WhiteSpace,Carousel, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { check_login,open_tips } from '../../store/actionCreator'
import '../../assets/css/CommentDetail.less'

import Introduction from './children'

class CommentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: ['1', '2', '3'],
            imgHeight: 176,
            a:1
         };
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
              data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
          }, 100);
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
                    <div>我是设置的自定义子元数</div>
                </Introduction>
                <h1>{this.props.openStatus?'开启了tips':'未开启tips'}</h1>
                <WhiteSpace className="line-bg-white" />
                {
                    this.props.openStatus?
                    <WingBlank>
                        <Carousel
                        autoplay={true}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                        >
                        {this.state.data.map(val => (
                            <a
                            key={val}
                            href="javascript:;"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                                }}
                            />
                            </a>
                        ))}
                        </Carousel>
                    </WingBlank>
                    :
                    null
                }
                <WhiteSpace className="line-bg-white" />
                <Button className="ly-btn-medium" onClick={this.logout}>退出</Button>
                <Button className="ly-btn-medium" onClick={this.goBack}>上一级</Button>
                <Button className="ly-btn-medium" onClick={this.props.handleOpenStatus.bind(this,!this.props.openStatus)}>{this.props.openStatus?'关掉轮播':'开启轮播'}</Button>
                <Button className="ly-btn-medium" onClick={this.changeMeta.bind(this,666)}>修改meta666</Button>
                <Button className="ly-btn-medium" onClick={this.changeMeta.bind(this,777)}>修改meta777</Button>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      login:state.login.loginStatus,
      openStatus:state.login.openStatus
    }
}
  
const mapDispatchToProps = (dispatch) =>{
    return {
        logout(status){
            if(status) return;
            const action = check_login(status)
            dispatch(action);
        },
        handleOpenStatus(flag){
            if(!flag){window.localStorage.removeItem('openTips')}else{window.localStorage.setItem('openTips',flag)}
            dispatch(open_tips(flag))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CommentDetail))