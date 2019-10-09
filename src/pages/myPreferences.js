import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import propTypes from "prop-types";

import ProgressBar from "../components/progress-view";
import AccountPane from "../components/account-pane";
import ReferPane from "../components/refer-pane";
import { updateHasPreferences, updateHasChosen } from '../actions/progressActions';
import "../styles/radio-group.scss";
import "../styles/pages.scss";
import "../styles/preferences.scss";
import Quicklinks from "../components/quick-links";
import Preferences from "../components/sections/preferences";


class myPreferences extends Component {

  state = {
    redirectToOptions: false
  }



  // handleCheckboxChange = i => changeEvent => {
  //   this.setState(prevState => ({
  //     preferences: {
  //       ...prevState.preferences,
  //       ...(prevState.preferences.moreFilters.options[i].selected = !prevState
  //         .preferences.moreFilters.options[i].selected)
  //     }, disableSave: false
  //   }));
  // };

  // submit(e) {
  //   e.preventDefault();
  //   this.setState({ disableSave: true });
  //   this.setState({ submitting: true });

  //   let week = moment().week();
  //   let year = moment().year();

  //   let params = {
  //     preferences: this.state.preferences,
  //     week,
  //     year
  //   };
  //   foHttp("POST", "preferences", params).then(res => {
  //     this.props.updateHasPreferences(true);
  //     this.props.updateHasChosen(false);
  //     this.setState({ redirectToOptions: true })
  //     this.setState({ submitting: true });
  //   });
  // }



  // componentDidMount() {

  //   const { isNewUser } = this.props.currentUser;
  //   if (!isNewUser) {
  //     this.setState({ fetchingPreferences: true });
  //     foHttp("GET", "preferences").then(res => {
  //       this.setState({ fetchingPreferences: false });
  //       if (res.data) {
  //         this.setState({ preferences: res.data, hasExistingPref: true });
  //         this.props.updateHasPreferences(true);
  //       }
  //     });
  //   } else {
  //     this.setState({ fetchingPreferences: false });
  //   }

  // }

  render() {
    const { redirectToOptions } = this.state;
    const { progress, currentUser } = this.props;

    if (redirectToOptions) {
      return <Redirect to="/my-options" />;
    }



    return (
      <div className="container page-main preferences-page">
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
            <AccountPane currentUser={currentUser}></AccountPane>
            <Quicklinks parent="preference-page"></Quicklinks>
            <ReferPane></ReferPane>
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
                <Preferences currentUser={currentUser}></Preferences>
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
  updateHasChosen: propTypes.func,
  progress: propTypes.object,
};

function mapStateToProps(state) {
  const { currentUser, progress } = state;
  return { currentUser: currentUser, progress: progress };
}

export default connect(
  mapStateToProps,
  { updateHasPreferences, updateHasChosen }
)(myPreferences);
