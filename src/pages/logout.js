import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/login.scss";
import { connect } from 'react-redux';
import { logOut } from '../actions/currentUserActions';



class logOutPage extends Component {
    componentDidMount() {
        this.props.logOut();
    }


    render() {
        if (this.props.isAuth !== true) {
            return (
                <div className="container">
                    <div className="centered text-center">

                        <h4>You have been successfully logged out.</h4>
                        <br></br>
                        <Link to="/">
                            <button className="btn btn-outline-primary" href="#">Back to Home</button>
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <div className="container">
                    <div className="centered text-center">
                        <p>Logging Out...</p>
                    </div>
                </div>
            </div>
        );
    }
}

logOutPage.propTypes = {
    isAuth: propTypes.bool,
};

function mapStateToProps(state) {
    const { currentUser } = state
    return { isAuth: currentUser.isAuth }
}

export default connect(mapStateToProps, { logOut })(logOutPage);