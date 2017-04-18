import React, { Component } from 'react'

// Comonents -----------------------------
import Tag   from '../Tag/'
//----------------------------------------

class UploadForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sendingFile: false,
      tags: []
    }
  }

  uploadFile(e) {
    e.preventDefault()
    this.setState({sendingFile:true})
    setTimeout(() => {
      this.setState({sendingFile:false})
    }, 2000)
  }

  //test si la clé est un espace, -> ajout d'un tag
  handleKey(e) {
    if(e.charCode == 32) {
      var newTag = e.target.value
      this.setState({
        tags: this.state.tags.concat([newTag])
      })
      e.preventDefault()
      e.target.value=""
    }
  }

  render() {
    var active = (this.props.active) ? "active" : ""
    var loader = (this.state.sendingFile) ? <p>active</p> : ""
    return (
      <div className={"upload-wrapper " + active} onClick={this.props.hideForm} >
        <form className="upload-form" onClick={(e) => { e.stopPropagation() }} onSubmit={this.uploadFile.bind(this)}>
          <input type="file"/>
          <div className="tag-editor">
            {this.state.tags.map((label) => {
              return <Tag name={label} />
            })}
            <input type="text" onKeyPress={this.handleKey.bind(this)}/>
          </div>
          <button>Upload</button>
          {loader}
        </form>
      </div>
    )
  }
}

export default UploadForm
