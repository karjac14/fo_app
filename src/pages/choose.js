import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from "prop-types";

import { fcUrl } from '../config'

import axios from 'axios';

class choose extends Component {


    componentDidMount() {

        const { isAuth, uid } = this.props.currentUser;

        axios.get(fcUrl + "recipeSuggestions", {
            params: {
                uid: uid
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
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
