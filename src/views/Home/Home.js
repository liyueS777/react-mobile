import React from 'react';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        console.log('Home');
        this.props.onEnter()()
        
    }
    render() {
        return (
            <div>Home</div>
        );
    }
}

export default Home