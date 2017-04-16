import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {

  render() {
    return (
      <div className="nav">
        <div className="nav-left">
          <ul>
            <li>
              <NavLink exact activeClassName="active" to="/"> Home </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/browse"> Browse </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <ul>
            <li>
              <NavLink activeClassName="active" to="/profile"> Profile </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav
