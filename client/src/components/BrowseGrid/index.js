import React,{ Component } from 'react'

// Comonents -----------------------------
import BrowseGridItem from './Item'
//----------------------------------------

class BrowseGrid extends Component {
  render() {
    return (
      <div className="documents-grid">
        {this.props.files.map((file)=>{
          return <BrowseGridItem key={file._id} file={file}/>
        })}
      </div>
    )
  }
}

export default BrowseGrid
