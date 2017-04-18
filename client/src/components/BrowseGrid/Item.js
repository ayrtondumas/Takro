import React,{ Component } from 'react'
import EyeIcon from 'react-icons/lib/md/visibility'
import DownloadIcon from 'react-icons/lib/md/file-download'

class BrowseGridItem extends Component {
  render() {
    const file = this.props.file
    console.log(file);
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
                  1 up
                </div>
                <div className="note">
                  1 down
                </div>
              </div>
            </div>
            <div className="document">
              <h3>Simple Client TCP</h3>
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
      </div>
    )
  }
}

export default BrowseGridItem
