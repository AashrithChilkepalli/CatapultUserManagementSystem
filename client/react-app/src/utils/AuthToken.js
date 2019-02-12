import axios from "axios";


const AuthToken = token => {
  if (token) {
    // If there is a token , Apply it
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // If no token, delete it
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default AuthToken;