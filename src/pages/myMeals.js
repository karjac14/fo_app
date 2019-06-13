import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import moment from 'moment';
import foHttp from '../helpers/fohttp';

import propTypes from "prop-types";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import ProgressBar from "../components/progress-view";
import CalendarIndicator from "../components/calendar-indicator";
import AccountPane from "../components/account-pane";
import ReferPane from "../components/refer-pane";
import RecipePane from "../components/recipe-pane";
import { updateHasPreferences, updateHasOptions } from '../actions/progressActions';



import Icon from "@mdi/react";
import { mdiAccountGroup, mdiBarleyOff } from "@mdi/js";

import "../styles/meals.scss";





import "../styles/pages.scss";


class myMeals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noSelection: false,
      noSuggestions: false,
      meals: null,
      week: moment().week(),
      year: moment().year(),
      today: moment(),
      firstDay: moment().startOf('week'),
      lastDay: moment().endOf('week'),
      paneOpen: false
    };

    // this.toggleMode = this.toggleMode.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.logIn = this.logIn.bind(this);
    // this.submit = this.submit.bind(this);
    this.openRecipePane = this.openRecipePane.bind(this);
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
          this.props.updateHasOptions(true);
          this.props.updateHasPreferences(true);
          this.setState({ meals: res.data.meals });
        }
      }
    })

    Modal.setAppElement(this.el);





  }

  changeWeek(date) {
    console.log(`changing week to: ${date}`); // TODO: use this event later when user wants to see previous meals
  }

  openRecipePane = meal => event => {
    console.log(meal);
    this.setState({
      paneOpen: true,
      activeRecipe: meal
    });
  }




  render() {

    const { progress, currentUser } = this.props;
    const { noSelection, noSuggestions, meals, activeRecipe } = this.state;

    if (noSelection || noSuggestions) {
      return <Redirect to="/my-options" />
    }


    let form;
    if (meals) {
      form = (
        <div>
          <div className="row">
            {meals.map((meal, i) => (
              <div key={meal.id} className="col-12" onClick={this.openRecipePane(meal)}>
                <div className="card meals-card">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={meal.image} alt="" />
                    </div>
                    <div className="col-md-8 refer-texts">
                      <h4>
                        {meal.title}
                      </h4>
                      <div>
                        <p>
                          {meal.readyInMinutes &&
                            <span title="preparation and cooking time">{meal.readyInMinutes} mins &nbsp; | &nbsp; </span>
                          }
                          {meal.servings &&
                            <span title="no. of servings"> <Icon size={.7} path={mdiAccountGroup} /> <span> {meal.servings}  &nbsp; | &nbsp;  </span></span>
                          }
                          {meal.glutenFree &&
                            <span className="gluten-free" title="*gluten-free"> <Icon size={.7} path={mdiBarleyOff} /> </span>
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="form-bottom-buttons-container">
            <div className="left-buttons">
              <Link to="/my-options">
                <button className="btn btn-link no-left-padding" href="#">Modify meal sleection</button>
              </Link>
            </div>
            <div className="right-buttons">
              <Link to="/my-groceries">
                <button className="btn btn-primary less-right-padding" href="#">Shop Ingredients &nbsp; &#9654;</button>
              </Link>
            </div>
          </div>
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

      <div className="container page-main page-meals">
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
            <div className="panel-left-sub">
              <AccountPane currentUser={currentUser}></AccountPane>
            </div>
            <div className="panel-left-sub">
              <h6>This Week</h6>
              <CalendarIndicator weekStart={this.state.firstDay} weekEnd={this.state.lastDay} today={this.state.today} changeWeek={this.changeWeek}></CalendarIndicator>
            </div>
            <div className="panel-left-sub">
              <h6>Quicklinks</h6>
              <ul className="list-unstyled">
                <li ><Link to="/my-preferences">Modify diet preferences</Link></li>
                <li ><Link to="/">Invite Friends</Link></li>
                <li ><Link to="/">Account info</Link></li>
              </ul>
            </div>
            <div className="panel-left-sub">
              <ReferPane></ReferPane>
            </div>
          </aside>
          <div className="panel-main col-xs-12 col-md-9">
            <div className="card shadow">
              <div className="card-body">
                <h2>Your Meals!</h2>
                <p>
                  Here are your selected meals for the week, click on any
                                </p>
                <br />
                {form}
              </div>
            </div>
          </div>
        </div>
        <SlidingPane
          className='recipe-pane'
          overlayClassName='recipe-pane-overlay'
          isOpen={this.state.paneOpen}
          width='800px'
          onRequestClose={() => {
            this.setState({ paneOpen: false });
          }}>

          <RecipePane recipe={activeRecipe}></RecipePane>
        </SlidingPane>
      </div>

    )
  }
}

myMeals.propTypes = {
  currentUser: propTypes.object,
  updateHasOptions: propTypes.func,
  updateHasPreferences: propTypes.func,
};

function mapStateToProps(state) {
  const { currentUser, progress } = state
  return { currentUser: currentUser, progress: progress }
}


export default connect(mapStateToProps, { updateHasOptions, updateHasPreferences })(myMeals);