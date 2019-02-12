import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AuthToken from "./utils/AuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminRoute from "./components/private-route/AdminRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AdminConsole from "./components/dashboard/AdminConsole";


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  AuthToken(token);
  // Decode the token to get the user info
  const decoded = jwt_decode(token);
  console.log("The decoded value is", decoded)
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Redirecting
    window.location.href = "./login";
  }
}


class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <AdminRoute exact path ="/admin" component={AdminConsole} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;