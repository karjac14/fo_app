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
import { updateHasPreferences, updateHasChosen } from '../actions/progressActions';

import Icon from "@mdi/react";
import { mdiFridgeOutline, mdiCartOutline } from "@mdi/js";

import "../styles/groceries.scss";
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
                if (res.data.noSelection) {
                    this.setState({ noSelection: true });
                } else if (res.data.noSuggestions) {
                    this.setState({ noSuggestions: true });
                } else {
                    this.props.updateHasChosen(true);
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


        let form;
        if (ingredients) {
            form = (
                <div>
                    <div className="form-top-buttons-container">
                        <div className="left-buttons">
                        </div>
                        <div className="right-buttons">
                            <button className="btn btn-primary less-right-padding" href="#">Send to Woolworths <Icon path={mdiCartOutline} /></button>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush ingredients-ul">
                        {ingredients.map((ing, i) => (
                            <li key={ing.weekIngId} className="list-group-item">
                                <div className="row">
                                    <div className="col-2">
                                        <label className="text-center">
                                            <input
                                                type="radio"
                                                name={ing.weekIngId}
                                                value={ing.cart}
                                                checked={ing.cart}
                                                onChange={this.handleRadioChange(ing, i)}
                                            />
                                            <div className="radio-body text-center">
                                                <Icon path={mdiCartOutline} />
                                            </div>
                                        </label>
                                        <label className="text-center">
                                            <input
                                                type="radio"
                                                name={ing.weekIngId}
                                                value={!ing.cart}
                                                checked={!ing.cart}
                                                onChange={this.handleRadioChange(ing, i)}
                                            />
                                            <div className="radio-body text-center">
                                                <Icon path={mdiFridgeOutline} />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <p className="ing-name">{ing.name}
                                            <br />
                                            <small>{ing.aisle}</small>
                                        </p>

                                    </div>
                                    <div className="col-3">{dectoFrac(ing.amount)} {ing.unit}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="form-bottom-buttons-container">
                        <div className="left-buttons">
                            <Link to="/my-meals">
                                <button className="btn btn-link no-left-padding" href="#">View recipes</button>
                            </Link>
                        </div>
                        <div className="right-buttons">
                            <button className="btn btn-primary less-right-padding" href="#">Send to Woolworths <Icon path={mdiCartOutline} /></button>
                        </div>
                    </div>
                </div>
            )
        } else {
            form = (
                <div className="text-center">
                    Fetching all ingredients...
                <br />
                    <br />
                    <div id="loading-spinner"></div>
                </div>
            );
        }

        return (

            <div className="container page-main groceries-page">
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
                                <h2>Grocery List</h2>
                                <p>
                                    Here is your complete shopping list. Click the &apos;fridge&apos; button to mark items you already have in your pantry for easy reference.
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
    updateHasChosen: propTypes.func,
    updateHasPreferences: propTypes.func,
};

function mapStateToProps(state) {
    const { currentUser, progress } = state
    return { currentUser: currentUser, progress: progress }
}


export default connect(mapStateToProps, { updateHasChosen, updateHasPreferences })(myMeals);