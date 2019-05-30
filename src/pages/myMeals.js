import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import moment from 'moment';
import foHttp from '../helpers/fohttp';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import propTypes from "prop-types";
import ProgressBar from "../components/progress-view";
import CalendarIndicator from "../components/calendar-indicator";


import "../styles/pages.scss";


class myMeals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noSelection: false,
      noSuggestions: false,
      week: moment().week(),
      year: moment().year(),
      today: moment(),
      firstDay: moment().startOf('week'),
      lastDay: moment().endOf('week')
    };

    // this.toggleMode = this.toggleMode.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.logIn = this.logIn.bind(this);
    // this.submit = this.submit.bind(this);
  }

  componentDidMount() {

    const { week, year } = this.state;

    let params = {
      week,
      year
    };

    foHttp("GET", "meals", params).then(res => {
      if (res.success) {
        if (res.data.noSelection) {
          this.setState({ noSelection: true });
        } else if (res.data.noSuggestions) {
          this.setState({ noSuggestions: true });
        } else {
          this.setState(res.data);
        }
      }
    })



  }

  changeWeek(date) {
    console.log(`changing week to: ${date}`); // TODO: use this event later when user wants to see previous meals
  }



  render() {

    const { progress } = this.props;
    const { noSelection, noSuggestions, meals } = this.state;

    if (noSelection || noSuggestions) {
      // TODO: if no choices this week redirect user to choose page
      return <Redirect to="/my-options" />
    }


    let form;
    if (meals) {
      form = (
        <div>
          <div className="row">
            {meals.map((suggestion, i) => (
              <div key={suggestion.id} className="col-xs-12 col-sm-6 col-md-4 col-xl-3">
                <Card>
                  <Card.Img variant="top" src={suggestion.image} />
                  <Card.Body>
                    <Card.Title>{suggestion.title}</Card.Title>
                    <Card.Text>

                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          {/* <div className="text-center">
            <Button type="submit" onClick={this.submit}>Save Selection</Button>
          </div> */}
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
        <div className="row">
          <aside className="panel-left d-none d-md-block col-md-3">
            <div>
            </div>
          </aside>
          <div className="panel-main col-xs-12 col-md-9">
            <ProgressBar activeRoute="3" progress={progress}></ProgressBar>
          </div>
        </div>
        <div className="row">
          <aside className="panel-left d-none d-md-block col-md-3">
            <div>
              <h5>This Week</h5>
              <CalendarIndicator weekStart={this.state.firstDay} weekEnd={this.state.lastDay} today={this.state.today} changeWeek={this.changeWeek}></CalendarIndicator>
            </div>
          </aside>
          <div className="panel-main col-xs-12 col-md-9">
            <div className="card shadow">
              <div className="card-body">
                <h2>Your Meals!</h2>
                <p>
                  Answer a few questions to help us personalize your menu
                  options. You can change these any time later.
                                </p>
                <br />
                {form}
              </div>
            </div>
          </div>
        </div></div>

    )
  }
}

myMeals.propTypes = {
  currentUser: propTypes.object,
  // submit: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { currentUser, progress } = state
  return { currentUser: currentUser, progress: progress }
}


export default connect(mapStateToProps, {})(myMeals);