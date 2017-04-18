import React, { Component } from 'react'

// Comonents -----------------------------
import Tag   from '../Tag/'
//----------------------------------------

// Services ------------------------------
import TakroService from '../../services/TakroService'
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
    const data = new FormData();
    data.append('filename', 'Rp_301');
    data.append('tags', this.state.tags);
    data.append('document', e.target.document.files[0]);

    TakroService.uploadDocument(data)
    .then((response) => {
      this.setState({sendingFile:false})
      console.log(response);
    })
  }

  //test si la clé est un espace, -> ajout d'un tag
  handleKey(e) {
    if(e.keyCode == 32) {
      var newTag = e.target.value
      this.setState({
        tags: this.state.tags.concat([newTag])
      })
      e.preventDefault()
      e.target.value=""
    }

    console.log(e.keyCode);
    if(e.keyCode == 8 && e.target.value == ""){
      console.log("POP LAST TAG");
      var tags = this.state.tags
      tags.pop()
      this.setState({tags:tags})
    }
  }

  //mettre a jour la valeur du label
  handleFileSelection(e) {
    var file = e.target.files[0].name;
    document.getElementById('file-label').innerHTML = file
  }

  render() {
    var active = (this.props.active) ? "active" : ""
    var loader = (this.state.sendingFile) ? <p>active</p> : ""
    return (
      <div className={"upload-wrapper " + active} onClick={this.props.hideForm} >
        <form className="upload-form" onClick={(e) => { e.stopPropagation() }} onSubmit={this.uploadFile.bind(this)}>
          <input type="text" name="filename" placeholder="Filename" />
          <input id="selected-file" name="document" type="file" onChange={this.handleFileSelection}/>
          <label id="file-label" htmlFor="selected-file">Select file</label>

          <div className="tag-editor">
            {this.state.tags.map((label) => {
              return <Tag name={label} />
            })}
            <input type="text" onKeyDown={this.handleKey.bind(this)} placeholder="Insert tags"/>
          </div>
          <button>Upload</button>
          {loader}
        </form>
      </div>
    )
  }
}

export default UploadForm
