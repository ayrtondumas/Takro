import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

class SearchBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: "",
      lastUrl: false
    }
  }

  componentWillMount() {
    console.log("Will mount SB");
    this.setState({
      lastUrl: window.location.pathname
    })
  }

  searchTextChanged(e) {
    this.setState({
      searchText: e.target.value
    })
  }

  render() {

    var redirect = ""
    var secondRedirect =""
    const searchUrl = "/search";

    // si une recherche est en cours
    if(this.state.searchText != "") {
      redirect = <Redirect to={searchUrl} />

    // si la recherche est vide
    } else {

      // et que l'url de base est différent du path actuel
      if( this.state.lastUrl != window.location.pathname){
        console.log(window.location.pathname);

        // après la recherche, rediriger vers l'ancienne page
        if(window.location.pathname == searchUrl) {
          secondRedirect = <Redirect to={this.state.lastUrl} />

        // une simple navigation
        } else {
          this.setState({lastUrl:window.location.pathname})
        }
      }
    }

    // si le dernier path et le nouveau sont les deux différents de search

    return (
      <div className="search-bar">
        {redirect}
        {secondRedirect}
        <input
            type="text"
            placeholder="Search.."
            value={this.state.searchText}
            onChange={this.searchTextChanged.bind(this)} />
      </div>
    )
  }
}

export default SearchBar
