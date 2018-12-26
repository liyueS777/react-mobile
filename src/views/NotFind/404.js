import React from 'react'

class NotFind extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title:'404~~'
    }
  }
  componentDidMount(){
    this.props.onEnter()()
  }
  render(){
    return (
      <div>{this.state.title}</div>
    )
  }
}
export default NotFind