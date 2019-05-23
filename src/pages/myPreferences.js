import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import propTypes from "prop-types";
import foHttp from "../helpers/fohttp";
import moment from "moment";
import "../styles/radio-group.scss";
import defaultPreferences from "../hard-data/preferences";
import ProgressBar from "../components/progress-view";

class myPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: defaultPreferences
    };

    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleRadioChange = i => event => {
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
  };

  handleCheckboxChange = i => changeEvent => {
    this.setState(prevState => ({
      preferences: {
        ...prevState.preferences,
        ...(prevState.preferences.moreFilters.options[i].selected = !prevState
          .preferences.moreFilters.options[i].selected)
      }
    }));
  };

  submit(e) {
    //TODO: after success submit, redirect user choose meals
    //TODO: disble submit buitton to prevent double send, add spinner

    e.preventDefault();

    let week = moment().week();
    let year = moment().year();

    let params = {
      preferences: this.state.preferences,
      week,
      year
    };
    foHttp("POST", "preferences", params).then(res => {
      this.setState({ redirectToOptions: true })
    });
  }

  componentDidMount() {
    // TODO: add spinner while waiting for preferences
    const { isAuth, isNewUser } = this.props.currentUser;

    if (!isNewUser) {
      foHttp("GET", "preferences").then(res => {
        if (res.data) {
          this.setState({ preferences: res.data });
        }
      });
    }

  }

  render() {
    const { preferences, redirectToOptions } = this.state;

    if (redirectToOptions) {
      return <Redirect to="/my-options" />;
    }

    return (
      <div className="container page-main">
        <div className="row">
          <ProgressBar></ProgressBar>
        </div>
        <div className="row">
          <aside className="panel-left d-none d-md-block col-md-3">
            <div className="card">
              <div className="card-body">Hi</div>
            </div>
          </aside>
          <div className="panel-main col-xs-12 col-md-9">
            <div className="card shadow">
              <div className="card-body">
                <h2>Diet Preferences</h2>
                <p>
                  Answer a few questions to help us personalize your menu
                  options. You can change these any time later.
                </p>
                <br />
                <Form onSubmit={this.submit}>
                  <fieldset>
                    <Form.Group className="container-fluid">
                      <h4>How many meals you plan to cook weekly?</h4>
                      <div className="row">
                        {preferences.dishCountFilters.options.map(
                          (option, i) => (
                            <div
                              key={option.value}
                              className="radio-piece single-info col-xs-6 col-sm-4 col-md-2"
                            >
                              <label className="text-center">
                                <input
                                  type="radio"
                                  name="dishCount"
                                  value={option.value}
                                  checked={option.selected}
                                  onChange={this.handleRadioChange(i)}
                                />
                                <div className="radio-body text-center align-middle">
                                  {option.label}
                                </div>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </Form.Group>
                  </fieldset>
                  <fieldset>
                    <Form.Group className="container">
                      <h4>Dietary preferences?</h4>
                      <div className="row row-eq-height">
                        {preferences.dietFilters.options.map((option, i) => (
                          <div
                            key={option.value}
                            className="radio-piece multi-info col-xs-6 col-sm-4 col-md-3"
                          >
                            <label className="text-center">
                              <input
                                type="radio"
                                name="diet"
                                value={option.value}
                                checked={option.selected}
                                onChange={this.handleRadioChange(i)}
                              />
                              <div className="radio-body align-middle">
                                <div className="option-title">
                                  {option.label}
                                </div>
                                <div className="option-desc">
                                  {option.definition}
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </Form.Group>
                  </fieldset>
                  <fieldset>
                    <Form.Group className="container">
                      <h4>
                        Intolerances?{" "}
                        <span className="text-secondary">(optional)</span>
                      </h4>
                      <div className="row">
                        {preferences.moreFilters.options.map((option, i) => (
                          <div
                            key={option.value}
                            className="radio-piece single-info col-xs-6 col-sm-4 col-md-3"
                          >
                            <label className="text-center">
                              <input
                                type="checkbox"
                                name={option.value}
                                value={option.value}
                                checked={option.selected}
                                onChange={this.handleCheckboxChange(i)}
                              />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

myPreferences.propTypes = {
  currentUser: propTypes.object
};

function mapStateToProps(state) {
  const { currentUser } = state;
  return { currentUser: currentUser };
}

export default connect(
  mapStateToProps,
  {}
)(myPreferences);
