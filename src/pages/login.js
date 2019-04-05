import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

import "./login.scss";

import * as firebase from "firebase";

const auth = firebase.auth();

export default class login extends Component {
  constructor(props) {
    super(props);
    const queries = queryString.parse(this.props.location.search);
    this.state = {
      isSignUpMode: queries.signup
    };

    // auth.onAuthStateChanged(firebaseUser => {
    //   console.log("login " + JSON.stringify(firebaseUser));
    //   if (firebaseUser) {
    //     this.setState({
    //       isAuth: true
    //     });
    //   } else {
    //     this.setState({
    //       isAuth: false
    //     });
    //   }
    // });

    this.toggleMode = this.toggleMode.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() { }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  }

  toggleMode() {
    this.setState(prevState => ({ isSignUpMode: !prevState.isSignUpMode }));
  }

  logIn(e) {
    e.preventDefault();

    const email = this.state.user;
    const password = this.state.pass;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({
          isAuth: true
        });
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({
          isAuth: false
        });
        // ...
      });
  }

  signUp(e) {
    e.preventDefault();
    const email = this.state.sEmail;
    const password = this.state.sPassword1;

    const promise = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password).then(data => {


        const uid = data.user.uid;

        //TODO: save user's name, uid, and other credentials to DB

        if (data.additionalUserInfo.isNewUser) {
          //new user
          //TODO: Show a welcome message for 3 seconds
          //send user to preference page
        }

      })
      .catch((error) => {
        // Handle Errors here.
        //TODO: Show the error to the user why sign up failed

      });

    promise.catch(e => console.log(e));
  }

  componentWillUnmount() {
    console.log("will unmount");
    auth.onAuthStateChanged(firebaseUser => { });
  }

  render() {
    if (this.state.isAuth === true) {
      return <Redirect to="/myMeals" />;
    }

    let isSignUpMode = this.state.isSignUpMode;
    return (
      <div className="login-wrapper">
        {isSignUpMode ? (
          <Card style={{ width: "35rem" }} className="login-card">
            <Card.Body>
              <Card.Title>Sign Up</Card.Title>
              <Form onSubmit={this.signUp}>
                <Row>
                  <Col>
                    <Form.Group controlId="sFname">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        name="sFname"
                        type="text"
                        placeholder="First name"
                        value={this.state.sFname || ""}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="sLname">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        name="sLname"
                        type="text"
                        placeholder="Last name"
                        value={this.state.sLname || ""}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="sCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        placeholder="Select Country"
                        value={this.state.sState || ""}
                        onChange={this.handleInputChange}
                      >
                        <option>Australia</option>
                        <option>United States</option>
                        <option>Others</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="sState">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        value={this.state.sState || ""}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="sCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="sCity"
                        type="text"
                        placeholder="Last name"
                        value={this.state.sCity || ""}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="sZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        name="sZip"
                        type="text"
                        placeholder="Last name"
                        value={this.state.sZip || ""}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="sEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="sEmail"
                    type="email"
                    placeholder="Enter email"
                    value={this.state.sEmail || ""}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="sPassword1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="sPassword1"
                    type="password"
                    placeholder="Password"
                    value={this.state.sPassword1 || ""}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="sPassword2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="sPassword2"
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.sPassword2 || ""}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Sign Up
                </Button>
              </Form>

              <Button
                variant="link"
                className="sl-btn"
                onClick={this.toggleMode}
              >
                Already have an account? Login here
              </Button>
              <Button variant="link" className="fp-btn">
                Forgot Password
              </Button>
            </Card.Body>
          </Card>
        ) : (
            <Card style={{ width: "24rem" }} className="login-card">
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form onSubmit={this.logIn}>
                  <Form.Group controlId="user">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={this.state.user || ""}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="pass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={this.state.pass || ""}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" block>
                    Login
                </Button>
                </Form>

                <Button
                  variant="link"
                  className="sl-btn"
                  onClick={this.toggleMode}
                >
                  Sign Up
              </Button>
                <Button variant="link" className="fp-btn">
                  Forgot Password
              </Button>
              </Card.Body>
            </Card>
          )}
      </div>
    );
  }
}
