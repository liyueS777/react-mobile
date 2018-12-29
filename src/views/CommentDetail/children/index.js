import React from 'react';
import { withRouter } from 'react-router-dom'
// class Introduction extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {  };
//     }
//     componentDidMount(){
//         console.log(this.props)
//     }
//     render() {
        
//         return (
//             <div className="commentDetal-children">
//                 <p>这里是commentDetal-children</p>
//                 {this.props.children}
//             </div>
//         );
//     }
// }


//下面的是无状态组件
const Introduction = (props) => {
    console.log('ccchildren:',props)
    return (
        <div className="commentDetal-children">
            <p>这里是commentDetal-children</p>
            <p>利用无状态组件</p>
            <p>无状态组件不支持 "ref"</p>
            {props.children}
        </div>
    );
}

export default (Introduction);