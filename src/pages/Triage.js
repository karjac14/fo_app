import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import moment from 'moment';

import propTypes from "prop-types";
import { getStatus } from '../actions/progressActions';
import "../styles/groceries.scss";
import "../styles/pages.scss";


class status extends Component {

    componentDidMount() {

        const { isAuth } = this.props.currentUser;
        if (isAuth) {
            let params = {
                week: moment().week(),
                year: moment().year(),
            };
            this.props.getStatus(params);
        }
    }

    render() {

        const { isAuth, f_name } = this.props.currentUser;
        const { hasChosen, hasPreferences, fetchedStatus } = this.props.progress;

        if (!isAuth) {
            return <Redirect to="/welcome" />
        }

        if (fetchedStatus && hasChosen) {
            return <Redirect to="/my-meals" />
        }

        if (fetchedStatus && hasPreferences) {
            return <Redirect to="/my-options" />
        }

        if (fetchedStatus && (hasPreferences === false)) {
            return <Redirect to="/my-preferences" />
        }

        return (
            <div className="container page-main groceries-page">
                <div className="text-center">
                    <br />
                    <br />
                    <h2>Welcome Back, {f_name}</h2>
                    Logging you in...
                    <br />
                    <br />
                    <div id="loading-spinner"></div>
                </div>
            </div>
        )
    }
}

status.propTypes = {
    currentUser: propTypes.object,
    getStatus: propTypes.func,
    progress: propTypes.object
};

function mapStateToProps(state) {
    const { currentUser, progress } = state
    return { currentUser: currentUser, progress: progress }
}

export default connect(mapStateToProps, { getStatus })(status);