import React, {Component} from 'react'

class MyTakro extends Component {

  componentWillMount() {
    console.log("My takro will mount");
  }

  render() {
    return (
      <div className="page">
        <h1>My Takro</h1>
        <p>Gestion des mes fichiers, statistiques</p>
      </div>
    )
  }
}

export default MyTakro
