import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };
  }


  componentDidMount() {
    if (this.props.auth.isAdmin) {
      return this.props.history.push("/admin");
    }

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // Occurs every single time when the component receives somethings
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("NextProps.errors", nextProps.errors)
      //The component is rerendered every time for a setState call
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.registerUser(newUser, this.props.history);
  };


  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Go Home
            </Link>
            <div className="col s10" style={{ paddingLeft: "11px" }}>
              <h4>
                <b>Register</b>
              </h4>
              <p className="text-darken-3">
                Have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s10">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Enter your name here</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s10">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Enter your email here</label>
                <span className="red-text">{errors.email || errors.message}</span>
              </div>


              <div className="input-field col s10">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Enter your password here</label>
                <span className="red-text">{errors.password}</span>
              </div>


              <div className="col s10" style={{ paddingLeft: "11px" }}>
                <button
                  style={{
                    width: "125px",
                    borderRadius: "2px",
                    letterSpacing: "1.5px"
                  }}
                  type="submit"
                  className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}



// required values
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


//passing the state and component as props
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));