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
import Search       from './pages/Search/'
import MyProfile    from './pages/MyProfile/'
import Browse       from './pages/Browse/'
import Login        from './pages/Login/'
import MyTakro      from './pages/MyTakro/'
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
    /*TakroService.isConnected()
    .then((user) => {
      this.setState({
        user: user
      })
    })*/
  }

  render() {
    return noAuth()
  }
}

ReactDOM.render(
  <Router>
      <App />
  </Router>
  ,
  document.getElementById('root')
);


function withAuth() {
  if(!_.isEmpty(this.state.user)) {
    /* -- utilisateur connecté --*/
    return (
      <div className="app">
        <UserLayout>
          <Switch>
            <Route exact path="/"   component={Home} />
            <Route path="/browse"   component={Browse} />
            <Route path="/profile"  component={Profile} />
            <Route path="/mytakro"  component={MyTakro} />
            <Route path="/login"    component={Login} />
            <Route path="/me">
              <MyProfile user={this.state.user}/>
            </Route>
          </Switch>
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

function noAuth(){
  return (
    <div className="app">
      <UserLayout>
        <Switch>
          <Route exact path="/"   component={Home} />
          <Route path="/browse"   component={Browse} />
          <Route path="/profile"  component={Profile} />
          <Route path="/login"    component={Login} />
          <Route path="/mytakro"  component={MyTakro} />
          <Route path="/search"   component={Search} />
          <Route path="/me">
            <MyProfile user={null}/>
          </Route>
        </Switch>
      </UserLayout>
    </div>
  )
}
