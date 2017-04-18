import React,{ Component } from 'react'

// Comonents -----------------------------
import BrowseListItem from './Item'
//----------------------------------------

class BrowseList extends Component {
  render() {
    return (
      <div className="documents-list">
        {this.props.files.map((file)=>{
          return <BrowseListItem key={file._id} file={file}/>
        })}
      </div>
    )
  }
}

export default BrowseList
