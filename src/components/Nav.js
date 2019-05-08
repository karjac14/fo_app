import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import { logOut } from '../actions/currentUserActions';
import propTypes from "prop-types";

import logo from '../assets/img/brand_logo.png';
import "../styles/navbar.scss";




class NavFo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isAuth && prevProps.isAuth) {
      console.log("hey");
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
          <LinkContainer to="/my-meals">
          <Nav.Link>My Meals</Nav.Link>
          </LinkContainer>
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
        <LinkContainer to="/">
        <Navbar.Brand><img
        src={logo}
        height="40"
        className="d-inline-block align-top"
        alt="Cook Up"
      /></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <Nav.Link href="#pricing">How it works</Nav.Link> */}
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
  const { currentUser } = state
  return { isAuth: currentUser.isAuth }
}

export default withRouter(connect(mapStateToProps, { logOut })(NavFo));

