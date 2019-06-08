import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import moment from 'moment';
import foHttp from '../helpers/fohttp';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import propTypes from "prop-types";
import ProgressBar from "../components/progress-view";
import CalendarIndicator from "../components/calendar-indicator";
import AccountPane from "../components/account-pane";
import ReferPane from "../components/refer-pane";
import { updateHasPreferences, updateHasOptions } from '../actions/progressActions';




import "../styles/pages.scss";


class myMeals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noSelection: false,
            noSuggestions: false,
            week: moment().week(),
            year: moment().year(),
            today: moment(),
            firstDay: moment().startOf('week'),
            lastDay: moment().endOf('week')
        };

        // this.toggleMode = this.toggleMode.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.logIn = this.logIn.bind(this);
        // this.submit = this.submit.bind(this);
    }

    componentDidMount() {

        const { week, year } = this.state;

        let params = {
            week,
            year
        };

        foHttp("GET", "groceries", params).then(res => {
            if (res.success) {
                this.setState({ ingredients: res.data.ingredients })
            }
        })



    }

    changeWeek(date) {
        console.log(`changing week to: ${date}`); // TODO: use this event later when user wants to see previous meals
    }



    render() {

        const { progress, currentUser } = this.props;
        const { noSelection, noSuggestions, ingredients } = this.state;

        // if (noSelection || noSuggestions) {
        //     // TODO: if no choices this week redirect user to choose page
        //     return <Redirect to="/my-options" />
        // }


        let form;
        if (ingredients) {
            form = (
                <div>

                    {ingredients.map((ing, i) => (
                        <div key={ing.id} className="">
                            {ing.originalName} {ing.amount} {ing.unit}
                        </div>
                    ))}

                </div>
            )
        } else {
            form = (
                <div className="text-center">
                    Fetching meals...
                <br />
                    <br />
                    <div id="loading-spinner"></div>
                </div>
            );
        }

        return (

            <div className="container page-main">
                <div className="row">
                    <aside className="panel-left d-none d-md-block col-md-3">
                        <div>
                        </div>
                    </aside>
                    <div className="panel-main col-xs-12 col-md-9">
                        <ProgressBar activeRoute="4" progress={progress}></ProgressBar>
                    </div>
                </div>
                <div className="row">
                    <aside className="panel-left d-none d-md-block col-md-3">
                        <div className="panel-left-sub">
                            <AccountPane currentUser={currentUser}></AccountPane>
                        </div>
                        <div className="panel-left-sub">
                            <h6>This Week</h6>
                            <CalendarIndicator weekStart={this.state.firstDay} weekEnd={this.state.lastDay} today={this.state.today} changeWeek={this.changeWeek}></CalendarIndicator>
                        </div>
                        <div className="panel-left-sub">
                            <h6>Quicklinks</h6>
                            <ul className="list-unstyled">
                                <li ><Link to="/my-preferences">Modify diet preferences</Link></li>
                                <li ><Link to="/">Invite Friends</Link></li>
                                <li ><Link to="/">Account info</Link></li>
                            </ul>
                        </div>
                        <div className="panel-left-sub">
                            <ReferPane></ReferPane>
                        </div>
                    </aside>
                    <div className="panel-main col-xs-12 col-md-9">
                        <div className="card shadow">
                            <div className="card-body">
                                <h2>Groceries Items</h2>
                                <p>
                                    Answer a few questions to help us personalize your menu
                                    options. You can change these any time later.
                                </p>
                                <br />
                                {form}
                            </div>
                        </div>
                    </div>
                </div></div>

        )
    }
}

myMeals.propTypes = {
    currentUser: propTypes.object,
    updateHasOptions: propTypes.func,
    updateHasPreferences: propTypes.func,
};

function mapStateToProps(state) {
    const { currentUser, progress } = state
    return { currentUser: currentUser, progress: progress }
}


export default connect(mapStateToProps, { updateHasOptions, updateHasPreferences })(myMeals);