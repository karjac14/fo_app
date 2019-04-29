import React, { Component } from 'react'
import * as firebase from "firebase";

const functions = firebase.functions();

export default class myMeals extends Component {

  componentDidMount() {
    const recipes = functions.httpsCallable('recipes/');
    const test1 = functions.httpsCallable('test1');

    // recipes().then(data => {
    //   console.log(data);
    // });

    test1().then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <h6>My Meals</h6>
      </div>
    )
  }
}