import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import propTypes from "prop-types";

import { fcUrl } from '../config'

import "../styles/radio-group.scss";

import axios from 'axios';

import defaultPreferences from "../hard-data/preferences";

import firebase from 'firebase/app';
import 'firebase/firestore';

var db = firebase.firestore();
var prefRef = db.collection("user_preferences");

class myPreferences extends Component {

  constructor(props) {
    super(props);
    this.state = {
      preferences: defaultPreferences,
    };

    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  handleRadioChange = (i) => event => {
    console.log(event)
    const name = event.target.name + "Filters";

    const filter = Object.assign({}, this.state.preferences[name]);
    filter.options.forEach((el, j) => {
      filter.options[j].selected = i === j ? true : false;
    });

    this.setState(prevState => ({
      ...prevState,
      preferences: {
        ...prevState.preferences,
        [name]: filter
      }
    }));
  }

  handleCheckboxChange = (i) => changeEvent => {
    console.log("hh");
    this.setState(prevState => ({
      preferences: {
        ...prevState.preferences,
        ...prevState.preferences.moreFilters.options[i].selected = !prevState.preferences.moreFilters.options[i].selected
      }
    }));


  };



  submit(e) {

    //TODO: after success submit, redirect user choose meals
    //TODO: disble submit buitton to prevent double send, add spinner

    e.preventDefault();
    const { isAuth, uid } = this.props.currentUser;

    if (isAuth) {
      axios.post(fcUrl + "preferences/", {
        params: { preferences: this.state.preferences, uid: uid }
      }).then(res => {
        console.log(res);
        console.log("success added pref");
      }).catch(err => {
        console.log(err);
        console.log("failed adding pref");
      });
    }
  }

  componentDidMount() {

    // TODO: add spinner while waiting for preferences 

    const { isAuth, uid } = this.props.currentUser;

    if (isAuth) {
      axios.get(fcUrl + "preferences/", {
        params: { uid: uid }
      }).then(res => {
        let db_preferences = res.data;
        if (db_preferences) {
          this.setState({ preferences: db_preferences });
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }



  render() {
    const { f_name, uid } = this.props.currentUser;
    const { preferences } = this.state;
    return (
      <div className="container page-main">
        
        <h2>Diet Preferences</h2>
        <p>Answer a few questions to help us personalize your menu options. You can change these any time. </p>
        <Form onSubmit={this.submit}>
          <fieldset>
            <Form.Group className="container">
              <h4>
              How many dishes you plan to cook weekly?
              </h4>
              <div className="row no-gutters">
                {preferences.dishCountFilters.options.map((option, i) => (
                  <div key={option.value} className="radio-piece col-xs-6 col-sm-4 col-md-2">
                        <label className="text-center">
                          <input type="radio" name="dishCount" value={option.value} checked={option.selected} onChange={this.handleRadioChange(i)} />
                          <div className="radio-body">{option.label}</div>
                        </label>
                  </div>
                ))}
              </div>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group className="container">
              <h4>
              Dietary preferences? 
              </h4>
              <div className="row no-gutters">
                {preferences.dietFilters.options.map((option, i) => (
                  <div key={option.value} className="radio-piece col-xs-6 col-sm-4 col-md-2">
                        <label className="text-center">
                          <input type="radio" name="diet" value={option.value} checked={option.selected} onChange={this.handleRadioChange(i)} />
                          <div className="radio-body">{option.label}</div>
                        </label>
                  </div>
                ))}
              </div>
            </Form.Group >
          </fieldset>
          <fieldset>
            <Form.Group className="container">
              <h4>
              Intolerances? <span className="text-secondary">(optional)</span>
              </h4>
              <div className="row no-gutters">
                {preferences.moreFilters.options.map((option, i) => (
                  <div key={option.value} className="radio-piece col-xs-6 col-sm-4 col-md-2">
                        <label className="text-center">
                          <input type="checkbox" name={option.value} value={option.value} checked={option.selected} onChange={this.handleCheckboxChange(i)} />
                          <div className="radio-body">{option.label}</div>
                        </label>
                  </div>
                ))}
              </div>
            </Form.Group>
          </fieldset>

          <Form.Group>
            <div className="text-center">
              <Button type="submit">Save Preferences</Button>
            </div>
          </Form.Group>
        </Form>


      </div >
    )
  }
}

myPreferences.propTypes = {
  currentUser: propTypes.object,
};

function mapStateToProps(state) {
  const { currentUser } = state
  return { currentUser: currentUser }
}


export default connect(mapStateToProps, {})(myPreferences);

