import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import propTypes from "prop-types";
import foHttp from '../helpers/fohttp';
import "../styles/radio-group.scss";
import defaultPreferences from "../hard-data/preferences";


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
    let params = {
      preferences: this.state.preferences
    }
    foHttp("POST", "preferences", params).then(res =>
      console.log(res)
    )
  }

  componentDidMount() {

    // TODO: add spinner while waiting for preferences 
    foHttp("GET", "preferences").then(res => {
      if (res.data) {
        this.setState({ preferences: res.data })
      }
    })

  }



  render() {

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

