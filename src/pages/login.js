import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import queryString from "query-string";

import "./login.scss";

export default class login extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    console.log(values.signup);
  }

  render() {
    return (
      <div className="login-wrapper">
        <Card style={{ width: "24rem" }} className="login-card">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Login
              </Button>
            </Form>

            <Button variant="link" className="sl-btn">
              Sign Up
            </Button>
            <Button variant="link" className="fp-btn">
              Forgot Password
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "35rem" }} className="login-card">
          <Card.Body>
            <Card.Title>Sign Up</Card.Title>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First name" />
                    <Form.Text className="text-muted" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="First name" />
                    <Form.Text className="text-muted" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Last name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Last name" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Sign Up
              </Button>
            </Form>

            <Button variant="link" className="sl-btn">
              Already have an account? Login here
            </Button>
            <Button variant="link" className="fp-btn">
              Forgot Password
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
