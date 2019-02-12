import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";



class AdminConsole extends Component {
    constructor(props) {

        super(props);
        this.state = {
            people: [],
            isLoaded: false,
            userInput: ''
        }

        this.deletePerson = this.deletePerson.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    deletePerson(email) {
        return () => {
            axios.post('/api/users/deleteUser', { email }).then((response) => {
                this.setState(prevState => ({
                    people: prevState.people.filter(person => person.email !== email)
                }));
            })
        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onSearch = e => {
        e.preventDefault();
        let userInput = this.state.userInput
        axios.post('/api/users/searchItem', { userInput }).then((response) => {
            this.setState({ people: response.data })
        })
    };


    handleInputChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }


    componentDidMount() {
        axios.get('/api/users/all')
            .then((response) => {
                this.setState({ people: response.data, isLoaded: true })
            })
        console.log("Successfully Mounted")
    }


    render() {
        return (
            <div style={{ height: "auto" }} className="container valign-wrapper">
                <div className="col s10 center-align">
                    <h5>
                        <p style={{ fontWeight: "bold", color: "#00004c" }}>Welcome to the Admin console</p>
                    </h5>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Search by Name"
                                        value={this.state.userInput}
                                        id="userInput"
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                                <td>

                                    <button className="btn waves-effect waves-light" onClick={this.onSearch} type="submit" name="action">Search
                                        <i className="material-icons right">send</i>
                                    </button>
                                </td>
                            </tr>
                            {this.state.people.length > 0 ?
                                <tr>
                                    <th>No.</th>
                                    <th>USERNAME</th>
                                    <th>EMAIL</th>
                                    <th>Action</th>
                                </tr> : null
                            }

                        </thead>
                        <tbody>
                            {this.state.people.map((person, index) => {
                                return (
                                    <tr key={person.email}>
                                        <th>{index + 1}</th>
                                        <td>{person.name}</td>
                                        <td>{person.email}</td>
                                        <td>
                                            <button className="waves-effect waves-light btn" onClick={this.deletePerson(person.email)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                            )}
                        </tbody>
                    </table>
                    <div style = {{marginTop : "10px"}}>
                    <button
                        style={{
                            width: "105px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                        }}
                        onClick={this.onLogoutClick}
                        className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
                    >
                        Logout
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}




AdminConsole.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { logoutUser }
)(AdminConsole);