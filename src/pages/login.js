import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import queryString from "query-string";

import "./login.scss";

export default class login extends Component {

  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);
    this.state = {
      isSignUpMode: values.signup,


    };
    this.toggleMode = this.toggleMode.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  }

  render() {

    let isSignUpMode = this.state.isSignUpMode;
    return (
      <div className="login-wrapper">
        {isSignUpMode ?
          (<Card style={{ width: "35rem" }} className="login-card">
            <Card.Body>
              <Card.Title>Sign Up</Card.Title>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="sFname">
                      <Form.Label>First name</Form.Label>
                      <Form.Control name="sFname" type="text" placeholder="First name" value={this.state.sFname || ''} onChange={this.handleInputChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="sLname">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control name="sLname" type="text" placeholder="Last name" value={this.state.sLname || ''} onChange={this.handleInputChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="sState">
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" placeholder="First name" value={this.state.sState || ''} onChange={this.handleInputChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="sCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control name="sCity" type="text" placeholder="Last name" value={this.state.sCity || ''} onChange={this.handleInputChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="sZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control name="sZip" type="text" placeholder="Last name" value={this.state.sZip || ''} onChange={this.handleInputChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="sEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control name="sEmail" type="email" placeholder="Enter email" value={this.state.sEmail || ''} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="sPassword1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="sPassword1" type="password" placeholder="Password" value={this.state.sPassword1 || ''} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="sPassword2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control name="sPassword2" type="password" placeholder="Confirm Password" value={this.state.sPassword2 || ''} onChange={this.handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Sign Up
            </Button>
              </Form>

              <Button variant="link" className="sl-btn" onClick={this.toggleMode}>
                Already have an account? Login here
          </Button>
              <Button variant="link" className="fp-btn">
                Forgot Password
          </Button>
            </Card.Body>
          </Card>) : (

            <Card style={{ width: "24rem" }} className="login-card">
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form>
                  <Form.Group controlId="user">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" value={this.state.user || ''} onChange={this.handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="pass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.pass || ''} onChange={this.handleInputChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit" block>
                    Login
    </Button>
                </Form>

                <Button variant="link" className="sl-btn" onClick={this.toggleMode}>
                  Sign Up
  </Button>
                <Button variant="link" className="fp-btn">
                  Forgot Password
  </Button>
              </Card.Body>
            </Card>

          )

        }




      </div>
    );
  }

  toggleMode() {
    this.setState(prevState => ({ isSignUpMode: !prevState.isSignUpMode }));
  }
}
