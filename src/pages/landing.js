import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "../styles/landing.scss";

export default function landing() {
  return (
    <div>
      <Jumbotron>
        <h1>Plan your meals!</h1>
        <p>Get inspired from over a million of recipes</p>
        <p>
          <Button className="btn-lg" variant="primary">Plan your Meal</Button>
        </p>
      </Jumbotron>
      <h5>
        <Link to="/about">About This Project</Link>
      </h5>
    </div>
  );
}
