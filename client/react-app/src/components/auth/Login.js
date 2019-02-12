import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and the user navigates to Register page, should redirect them to dashboard

    if (this.props.auth.isAdmin) {
      return this.props.history.push("/admin");
    }


    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAdmin) {
      return this.props.history.push("/admin");
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  onSubmit = e => {
    e.preventDefault();
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    // If Thunk is not used , this will throw an error --> To return a function
    this.props.loginUser(userData);
  };


  render() {
    const errors  = this.state.errors;

    return (
      <div className="container">
        <div style={{ marginTop: "3rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Go HOME
            </Link>
            <div className="col s10" style={{ paddingLeft: "11px" }}>
              <h4>
                <b>Login</b>
              </h4>
              <p className="grey-text text-darken-2">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s10">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                  
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>

              <div className="input-field col s10">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                  
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>


              <div className="col s10" style={{ paddingLeft: "11px" }}>
                <button
                  style={{
                    width: "125px",
                    borderRadius: "2px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// Passing state as props to the component along with loginUser Component
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);