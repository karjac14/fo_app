import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";
import propTypes from "prop-types";
import moment from 'moment';
import Truncate from 'react-truncate';
import { Redirect, Link } from "react-router-dom";
import foHttp from '../helpers/fohttp';
import Button from "react-bootstrap/Button";
import ProgressBar from "../components/progress-view";
import CalendarIndicator from "../components/calendar-indicator";
import AccountPane from "../components/account-pane";
import ReferPane from "../components/refer-pane";
import { updateHasPreferences, updateHasOptions } from '../actions/progressActions';


import Icon from "@mdi/react";
import { mdiCheckCircle, mdiPlusCircleOutline, mdiMinusCircle, mdiAccountGroup, mdiBarleyOff } from "@mdi/js";



import "../styles/options.scss";
import "../styles/pages.scss";


class myOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: null,
            noPreferences: null,
            week: moment().week(),
            year: moment().year(),
            today: moment(),
            firstDay: moment().startOf('week'),
            lastDay: moment().endOf('week')
        };

        this.submit = this.submit.bind(this);
    }


    componentDidMount() {

        const { week, year, firstDay, lastDay } = this.state;

        let params = {
            week,
            year,
            firstDay,
            lastDay
        };

        foHttp("GET", "suggestions", params).then(res => {
            if (res.success) {
                if (res.data.noPreferences) {
                    this.props.updateHasPreferences(false);
                    this.setState({ noPreferences: true });
                } else {
                    this.props.updateHasPreferences(true);
                    this.setState({ suggestions: res.data.suggestions });
                    this.setState({ newWeek: res.data.newWeek });
                }
            }
        })
    }

    handleCheckboxChange = (i) => changeEvent => {
        this.setState(prevState => {
            const suggestions = [...prevState.suggestions];
            suggestions[i].selected = !prevState.suggestions[i].selected;
            return {
                suggestions
            };
        });
    };

    changeWeek(date) {
        console.log(`changing week to: ${date}`); // TODO: use this event later when user wants to see previous meals
    }

    submit(e) {


        //TODO: disble submit buitton to prevent double send, add spinner

        e.preventDefault();

        const { week, year, suggestions } = this.state;

        let params = {
            week,
            year,
            suggestions
        };

        foHttp("POST", "suggestions", params).then(() => {

            this.props.updateHasPreferences(true);
            this.props.updateHasOptions(true);
            this.setState({ redirectToMeals: true })
        })


    }

    render() {

        const { progress, currentUser } = this.props;
        const { suggestions, noPreferences, redirectToMeals, newWeek } = this.state;


        let form;

        if (redirectToMeals) {
            form = <Redirect to="/my-meals" />
        } else if (noPreferences) {
            form = <Redirect to="/my-preferences" />
        } else if (suggestions) {
            form = (
                <div className="options-container">
                    <div className="row row-eq-height">
                        {suggestions.map((suggestion, i) => (
                            <div key={suggestion.id} className="col col-12 col-sm-6 col-lg-4">
                                <Card>
                                    <Card.Img variant="top" src={suggestion.image} />
                                    <Card.Body>
                                        <h6>
                                            <Truncate lines={3} ellipsis={<span>... <a href='/'></a></span>}>
                                                {suggestion.title} &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                            </Truncate>
                                        </h6>
                                        <div>
                                            <p>
                                                {suggestion.readyInMinutes &&
                                                    <span title="preparation and cooking time">{suggestion.readyInMinutes} mins &nbsp; | &nbsp; </span>
                                                }
                                                {suggestion.servings &&
                                                    <span title="no. of servings"> <Icon size={.7} path={mdiAccountGroup} /> <span> {suggestion.servings}  &nbsp; | &nbsp;  </span></span>
                                                }
                                                {suggestion.glutenFree &&
                                                    <span className="gluten-free" title="*gluten-free"> <Icon size={.7} path={mdiBarleyOff} /> </span>
                                                }
                                            </p>
                                            <label className="checkbox-body">
                                                <input type="checkbox" name={suggestion.id} value={suggestion.selected} checked={suggestion.selected} onChange={this.handleCheckboxChange(i)} />
                                                <div className="checkbox-mask">
                                                    <div className="checked">
                                                        <Icon className="plus" path={mdiCheckCircle} />
                                                        <Icon className="minus" path={mdiMinusCircle} />
                                                    </div>
                                                    <div className="unchecked">
                                                        <Icon path={mdiPlusCircleOutline} />
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Button type="submit" onClick={this.submit}>Save Selection</Button>
                    </div>
                </div>
            )
        } else {
            form = (
                <div className="text-center">
                    Fetching suggestions...
                    <br />
                    <br />
                    <div id="loading-spinner"></div>
                </div>
            );
        }



        return (
            <div className="container page-main page-options">
                <div className="row">
                    <aside className="panel-left d-none d-md-block col-md-3">
                        <div>
                        </div>
                    </aside>
                    <div className="panel-main col-xs-12 col-md-9">
                        <ProgressBar activeRoute="2" progress={progress}></ProgressBar>
                    </div>
                </div>
                <div className="row">
                    <aside className="panel-left d-none d-md-block col-md-3">
                        <div className="panel-left-sub">
                            <AccountPane currentUser={currentUser}></AccountPane>
                        </div>
                        <div className="panel-left-sub">
                            <h6>Week View</h6>
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

                                <h2>{newWeek ? `New meal suggestions for you this week` : `Here are your options for this week`}</h2>
                                <p>
                                    Click the plus buttons to select meals below that you wan to cook this week.
                                </p>
                                <br />
                                {form}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



myOptions.propTypes = {
    currentUser: propTypes.object,
    updateHasOptions: propTypes.func,
    updateHasPreferences: propTypes.func,
    proress: propTypes.object
};

function mapStateToProps(state) {
    const { currentUser, progress } = state
    return { currentUser: currentUser, progress: progress }
}


export default connect(mapStateToProps, { updateHasOptions, updateHasPreferences })(myOptions);
