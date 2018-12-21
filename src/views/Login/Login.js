import React from 'react';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        console.log('notfinfd');
        this.props.onEnter()()
        
    }
    render() {
        return (
            <div>login</div>
        );
    }
}

export default Login;