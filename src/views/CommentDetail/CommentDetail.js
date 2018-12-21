import React from 'react';
import { withRouter } from 'react-router-dom'

class CommentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>这里是CommentDetail</div>
        );
    }
}

export default withRouter(CommentDetail);