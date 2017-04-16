import Q from 'q'
import axios from 'axios'

const FQDN = "http://localhost:4000"

class TakroService {

  /*===============================+
   | Liste des fichiers            |
   +-------------------------------*/
  getFiles() {
    var deffered = Q.defer()

    axios.get(FQDN+"/api/docs")
    .then((response) => {
      deffered.resolve(response.data)
    })

    return deffered.promise
  }

  /*===============================+
   | Vérification du login         |
   +-------------------------------*/
   checkLogin(email, password) {
     var deffered = Q.defer()
     axios.post(FQDN+"/auth/login", {
       username: email,
       password: password
     })
     .then((response) => {
       if (response.data === "success") {
         location.href="/";
       }
       deffered.resolve(response.data)
     })
     return deffered.promise
   }

   /*===============================+
    | Vérification de la session    |
    +-------------------------------*/
    isConnected(){
      var deffered = Q.defer()

      axios.get(FQDN+"/auth/user_data")
      .then((response) => {
        deffered.resolve(response.data)
      })

      return deffered.promise
    }
}

export default new TakroService();
