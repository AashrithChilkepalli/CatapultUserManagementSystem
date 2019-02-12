import React, { Component } from "react";
import { Link } from "react-router-dom";



class Landing extends Component {
  render() {
    return (
      <div style={{ height: "70vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <span className=" blue-text text-darken-2" style={{ fontFamily: "monospace" }}><b>User Registration Portal</b></span> 
            </h4>
            <br />

            <Link to ="/register"
              style={{
                width: "125px",
                borderRadius: "2.5px",
                letterSpacing: "1.5px",
                textAlign : "center"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </Link>

            <Link to = "/login"
              style={{
                marginLeft: "2rem",
                width: "125px",
                borderRadius: "2.5px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable blue accent-3"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;