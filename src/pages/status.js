import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import moment from 'moment';
import foHttp from '../helpers/fohttp';

import propTypes from "prop-types";


import { updateHasPreferences, updateHasOptions } from '../actions/progressActions';

import Icon from "@mdi/react";
import { mdiFridgeOutline, mdiCartOutline } from "@mdi/js";

import "../styles/groceries.scss";
import "../styles/pages.scss";


class status extends Component {

    constructor(props) {
        super(props);
        this.state = {
            week: moment().week(),
            year: moment().year(),
        };
    }

    componentDidMount() {


        const { week, year } = this.state;


        let params = {
            week,
            year
        };
        foHttp("GET", "status", params).then(res => {
            if (res.success) {
                if (res.data.hasChosen) {
                    this.setState({ hasChosen: true });
                    this.props.updateHasOptions(true);
                    this.props.updateHasPreferences(true);
                } else if (res.data.hasPreferences) {
                    this.setState({ hasPreferences: true });
                    this.props.updateHasPreferences(true);
                } else {
                    this.setState({ hasPreferences: false });
                }
            }
        })
    }

    render() {

        const { isAuth } = this.props.currentUser;
        const { hasChosen, hasPreferences, } = this.state;

        if (!isAuth) {
            return <Redirect to="/login" />
        }

        if (hasChosen) {
            return <Redirect to="/my-meals" />
        }

        if (hasPreferences) {
            return <Redirect to="/my-options" />
        }

        if (hasPreferences === false) {
            return <Redirect to="/my-preferences" />
        }

        return (
            <div className="container page-main groceries-page">

            </div>
        )
    }
}

status.propTypes = {
    currentUser: propTypes.object,
    updateHasOptions: propTypes.func,
    updateHasPreferences: propTypes.func,
};

function mapStateToProps(state) {
    const { currentUser, progress } = state
    return { currentUser: currentUser, progress: progress }
}


export default connect(mapStateToProps, { updateHasOptions, updateHasPreferences })(status);