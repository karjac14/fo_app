import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";
import propTypes from "prop-types";
import moment from 'moment';
import { Redirect } from "react-router-dom";
import foHttp from '../helpers/fohttp';
import Button from "react-bootstrap/Button";
import ProgressBar from "../components/progress-view";


import "../styles/options.scss";


class myOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: null,
            noPreferences: null
        };
        this.submit = this.submit.bind(this);
    }


    componentDidMount() {

        let week = moment().week();
        let year = moment().year();
        let firstDay = moment().startOf('week').toDate();;
        let lastDay = moment().endOf('week').toDate();;

        let params = {
            week,
            year,
            firstDay,
            lastDay
        };

        // foHttp("GET", "suggestions", params).then(res => {
        //     if (res.success) {
        //         if (res.data.noPreferences) {
        //             this.setState({ noPreferences: true });
        //         } else {
        //             this.setState(res.data);
        //         }
        //     }
        // })
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

    submit(e) {

        //TODO: after success submit, redirect user choose meals
        //TODO: disble submit buitton to prevent double send, add spinner

        e.preventDefault();

        let params = this.state;

        foHttp("POST", "suggestions", params).then(() =>
            this.setState({ redirectToMeals: true })
        )


    }

    render() {
        const { f_name } = this.props.currentUser;
        const { progress } = this.props;
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
                    <ProgressBar activeRoute="2" progress={progress}></ProgressBar>
                </div>
                <div className="row">
                    <aside className="panel-left d-none d-md-block col-md-3">
                        <div className="card">
                            <div className="card-body">{this.state.firstDay}<br />{this.state.lastDay}</div>
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
