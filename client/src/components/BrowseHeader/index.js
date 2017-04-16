import React, { Component } from 'react'
import ListView from 'react-icons/lib/md/view-headline'
import GridView from 'react-icons/lib/md/view-module'

// Comonents -----------------------------
//----------------------------------------

class BrowseHeader extends Component {

  changeDisplayModeGrid() {
    this.props.eventEmitter.emit("changeDisplayMode", true)
  }

  changeDisplayModeLine() {
    this.props.eventEmitter.emit("changeDisplayMode", false)
  }

  render() {
    var gridClass = "";
    var listClass = "";
    if (this.props.displayGrid) {
      gridClass = "active"
    } else {
      listClass = "active"
    }

    return (
      <div className="browse-header">
        <div className="display-mode">
          <a className={gridClass} onClick={this.changeDisplayModeGrid.bind(this)}><GridView /></a>
          <a className={listClass} onClick={this.changeDisplayModeLine.bind(this)}><ListView /></a>
        </div>
      </div>
    )
  }
}

export default BrowseHeader
