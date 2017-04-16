import React, { Component } from 'react'

import Nav  from '../../components/Nav/'

class UserLayout extends Component {

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default UserLayout
