import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import _ from 'lodash'

// Styles --------------------------------
import './styles/main.css'
//----------------------------------------

// Comonents -----------------------------
import UserLayout   from './layouts/UserLayout/'
import Home         from './pages/Home/'
import Profile      from './pages/Profile/'
import Browse       from './pages/Browse/'
import Login        from './pages/Login/'
//----------------------------------------

// Services ------------------------------
import TakroService from './services/TakroService'
//----------------------------------------


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    TakroService.isConnected()
    .then((user) => {
      this.setState({
        user: user
      })
    })
  }

  render() {
    console.log(this.state.user);
    if(!_.isEmpty(this.state.user)) {
      /* -- utilisateur connecté -- */
      return (
        <div className="app">
          <UserLayout>
            {this.props.children}
          </UserLayout>
        </div>
      )
    } else {
      /* -- utilisateur non connecté -- */
      return (
        <Route path="/">
          <Login/>
        </Route>
      )
    }
  }
}

ReactDOM.render(
  <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/browse" component={Browse} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </App>
  </Router>
  ,
  document.getElementById('root')
);
