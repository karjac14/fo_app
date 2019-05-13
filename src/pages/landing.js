import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "../styles/landing.scss";
import meal_1 from '../assets/img/meal_1.jpg';
import meal_2 from '../assets/img/meal_2.jpg';
import meal_3 from '../assets/img/meal_3.jpg';
import meal_4 from '../assets/img/meal_4.jpg';

export default function landing() {

  var divStyle1 = {"float":"left", "marginLeft": "0px", width: '300px'};
  var divStyle2 = {"float":"left", "marginLeft": "15px", width: '300px' };
  var divStyle3 = {"float":"left", "marginLeft": "15px", width: '300px' };
  var divStyle4 = {"float":"left", "marginLeft": "15px", width: '300px' };

  return (
    <div>
      <div className="jumbotron text-center">
        <h1 className="font-weight-bold">Meal Planning?</h1>
        <p>
          We narrow down the right options for you and your family based from over 300,000 recipes.
        </p>
        <p className="lead">
          <button className="btn btn-primary btn-lg" href="#" role="button">
            Plan meals
          </button>
        </p>
      </div>

      {/* TODO some cards here of different diets */}
      <div className="container">

        {/* RECOMMENDED FOR YOU MD UP*/}
        <div className="d-none d-md-block">
        <h3>Recommended diets for you</h3>
        <div className="row">
          <div className="col-md-3 d-none d-md-block">
          <div className="card">
            <img className="card-img-top img-fluid" src={meal_3} alt="Ketogenic" />
            <div className="recommended-caption text-center">
              <h4 className="recommended-title">Ketogenic</h4>
              <span className="recommended-text">High fat &#38; protien, low carbs</span>
              </div>
            </div>
            
          </div>
          <div className="col-md-3 d-none d-md-block">
            <div className="card">
              <img className="card-img-top img-fluid" src={meal_2} alt="Pescatarian" />
              <div className="recommended-caption text-center">
              <h4 className="recommended-title">Pescatarian</h4>
              <span className="recommended-text">Fish &#38; Veggies</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-none d-md-block">
          <div className="card">
              <img className="card-img-top img-fluid" src={meal_1} alt="Card image cap"/>
              <div className="recommended-caption text-center">
              <h4 className="recommended-title">Vegan</h4>
              <span className="recommended-text">Fish &#38; Veggies</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-none d-md-block">
          <div className="card">
            <img className="card-img-top img-fluid" src={meal_4} alt="Whole 30" />
            <div className="recommended-caption text-center">
              <h4 className="recommended-title">Whole 30&#174;</h4>
              <span className="recommended-text">Follows the program rule</span>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* RECOMENDED FOR YOU SM BELOW*/}
        <div className="d-md-none">
        <h3>Recommended for you small</h3>
        <div className="sm-card-container">
          <div className="sm-card-container-scollable">
          <span className="sm-card-landing" style={divStyle1}>
          <div className="card">
            <img
              className="card-img-top img-fluid" src={meal_1} alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            </div>
          </span>
          <span className="sm-card-landing" style={divStyle2}>
          <div className="card">
            <img className="card-img-top img-fluid" src={meal_2} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content. Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            </div>
          </span>
          <span className="sm-card-landing" style={divStyle3}>
          <div className="card">
            <img className="card-img-top img-fluid" src={meal_3} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            </div>
          </span>
          <span className="sm-card-landing" style={divStyle4}>
          <div className="card">
            <img className="card-img-top img-fluid" src={meal_4} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            </div>
          </span>
        </div>
        </div>
        </div>

        <br/>
        <br/>
        <br/>



        <div className="row row-eq-height">
          <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">It's Free</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Personalized Menus</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content. Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Easy to Use</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            </div>
          </div>
        </div>




        <br/>
        <br/>

        <h3 className="text-center">How it works</h3>
        <br/>

        <div className="row row-eq-height">
          <div className="col-xs-12 col-sm-6">
            <strong>Lorem Ipsum</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="card col-xs-12 col-sm-6">

          </div>


        </div>
        <br/>
        <div className="row row-eq-height">
          <div className="card col-xs-12 col-sm-6">

          </div>

          <div className="col-xs-12 col-sm-6">
            <strong>Lorem Ipsum</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <br/>
        <br/>
        <h5>
          <Link to="/about">About This Project</Link>
        </h5>

        <br/>
        <br/>
        
      </div>
      <div className="container-fluid landing-footer text-center">
        <span className="align-middle">&#xa9; Cook Up, 2019</span>
      </div>
    </div>
  );
}
