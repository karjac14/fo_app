import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";
import propTypes from "prop-types";
import moment from 'moment';

import { fcUrl } from '../config'

import axios from 'axios';


class choose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: null
        };

        // this.toggleMode = this.toggleMode.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.logIn = this.logIn.bind(this);
        // this.signUp = this.signUp.bind(this);
    }


    componentDidMount() {

        let week = moment().week();
        let year = moment().year();
        let firstDay = moment().startOf('week').toDate();;
        let lastDay = moment().endOf('week').toDate();;




        const { isAuth, uid } = this.props.currentUser;

        axios.get(fcUrl + "suggestions/", {
            params: {
                uid: uid,
                week,
                year,
                firstDay,
                lastDay
            }
        }).then(res => {
            console.log(res);
            this.setState({ suggestions: res.data.suggestions });
        }).catch(err => {
            console.log(err);
        });
    }

    submit(e) {

        //TODO: after success submit, redirect user choose meals
        //TODO: disble submit buitton to prevent double send, add spinner

        e.preventDefault();
        const { isAuth, uid } = this.props.currentUser;

        if (isAuth) {
            axios.post(fcUrl + "suggestions/", {
                params: { data: this.state, uid: uid }
            }).then(res => {
                console.log(res);
                console.log("success added pref");
            }).catch(err => {
                console.log(err);
                console.log("failed adding pref");
            });
        }
    }

    render() {
        const { f_name, uid } = this.props.currentUser;
        const { suggestions } = this.state;

        let form;
        if (suggestions) {
            form = (
                <div className="row">
                    {suggestions.map((suggestion, i) => (
                        <div key={suggestion.id} className="col-xs-12 col-sm-6 col-md-4 col-xl-3">
                            <Card>
                                <Card.Img variant="top" src={suggestion.image} />
                                <Card.Body>
                                    <Card.Title>{suggestion.title}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

            )
        } else {
            form = 'spinner';
        }

        return (
            <div>
                <div className="container">
                    <h4>Hi {f_name}!</h4>
                    <h2>Choose meals below</h2>
                    {form}
                </div>
            </div>
        )
    }
}



choose.propTypes = {
    currentUser: propTypes.object,
};

function mapStateToProps(state) {
    const { currentUser } = state
    return { currentUser: currentUser }
}


export default connect(mapStateToProps, {})(choose);
