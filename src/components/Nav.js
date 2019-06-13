import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { logOut } from "../actions/currentUserActions";
import propTypes from "prop-types";

import Icon from '@mdi/react';
import { mdiChefHat, mdiAccountCircleOutline, } from "@mdi/js";

import "../styles/navbar.scss";

class NavFo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isAuth = this.props.isAuth;

    let rightGroupLinks;

    if (isAuth) {
      rightGroupLinks = (
        <Nav>
          <NavDropdown title={<Icon size={1.5} color="888" className="dropdown-icon" path={mdiAccountCircleOutline} />} alignRight>
            <LinkContainer to="/account">
              <NavDropdown.Item>Account Info</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/logout">
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav >
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
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
        <LinkContainer to="/">
          <Navbar.Brand><Icon className="logo-icon" path={mdiChefHat} />
            Cook Up</Navbar.Brand>
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
  isAuth: propTypes.bool
};

function mapStateToProps(state) {
  const { currentUser } = state;
  return { isAuth: currentUser.isAuth };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logOut }
  )(NavFo)
);
