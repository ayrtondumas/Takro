import React, { Component } from 'react'

class Tag extends Component {
  render() {
    return (
      <span className="tag">
        {this.props.name}
      </span>
    )
  }
}

export default Tag
