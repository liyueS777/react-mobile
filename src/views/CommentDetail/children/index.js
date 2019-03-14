import React from 'react';
// import { withRouter } from 'react-router-dom'
class Introduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = { aa:1 };
    }
    componentDidMount(){
        console.log(this.props)
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate:',this.props,nextProps,this.state,nextState);
        if(this.props.title===nextProps.title){return false}
        else {
            return true
        }
    }
    render() {
        console.log('render:children')
        return (
            <div className="commentDetal-children">
                <p>这里是commentDetal-children</p>
                {'父元素的title'+this.props.title}
            </div>
        );
    }
}


//下面的是无状态组件
// const Introduction = (props) => {
//     console.log('ccchildren:',props)
//     return (
//         <div className="commentDetal-children">
//             <p>这里是commentDetal-children</p>
//             <p>利用无状态组件</p>
//             <p>无状态组件不支持 "ref"</p>
//             <div>1:{props.children[0]}</div>
//             <div>2:{props.children[1]}</div>
//         </div>
//     );
// }

export default (Introduction);