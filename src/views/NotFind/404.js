import React from 'react'

class NotFind extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title:'404~~'
    }
  }
  render(){
    return (
      <div>{this.state.title}</div>
    )
  }
}
export default NotFind