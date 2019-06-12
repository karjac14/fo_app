import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import propTypes from "prop-types";
import foHttp from "../helpers/fohttp";
import moment from "moment";
import defaultPreferences from "../hard-data/preferences";
import ProgressBar from "../components/progress-view";
import AccountPane from "../components/account-pane";
import ReferPane from "../components/refer-pane";
import { updateHasPreferences, updateHasOptions } from '../actions/progressActions';


import "../styles/radio-group.scss";
import "../styles/pages.scss";

class myPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: defaultPreferences,
      fetchingPreferences: true,
      disableSave: true
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
      }, disableSave: false
    }));
  };

  handleCheckboxChange = i => changeEvent => {
    this.setState(prevState => ({
      preferences: {
        ...prevState.preferences,
        ...(prevState.preferences.moreFilters.options[i].selected = !prevState
          .preferences.moreFilters.options[i].selected)
      }, disableSave: false
    }));
  };

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
      this.props.updateHasOptions(false);
      this.setState({ redirectToOptions: true })
      this.setState({ submitting: true });
    });
  }



  componentDidMount() {

    const { isNewUser } = this.props.currentUser;
    if (!isNewUser) {
      this.setState({ fetchingPreferences: true });
      foHttp("GET", "preferences").then(res => {
        this.setState({ fetchingPreferences: false });
        if (res.data) {
          this.setState({ preferences: res.data, hasExistingPref: true });
          this.props.updateHasPreferences(true);
        }
      });
    }

  }

  render() {
    const { preferences, redirectToOptions, disableSave, submitting, fetchingPreferences } = this.state;
    const { progress, currentUser } = this.props;

    if (redirectToOptions) {
      return <Redirect to="/my-options" />;
    }

    let view;

    if (fetchingPreferences) {
      view = (
        <div className="text-center">
          Fetching suggestions...
          <br />
          <br />
          <div id="loading-spinner"></div>
        </div>
      );
    } else {
      view = (<Form onSubmit={this.submit}>
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
                      <div className="radio-body text-center">
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
                        {option.label}<sup>{'' + String.fromCharCode(option.subtext)}</sup>
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
              Intolerances?
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

        <div className="text-center">
          {this.state.hasExistingPref ?
            <Link to="/my-meals">
              <button className="btn btn-link" href="#">Cancel</button>
            </Link> : null
          }
          <Button type="submit" disabled={disableSave}>{submitting ? "Saving..." : "Save Preferences"}</Button>

        </div>
      </Form>)
    }

    return (
      <div className="container page-main">
        <div className="row">
          <aside className="panel-left d-none d-md-block col-md-3">
            <div>
            </div>
          </aside>
          <div className="panel-main col-xs-12 col-md-9">
            <ProgressBar activeRoute="1" progress={progress}></ProgressBar>
          </div>
        </div>
        <div className="row">
          <aside className="panel-left d-none d-md-block col-md-3">
            <div>
              <div className="panel-left-sub">
                <AccountPane currentUser={currentUser}></AccountPane>
              </div>
              <div className="panel-left-sub">
                <h6>Quicklinks</h6>
                <ul className="list-unstyled">
                  <li ><Link to="/">Invite Friends</Link></li>
                  <li ><Link to="/">Account info</Link></li>
                </ul>
              </div>
              <div className="panel-left-sub">
                <ReferPane></ReferPane>
              </div>
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
                {view}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

myPreferences.propTypes = {
  currentUser: propTypes.object,
  updateHasPreferences: propTypes.func,
  updateHasOptions: propTypes.func
};

function mapStateToProps(state) {
  const { currentUser, progress } = state;
  return { currentUser: currentUser, progress: progress };
}

export default connect(
  mapStateToProps,
  { updateHasPreferences, updateHasOptions }
)(myPreferences);
