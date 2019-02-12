import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
        <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "sans-serif",
                textAlign : 'center'
              }}
              className="brand-logo center scale-transition scale-out blue-text text-darken-2"
            >
              Catapult Sports
          </Link>
          </div>
        </nav>
      </div>

    );
  }
}
export default Navbar;