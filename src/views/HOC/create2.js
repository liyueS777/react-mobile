import React from 'react';
import BaseComponent from './hocModule/Hoc1'
class HOC2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            style:{
                fontSize:'0.16rem'
            }
         };
    }
    render() {
        return (
            <div className="hoc2" style={this.state.style}>hoc2</div>
        );
    }
}

export default BaseComponent(HOC2);