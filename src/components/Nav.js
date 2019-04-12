import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import { logOut } from '../actions/authActions';
import propTypes from "prop-types";


// Initialize Firebase

const auth = firebase.auth();

class NavFo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isAuth && prevProps.isAuth) {
      this.props.history.push("/");
    }
  }

  logout() {
    this.props.logOut();
  }

  render() {
    const isAuth = this.props.isAuth;

    let rightGroupLinks;

    if (isAuth) {
      rightGroupLinks = (
        <Nav>
          <Nav.Link href="/mymeals">My Meals</Nav.Link>
          <Nav.Link onClick={this.logout}>Logout</Nav.Link>
        </Nav>
      );
    } else {
      rightGroupLinks = (
        <Nav>
          <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login?signup=1">
          <Nav.Link>Sign up</Nav.Link>
          </LinkContainer>
        </Nav>
      );
    }

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/">Flour and Oil</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="#pricing">How it works</Nav.Link>
          </Nav>
          {rightGroupLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavFo.propTypes = {
  logOut: propTypes.func.isRequired,
  isAuth: propTypes.bool,
};

function mapStateToProps(state) {
  const { auth } = state
  return { isAuth: auth.isAuth }
}

export default withRouter(connect(mapStateToProps, { logOut })(NavFo));

