import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";
import propTypes from "prop-types";
import moment from 'moment';
import { Redirect } from "react-router-dom";
import foHttp from '../helpers/fohttp';
import Button from "react-bootstrap/Button";
import ProgressBar from "../components/progress-view";
import CalendarIndicator from "../components/calendar-indicator";
import AccountPane from "../components/account-pane";
import ReferPane from "../components/refer-pane";



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
                    this.setState({ noPreferences: true });
                } else {
                    this.setState({ suggestions: res.data.suggestions });
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

        //TODO: after success submit, redirect user choose meals
        //TODO: disble submit buitton to prevent double send, add spinner

        e.preventDefault();

        const { week, year, suggestions } = this.state;

        let params = {
            week,
            year,
            suggestions
        };

        foHttp("POST", "suggestions", params).then(() =>
            this.setState({ redirectToMeals: true })
        )


    }

    render() {

        const { progress, currentUser } = this.props;
        const { suggestions, noPreferences, redirectToMeals } = this.state;


        let form;

        if (redirectToMeals) {
            form = <Redirect to="/my-meals" />
        } else if (noPreferences) {
            form = <Redirect to="/my-preferences" />
        } else if (suggestions) {
            form = (
                <div>
                    <div className="row">
                        {suggestions.map((suggestion, i) => (
                            <div key={suggestion.id} className="col-xs-12 col-sm-6 col-md-4 col-xl-3">
                                <Card>
                                    <Card.Img variant="top" src={suggestion.image} />
                                    <Card.Body>
                                        <Card.Title>{suggestion.title}</Card.Title>
                                        <Card.Text>

                                        </Card.Text>
                                        <input type="checkbox" name={suggestion.id} value={suggestion.selected} checked={suggestion.selected} onChange={this.handleCheckboxChange(i)} />
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
            <div className="container page-main">
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
                            <h5>Week View</h5>
                            <CalendarIndicator weekStart={this.state.firstDay} weekEnd={this.state.lastDay} today={this.state.today} changeWeek={this.changeWeek}></CalendarIndicator>
                        </div>
                        <div className="panel-left-sub">
                            <h5>Settings</h5>
                            <ul className="list-unstyled">
                                <li >Cras justo odio</li>
                                <li >Dapibus ac facilisis in</li>
                                <li >Morbi leo risus</li>
                                <li >Porta ac consectetur ac</li>
                                <li >Vestibulum at eros</li>
                            </ul>
                        </div>
                        <div className="panel-left-sub">
                            <ReferPane></ReferPane>
                        </div>
                    </aside>
                    <div className="panel-main col-xs-12 col-md-9">
                        <div className="card shadow">
                            <div className="card-body">
                                {/* TODO: fresh options of the week verbiage */}
                                <h2>Its a brand new week</h2>
                                <p>
                                    Answer a few questions to help us personalize your menu
                                    options. You can change these any time later.
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
    // submit: propTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { currentUser, progress } = state
    return { currentUser: currentUser, progress: progress }
}


export default connect(mapStateToProps, {})(myOptions);
