import React,{ Component } from 'react'

class BrowseListItem extends Component {
  render() {
    return (
      <div className="list-item">
        <h3>{this.props.document.filename}</h3>
      </div>
    )
  }
}

export default BrowseListItem
