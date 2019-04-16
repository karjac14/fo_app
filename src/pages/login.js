import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import propTypes from "prop-types";

import "../styles/login.scss";

import { connect } from 'react-redux';
import { logIn, signUp } from '../actions/currentUserActions';



class login extends Component {
  constructor(props) {
    super(props);
    const queries = queryString.parse(this.props.location.search);
    this.state = {
      isSignUpMode: queries.signup,
      validated: false
    };

    this.toggleMode = this.toggleMode.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const queries = queryString.parse(this.props.location.search);
      if (queries.signup) {
        this.setState({ isSignUpMode: true });
      } else {
        this.setState({ isSignUpMode: false });
      }
    }
  }

  componentDidMount() { }


  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.id;
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
    this.props.logIn(email, password);

    //TODO: Handle errors (like user already exist)
  }

  signUp(e) {

    e.preventDefault();

    const form = e.currentTarget;
    this.setState({ validated: false });
    if (form.checkValidity() === false) {
      this.setState({ validated: true });
    }

    if (this.state.password !== this.state.password2) {
      this.setState({ errorPassword: true });
      return;
    } else {
      this.setState({ errorPassword: false });
    }

    const pick = (obj, ...args) => ({
      ...args.reduce((res, key) => ({ ...res, [key]: obj[key] }), {})
    })

    let newUser = pick(this.state, 'f_name', 'l_name', 'email', 'password', 'country', 'state', 'city', 'zip');

    this.props.signUp(newUser);
  } ß

  render() {

    if (this.props.isAuth === true) {
      return <Redirect to="/my-meals" />;
    }

    const { isSignUpMode, validated, errorPassword } = this.state;

    let form;

    if (isSignUpMode) {
      form = (
        <Card style={{ width: "35rem" }} className="login-card">
          <Card.Body>
            <Card.Title>Sign Up</Card.Title>
            <Form noValidate
              validated={validated} onSubmit={this.signUp}>
              <Row>
                <Col>
                  <Form.Group controlId="f_name">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      value={this.state.f_name || ""}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="l_name">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      value={this.state.l_name || ""}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Select Country"
                      value={this.state.country || ""}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option>Australia</option>
                      <option>United States</option>
                      <option>Others</option>

                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={this.state.state || ""}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="sCity"
                      type="text"
                      placeholder=""
                      value={this.state.city || ""}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="zip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={this.state.zip || ""}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email || ""}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.password || ""}
                  onChange={this.handleInputChange}
                  minLength="6"
                  isInvalid={errorPassword}
                  required
                />
                {errorPassword ?
                  <small id="" className="text-danger">
                    Password does not match</small>
                  : ''}
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.password2 || ""}
                  onChange={this.handleInputChange}
                  isInvalid={errorPassword}
                  minLength="6"
                  required
                />
                {errorPassword ?
                  <small id="" className="text-danger">
                    Password does not match</small>
                  : ''}
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Sign Up
                </Button>
            </Form>
            <div className="button-container">
              <span>Already have an account?</span>
              <Button
                variant="link"
                className="sl-btn"
                onClick={this.toggleMode}
              >
                Login here
              </Button>
            </div>

          </Card.Body>
        </Card>
      );
    } else {
      form = (
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
            <div className="button-container">
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
            </div>
          </Card.Body>
        </Card>
      );
    }

    return (
      <div className="login-wrapper">
        {form}
      </div>
    );
  }
}

login.propTypes = {
  logIn: propTypes.func.isRequired,
  signUp: propTypes.func.isRequired,
  location: propTypes.object,
  isAuth: propTypes.bool,
  user: propTypes.object,
};

function mapStateToProps(state) {

  const { currentUser } = state
  return { isAuth: currentUser.isAuth }
}

export default connect(mapStateToProps, { logIn, signUp })(login);