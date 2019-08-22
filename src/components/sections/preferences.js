import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import defaultPreferences from "../../hard-data/preferences";
import foHttp from "../../helpers/fohttp";
import moment from "moment";
import FetchingText from "../../components/fetching-text";
import CheckboxSquares from "../elements/checkbox-squares";
import RadioSquares from "../elements/radio-squares";



class preferences extends Component {

    state = {
        preferences: defaultPreferences,
        fetchingPreferences: true,
        disableSave: true
    }

    componentDidMount() {

        const { isNewUser } = this.props.currentUser;

        if (!isNewUser) {
            this.setState({ fetchingPreferences: true });
            foHttp("GET", "preferences").then(res => {
                this.setState({ fetchingPreferences: false });
                if (res.data) {
                    this.setState({ preferences: res.data, hasExistingPref: true });
                    // this.props.updateHasPreferences(true);
                }
            });
        } else {
            this.setState({ fetchingPreferences: false });
        }

    }

    submit(e) {
        e.preventDefault();
        this.setState({ disableSave: true });
        this.setState({ submitting: true });

        let week = moment().week();
        let year = moment().year();

        let params = {
            preferences: this.state.preferences,
            week,
            year
        };
        foHttp("POST", "preferences", params).then(res => {
            this.props.updateHasPreferences(true);
            this.props.updateHasChosen(false);
            this.setState({ redirectToOptions: true })
            this.setState({ submitting: true });
        });
    }

    reduceOptions = (options, name) => {

        this.setState(prevState => ({
            preferences: {
                ...prevState.preferences,
                [`${name}Filters`]: {
                    ...prevState.preferences[`${name}Filters`],
                    options
                }
            }, disableSave: false
        }));
    };



    render() {

        const { preferences, redirectToOptions, disableSave, submitting, fetchingPreferences } = this.state;
        const { progress, currentUser } = this.props;

        if (redirectToOptions) {
            return <Redirect to="/my-options" />;
        }

        let view;

        if (fetchingPreferences) {
            view = (
                <FetchingText></FetchingText>
            );
        } else {
            view = (<Form onSubmit={this.submit}>
                <fieldset>
                    <Form.Group className="container-fluid">
                        <h4>How many meals you plan to cook weekly?</h4>
                        <div className="row">
                            <RadioSquares
                                options={preferences.dishCountFilters.options}
                                name={preferences.dishCountFilters.name}
                                updateOptions={this.reduceOptions}>
                            </RadioSquares>
                        </div>
                    </Form.Group>
                </fieldset>
                <fieldset>
                    <Form.Group className="container">
                        <h4>Dietary preferences?</h4>
                        <div className="row row-eq-height">
                            <RadioSquares
                                options={preferences.dietFilters.options}
                                name={preferences.dietFilters.name}
                                updateOptions={this.reduceOptions}>
                            </RadioSquares>
                        </div>
                    </Form.Group>
                </fieldset>
                <fieldset>
                    <Form.Group className="container">
                        <h4>
                            Any intolerances?
                        <span className="text-secondary">(optional)</span>
                        </h4>
                        <div className="row">
                            <CheckboxSquares
                                options={preferences.moreFilters.options}
                                name={preferences.moreFilters.name}
                                updateOptions={this.reduceOptions}>
                            </CheckboxSquares>
                        </div>
                    </Form.Group>
                </fieldset>

                <div className="form-bottom-buttons-container">
                    <div className="left-buttons">

                    </div>
                    <div className="right-buttons">
                        {this.state.hasExistingPref ?
                            <Link to="/my-meals">
                                <button className="btn btn-link" href="#">Cancel</button>
                            </Link> : null
                        }
                        <Button type="submit" className="less-right-padding" disabled={disableSave}>{submitting ? "Saving..." : "Save Preferences"}  &nbsp; &#9654;</Button>
                    </div>
                </div>
            </Form>)
        }


        return (
            <div>
                {view}
            </div>
        );
    }
}

preferences.propTypes = {
    currentUser: PropTypes.object
};

export default preferences;