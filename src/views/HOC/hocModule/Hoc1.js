import React, { Component } from 'react'

export default function withPersistentData(WrappedComponent) {
  return class extends Component {
    constructor(props){
      super(props)
      this.state = {a:1}
    }
    componentWillMount() {
        console.log('hoc1:',this.props)
        this.props.onEnter()()
    }
 
    render() {
      console.log(this.state.a)
      return <WrappedComponent  {...this.props} />
    }
  }
}
