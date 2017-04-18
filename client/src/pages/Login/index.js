import React, { Component } from 'react'

// Comonents -----------------------------
import LoginForm from '../../components/LoginForm/'
//----------------------------------------

class Login extends Component {

  render() {
    return (
      <div className="container">
        <section className="section">
          <div className="form-header">
            <h1>Takro<font color="#227091">.</font></h1>
            <p>Apprendre n'a jamais été aussi simple</p>
          </div>
          <LoginForm/>
        </section>
        <section className="section">
          <h1>Section 2</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </section>
      </div>
    )
  }
}

export default Login
