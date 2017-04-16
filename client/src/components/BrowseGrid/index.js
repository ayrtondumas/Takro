import React,{ Component } from 'react'

// Comonents -----------------------------
import BrowseGridItem from './Item'
//----------------------------------------

class BrowseGrid extends Component {
  render() {
    return (
      <div>
        <h2>Browser Grid</h2>
        {this.props.files.map((file)=>{
          return <BrowseGridItem key={file.id} file={file}/>
        })}
      </div>
    )
  }
}

export default BrowseGrid
