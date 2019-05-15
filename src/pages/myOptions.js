import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";
import propTypes from "prop-types";
import moment from 'moment';
import { Redirect } from "react-router-dom";
import foHttp from '../helpers/fohttp';
import Button from "react-bootstrap/Button";

import "../styles/options.scss";


class myOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: null,
            hasPreferences: null
        };

        // this.toggleMode = this.toggleMode.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.logIn = this.logIn.bind(this);
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

        foHttp("GET", "suggestions", params).then(res => {
            if (res.success) {
                this.setState(res.data);
            } else {

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

    submit(e) {

        //TODO: after success submit, redirect user choose meals
        //TODO: disble submit buitton to prevent double send, add spinner

        e.preventDefault();

        let params = this.state;

        foHttp("POST", "suggestions", params).then(res =>
            console.log(res)
        )


    }

    render() {
        const { f_name } = this.props.currentUser;
        const { suggestions, hasPreferences } = this.state;


        if (hasPreferences === false) {
            return <Redirect to="/my-preferences" />
        }


        let form;
        if (suggestions) {
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
                    Fetching meals...
                    <br />
                    <br />
                    <div id="loading-spinner"></div>
                </div>
            );
        }

        return (

            <div className="container page-main">
                <h4>Hi {f_name}!</h4>
                <h2 className="fo-text">Choose meals below</h2>
                {form}

            </div>

        )
    }
}



myOptions.propTypes = {
    currentUser: propTypes.object,
    // submit: propTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { currentUser } = state
    return { currentUser: currentUser }
}


export default connect(mapStateToProps, {})(myOptions);
