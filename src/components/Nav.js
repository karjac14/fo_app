import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
import { LinkContainer } from "react-router-bootstrap";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD3kLueJdPx0Ckt2lCpm8MmGjauWzE8cs8",
  authDomain: "fo-db-e5cab.firebaseapp.com",
  databaseURL: "https://fo-db-e5cab.firebaseio.com",
  projectId: "fo-db-e5cab",
  storageBucket: "fo-db-e5cab.appspot.com",
  messagingSenderId: "763871220167"
};
firebase.initializeApp(config);
const auth = firebase.auth();

class NavFo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: true
    };

    this.logout = this.logout.bind(this);

    //TODO: move this auth method later on a better location, something that initilized first in the entire app
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({
          isAuth: true
        });
      } else {
        this.setState({
          isAuth: false
        });
      }
    });
  }

  logout() {
    auth.signOut();
    this.props.history.push("/");
  }

  render() {
    const isAuth = this.state.isAuth;

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

export default withRouter(NavFo);
