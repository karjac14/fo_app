import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import propTypes from "prop-types";

import { fcUrl } from '../config'

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
      <div>
        <h4>Hi {f_name}!</h4>
        <h6>My Preferences</h6>

        <Form onSubmit={this.submit}>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Whats the default number of dishes you plan to cook this week?
              </Form.Label>
              <Col sm={10}>
                {preferences.dishCountFilters.options.map((option, i) => (
                  <div key={option.value}>
                    <Form.Check
                      custom
                      inline
                      name="dishCount"
                      value={option.value}
                      label={option.label}
                      type={preferences.dishCountFilters.type}
                      id={`dishCount-${option.value}`}
                      checked={option.selected}
                      onChange={this.handleRadioChange(i)} />
                    <br />
                    <small>{option.definition}</small>
                  </div>
                ))}
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Diet
              </Form.Label>
              <Col sm={10}>
                {preferences.dietFilters.options.map((option, i) => (
                  <div key={option.value}>
                    <Form.Check
                      custom
                      inline
                      name="diet"
                      value={option.value}
                      label={option.label}
                      type={preferences.dietFilters.type}
                      id={`diet-${option.value}`}
                      checked={option.selected}
                      onChange={this.handleRadioChange(i)} />
                    <br />
                    <small>{option.definition}</small>
                  </div>
                ))}
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                More Filters
              </Form.Label>
              <Col sm={10}>
                {preferences.moreFilters.options.map((option, i) => (
                  <div style={{ border: "solid 2px #333" }} key={option.value}>
                    <Form.Check
                      custom
                      inline
                      name={option.value}
                      value={option.value}
                      label={option.label}
                      type={preferences.moreFilters.type}
                      id={`diet-${option.value}`}
                      checked={option.selected}
                      onChange={this.handleCheckboxChange(i)} />
                    <br />
                    <small>{option.definition}</small>
                  </div>
                ))}
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Save Preferences</Button>
            </Col>
          </Form.Group>
        </Form>;


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

