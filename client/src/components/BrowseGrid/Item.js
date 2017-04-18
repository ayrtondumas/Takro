import React,{ Component } from 'react'
import EyeIcon from 'react-icons/lib/md/visibility'
import DownloadIcon from 'react-icons/lib/md/file-download'
import UpIcon from 'react-icons/lib/fa/caret-up'
import DownIcon from 'react-icons/lib/fa/caret-down'

import Comment from './Comment'

class BrowseGridItem extends Component {
  render() {
    var file = this.props.file
    file.comments = [
      {"author": "http://www.wimpykid.com/wp-content/uploads/2012/12/about_the_author.jpg", "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
      {"author": "http://www.wimpykid.com/wp-content/uploads/2012/12/about_the_author.jpg", "text": "this is a comment"},
      {"author": "http://www.wimpykid.com/wp-content/uploads/2012/12/about_the_author.jpg", "text": "this is a comment"}
    ]

    return (
      <div className="grid-item">
        <div className="header">
          <div className="top">
            <EyeIcon className="icon"/>
            <div className="dates">
              <p>Ajouté le 12.02.2016</p>
              <p>Crée le 10.01.2014</p>
            </div>
          </div>
          <div className="middle">
            <div className="profile">
              <div className="image" >
                <img src="http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg"/>
              </div>
              <div className="notes">
                <div className="note">
                  <p>1</p><UpIcon className="icon up"/>
                </div>
                <div className="note">
                  <p>1</p><DownIcon className="icon down" />
                </div>
              </div>
            </div>
            <div className="document">
              <h3>{file.filename}</h3>
              <div className="tags">
                {file.tags.map((tag) => {
                  return <span className="tag">#{tag.label}</span>
                })}
              </div>
              <span className="author">ayrton dumas</span>
            </div>
          </div>
          <div className="bottom">
            <DownloadIcon className="download-link" />
            <span className="ext">.pdf</span>
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

export default BrowseGridItem
