import React, { Component } from 'react'
import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';

const functions = firebase.functions();

export default class myMeals extends Component {

  componentDidMount() {
    const recipes = functions.httpsCallable('recipes/');

    recipes().then(data => {
      console.log("success");
      console.log(data);
    }).catch(error => {
      console.log(error);
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