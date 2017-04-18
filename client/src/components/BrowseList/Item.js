import React,{ Component } from 'react'
import _ from 'lodash'
import UpIcon from 'react-icons/lib/fa/caret-up'
import DownIcon from 'react-icons/lib/fa/caret-down'
import CommentIcon from 'react-icons/lib/fa/comment-o'
import EyeIcon from 'react-icons/lib/md/visibility'

import Comment from './Comment'

class BrowseListItem extends Component {
  render() {
    var file = this.props.file
    file.comments = [
      {"author": "http://www.wimpykid.com/wp-content/uploads/2012/12/about_the_author.jpg", "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    ]

    file.comments = file.comments.slice(0,3)

    return (
      <div className="list-item">
        <div className="header">
          <div className="image">
            <img src="" alt="no img" />
          </div>
          <div className="title">
            <span className="text">{file.filename}</span>
            <span className="author">Ayrton Dumas</span>
          </div>
          <div className="ext">
            <span className="text">{file.type}</span>
          </div>
          <div className="voteUP horiz">
            <span className="text">1</span>
            <UpIcon className="icon"/>
          </div>
          <div className="voteDown horiz">
            <span className="text">1</span>
            <DownIcon className="icon"/>
          </div>
          <div className="comments horiz">
            <span className="text">1</span>
            <CommentIcon className="icon"/>
          </div>
          <div className="tags horiz">
            {file.tags.map((tag) => {
              return <p>#{tag.label}</p>
            })}
          </div>
          <div className="">
            <p>Ajouté le 12.12.2014</p>
            <p>Créer le 13.03.2013</p>
          </div>
          <div className="preview">
            <EyeIcon className="icon" />
          </div>
        </div>

        <div className="content">
          {file.comments.map((comment) => {
            return <Comment comment={comment} />
          })}
        </div>
      </div>
    )
  }
}

export default BrowseListItem
