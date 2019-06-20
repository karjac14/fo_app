import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import moment from 'moment';
import foHttp from '../helpers/fohttp';
import dectoFrac from '../helpers/decimal-fraction';
import propTypes from "prop-types";
import ProgressBar from "../components/progress-view";
import CalendarIndicator from "../components/calendar-indicator";
import AccountPane from "../components/account-pane";
import ReferPane from "../components/refer-pane";
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
            hasSuggestions: false,
            hasPreferences: false
        };


    }

    componentDidMount() {

        const { week, year } = this.state;

        let params = {
            week,
            year
        };

        foHttp("GET", "status", params).then(res => {
            console.log(res.data);
            if (res.success) {
                if (res.data.hasSuggestions) {
                    this.setState({ hasSuggestions: true });
                } else if (res.data.hasPreferences) {
                    this.setState({ hasPreferences: true });
                } else {
                    this.props.updateHasOptions(true);
                    this.props.updateHasPreferences(true);
                    this.setState({ ingredients: res.data.ingredients })
                }
            }
        })



    }

    changeWeek(date) {
        console.log(`changing week to: ${date}`); // TODO: use this event later when user wants to see previous meals
    }

    handleRadioChange = (ing, i) => event => {
        this.setState(prevState => {
            const ingredients = [...prevState.ingredients];
            ingredients[i].cart = !prevState.ingredients[i].cart;

            let params = {
                ingredients,
                week: prevState.week,
                year: prevState.year
            }
            foHttp("PUT", "groceries", params);
            return {
                ingredients
            };
        });



    };



    render() {

        const { progress, currentUser } = this.props;
        const { noSelection, noSuggestions, ingredients } = this.state;

        if (noSelection || noSuggestions) {
            return <Redirect to="/my-options" />
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