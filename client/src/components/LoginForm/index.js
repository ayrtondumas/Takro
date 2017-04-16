import React, { Component } from 'react'
import PersonIcon from 'react-icons/lib/md/person-outline'
// Services ------------------------------
import TakroService from '../../services/TakroService'
//----------------------------------------

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = { error: "" }
  }

  submitLogin(e) {
    e.preventDefault()
    var email = e.target.email.value
    var password = e.target.password.value
    TakroService.checkLogin(email, password)
    .then((error) => {
      this.setState({error: error})
    })
  }

  render() {
    return (
      <div>
        <form className="login-form" onSubmit={this.submitLogin.bind(this)}>
          <PersonIcon />
          <input name="email" type="text" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <p>{this.state.error}</p>
          <div className="login-form-footer">
            <a>Je n ai pas de compte</a>
            <button>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
