
import axios from "axios"

 class UserService{

  getUserName(){

     return axios.get("https://randomuser.me/api");
    }


   
}

export default new UserService