import React from 'react';
import { Link } from 'react-router-dom'

class IndexC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        this.props.onEnter()()
    }
    render() {
        return (
            <div>
                <div>Index</div>
                <Link to='/home'>go home</Link>
            </div>
        );
    }
}

export default IndexC;