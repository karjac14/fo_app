import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { logOut } from "../actions/currentUserActions";
import propTypes from "prop-types";

import Icon from "@mdi/react";
import { mdiChefHat } from "@mdi/js";

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
          <NavDropdown title="Account" alignRight>
            <LinkContainer to="/my-preferences">
              <NavDropdown.Item>Preferences</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/my-options">
              <NavDropdown.Item>Suggestions</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/my-meals">
              <NavDropdown.Item>My Meals</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
          </NavDropdown>
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
