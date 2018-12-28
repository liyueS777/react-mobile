import React, { Component } from 'react'

export default function withPersistentData(WrappedComponent) {
  return class extends Component {
    componentWillMount() {
        console.log('hoc1:',this.props)
        this.props.onEnter()()
    }
    render() {
      return <WrappedComponent  {...this.props} />
    }
  }
}
