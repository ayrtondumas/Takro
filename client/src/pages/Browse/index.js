import React, {Component} from 'react'
import { EventEmitter } from 'events'

// Comonents -----------------------------
import BrowseHeader   from '../../components/BrowseHeader/'
import BrowseList     from '../../components/BrowseList/'
import BrowseGrid     from '../../components/BrowseGrid/'
//----------------------------------------

// Services ------------------------------
import TakroService from '../../services/TakroService'
//----------------------------------------

class Browse extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayGrid: false,
      files : []
    }
  }

  componentWillMount() {
    this.eventEmitter = new EventEmitter()
    TakroService.getFiles()
    .then((files) => {
      this.setState({files})
    })
  }

  componentDidMount() {
    this.eventEmitter.addListener("changeDisplayMode", (displayGrid) => {
      this.changeDisplayMode(displayGrid)
    })
  }

  changeDisplayMode(displayGrid) {
    this.setState({displayGrid: displayGrid})
  }

  render() {
    return (
      <div className="page browse-page">
        <BrowseHeader eventEmitter={this.eventEmitter} displayGrid={this.state.displayGrid} />
        {(this.state.displayGrid ? <BrowseGrid files={this.state.files} /> : <BrowseList files={this.state.files} /> )}
      </div>
    )
  }
}

export default Browse
