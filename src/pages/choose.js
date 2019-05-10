import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from "prop-types";
import moment from 'moment';

import { fcUrl } from '../config'

import axios from 'axios';


class choose extends Component {


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
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { f_name, uid } = this.props.currentUser;
        return (
            <div>
                <h4>Hi {f_name}!</h4>
                <h2>Choose meals below</h2>
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
