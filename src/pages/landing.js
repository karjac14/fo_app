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
  return (
    <div>
      <div className="jumbotron text-center">
        <h1 className="font-weight-bold">Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className="lead">
          <button className="btn btn-primary btn-lg" href="#" role="button">
            Learn more
          </button>
        </p>
      </div>

      {/* TODO some cards here of different diets */}
      <div className="container">
        <h3>Recommended for you</h3>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3">
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
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="card">
            <img className="card-img-top img-fluid" src={meal_2} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
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
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
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
          </div>
        </div>

        <br/>
        <h3>Your heath matters</h3>

        <br/>
        <br/>

        <h3 className="text-center">How it works</h3>
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

          <div className="col-xs-12 col-sm-6" />
        </div>
        <div className="row row-eq-height">
          <div className="col-xs-12 col-sm-6" />

          <div className="col-xs-12 col-sm-6" />
          <strong>Incididunt ut labore</strong>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>
        </div>

        <br/>
        <br/>
        <h5>
          <Link to="/about">About This Project</Link>
        </h5>

        <br/>
        <br/>
        
      </div>
      <div class="container-fluid landing-footer">
          
        </div>
    </div>
  );
}
