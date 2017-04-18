import React, { Component } from 'react'

import UpIcon from 'react-icons/lib/fa/caret-up'
import DownIcon from 'react-icons/lib/fa/caret-down'

class Comment extends Component {

  render() {
    const comment = this.props.comment
    var text = (comment.text.length > 100) ? comment.text.substr(0, 99) + '...' : comment.text;

    return (
      <div className="grid-comment">
        <div className="author">
          <img src={comment.author} />
        </div>
        <div className="comment">
          <p>{text}</p>
        </div>
        <div className="infos">
          <div className="date">
            <p>December 2016</p>
          </div>
          <div className="ranking">
            <UpIcon className="icon"/>12<DownIcon className="icon" />
          </div>
          <div className="more">
            <a>more...</a>
          </div>

        </div>
      </div>
    )
  }
}

export default Comment
