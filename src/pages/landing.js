import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import cookie from "react-cookies";

import "../styles/landing.scss";
import meal_1 from "../assets/img/meal_1.jpg";
import meal_2 from "../assets/img/meal_2.jpg";
import meal_3 from "../assets/img/meal_3.jpg";
import meal_4 from "../assets/img/meal_4.jpg";
import meal_1_sm from "../assets/img/meal_1_sm.jpg";
import meal_2_sm from "../assets/img/meal_2_sm.jpg";
import meal_3_sm from "../assets/img/meal_3_sm.jpg";
import meal_4_sm from "../assets/img/meal_4_sm.jpg";

class landing extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

    this.state = {
      showModal: false
    };
  }

  handleModalClose() {
    this.setState({ showModal: false });
  }

  handleModalShow() {
    this.setState({ showModal: true });
  }

  componentDidMount() {
    //show modal if its been an hour since the last modal showed up
    if (!cookie.load("cuToday")) {
      cookie.save("cuToday", "yes", { maxAge: 3600 });
      setTimeout(() => {
        this.handleModalShow();
      }, 4000);
    }
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="font-weight-bold">Meal planning made easy</h1>
          <p>
            We narrow down the right options for you and your family based from
            over 300,000 recipes.
          </p>
          <p className="lead">
            <Link to="/login">
              <button className="btn btn-primary btn-lg" href="#">
                Plan meals
              </button>
            </Link>
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
                  <img
                    className="card-img-top img-fluid"
                    src={meal_3}
                    alt="Ketogenic"
                  />
                  <div className="recommended-caption text-center">
                    <h4 className="recommended-title">Ketogenic</h4>
                    <span className="recommended-text">
                      High fat &#38; protien, low carbs
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-none d-md-block">
                <div className="card">
                  <img
                    className="card-img-top img-fluid"
                    src={meal_2}
                    alt="Pescatarian"
                  />
                  <div className="recommended-caption text-center">
                    <h4 className="recommended-title">Pescatarian</h4>
                    <span className="recommended-text">
                      Fish, Seafood &#38; Veggies
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-none d-md-block">
                <div className="card">
                  <img
                    className="card-img-top img-fluid"
                    src={meal_1}
                    alt="Vegan"
                  />
                  <div className="recommended-caption text-center">
                    <h4 className="recommended-title">Vegan</h4>
                    <span className="recommended-text">
                      No meat, dairy, eggs or hone
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-none d-md-block">
                <div className="card">
                  <img
                    className="card-img-top img-fluid"
                    src={meal_4}
                    alt="Whole 30"
                  />
                  <div className="recommended-caption text-center">
                    <h4 className="recommended-title">Whole 30&#174;</h4>
                    <span className="recommended-text">
                      Follows the program rule
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RECOMENDED FOR YOU SM BELOW*/}
          <div className="d-md-none">
            <h3>Recommended diets for you</h3>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={meal_3_sm}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Ketogenic</h3>
                  <p>High fat &#38; protien, low carbs</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={meal_2_sm}
                  alt="First slide"
                />

                <Carousel.Caption>
                  <h3>Pescatarian</h3>
                  <p>Fish, Seafood &#38; Veggies</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={meal_1_sm}
                  alt="First slide"
                />

                <Carousel.Caption>
                  <h3>Vegan</h3>
                  <p>No meat, dairy, eggs or honey</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={meal_4_sm}
                  alt="First slide"
                />

                <Carousel.Caption>
                  <h3>Whole 30&#174;</h3>
                  <p>Follows the program rule</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="container-fluid landing-notes">
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">It's Free</h6>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Personalized Menus</h6>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. Some quick example
                      text to build on the card title and make up the bulk of
                      the card's content.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Easy to Use</h6>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="container">
          <h3 className="text-center">How it works</h3>
          <br />

          <div className="row row-eq-height">
            <div className="col-xs-12 col-sm-6">
              <strong>Lorem Ipsum</strong>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>

            <div className="card col-xs-12 col-sm-6" />
          </div>
          <br />
          <div className="row row-eq-height">
            <div className="card col-xs-12 col-sm-6" />

            <div className="col-xs-12 col-sm-6">
              <strong>Lorem Ipsum</strong>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <h5>
          <Link to="/about">About This Project</Link>
        </h5>

        <br />
        <br />

        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <Modal.Body>
            <div className="landing-modal text-center">
              <h3>Thank you for checking out Cook Up!</h3>
              <br />
              This web application is currently in the prototype stage and will
              be ready soon (May 2019). Feel free to visit the 'about' section
              to learn about the technicals of this project or you may continue
              exploring the app.
              <br />
              <br />
              <Link to="/about">
                <button className="btn btn-primary-one" href="#">
                  About this Project
                </button>
              </Link>
              <button
                className="btn btn-outline-primary-one"
                onClick={this.handleModalClose}
                href="#"
              >
                Keep Exploring
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default landing;
