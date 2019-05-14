import React, { Component } from 'react'
import { Redirect } from "react-router-dom";




export default class myMeals extends Component {

  componentDidMount() {


    // axios.get(fcUrl + "recipes", {
    //   params: {
    //     uid: 123
    //   }
    // }).then(res => {

    // }).catch(err => {

    // });


  }

  render() {

    if (1 == 1) {
      // TODO: if no choices this week redirect user to choose page
      return <Redirect to="/my-options" />
    } else if (1 == 1) {
      // TODO: if no preferereces this week redirect user to preferences page
      return <Redirect to="/my-preferences" />
    }


    return (
      <div>
        <h6>My Meals</h6>
      </div>
    )
  }
}