import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import UploadIcon from 'react-icons/lib/md/backup'
import ProfileIcon from 'react-icons/lib/md/account-circle'

// Comonents -----------------------------
import SearchBar   from '../SearchBar/'
import UploadForm  from '../UploadForm/'
//----------------------------------------

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayUpload: false
    }
  }

  toggleUploadForm() {
    this.setState({
      displayUpload: !this.state.displayUpload
    })
  }

  render() {
    return (
      <div className="nav">
        <div className="nav-left nav-part">
          <ul>
            <li>
              <NavLink exact className="home" activeClassName="active" to="/"> Takro<font color="#227091">.</font></NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/browse">Browse</NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-part">
          <ul>
            <li>
              <SearchBar />
            </li>
          </ul>
        </div>
        <div className="nav-right nav-part">
          <ul>
            <li>
              <a className="icon upload-icon" onClick={this.toggleUploadForm.bind(this)}><UploadIcon /></a>
              <UploadForm hideForm={this.toggleUploadForm.bind(this)} active={this.state.displayUpload}/>
            </li>
            <li>
              <NavLink className="icon" activeClassName="active" to="/me"><ProfileIcon /></NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav
