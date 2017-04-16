import React,{ Component } from 'react'

// Comonents -----------------------------
import BrowseListItem from './Item'
//----------------------------------------

class BrowseList extends Component {
  render() {
    return (
      <div>
        <h2>Brwoser List</h2>
        {this.props.files.map((file)=>{
          return <BrowseListItem key={file.id} file={file}/>
        })}
      </div>
    )
  }
}

export default BrowseList
