import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import moment from 'moment';
import foHttp from '../helpers/fohttp';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import propTypes from "prop-types";



class myMeals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noSelection: false,
      noSuggestions: false
    };

    // this.toggleMode = this.toggleMode.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.logIn = this.logIn.bind(this);
    // this.submit = this.submit.bind(this);
  }

  componentDidMount() {

    let week = moment().week();
    let year = moment().year();

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



  render() {
    const { f_name } = this.props.currentUser;
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
          <div className="text-center">
            <Button type="submit" onClick={this.submit}>Save Selection</Button>
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

      <div className="container page-main">
        <h4>Hi {f_name}!</h4>
        <h2 className="fo-text">Choose meals below</h2>
        {form}

      </div>

    )
  }
}

myMeals.propTypes = {
  currentUser: propTypes.object,
  // submit: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { currentUser } = state
  return { currentUser: currentUser }
}


export default connect(mapStateToProps, {})(myMeals);