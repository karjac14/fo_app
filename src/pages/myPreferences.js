import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import propTypes from "prop-types";

class myPreferences extends Component {

  constructor(props) {
    super(props);
    this.state = {
      diet: "balanced"
    };

    // this.toggleMode = this.toggleMode.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.logIn = this.logIn.bind(this);
    // this.signUp = this.signUp.bind(this);
  }


  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { f_name, uid } = this.props.currentUser;
    return (
      <div>
        <h4>Hi {f_name}!</h4>
        <h6>My Preferences</h6>

        <Form>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Diet
              </Form.Label>
              <Col sm={10}>
                {dietFilters.options.map(option => (
                  <div key={option.value}>
                    <Form.Check
                      custom
                      inline
                      name="diet"
                      value={option.value}
                      label={option.label}
                      type={dietFilters.type}
                      id={`diet-${option.value}`}
                      checked={this.state.diet === option.value}
                      onChange={this.handleInputChange} />
                    <br />
                    <small>{option.definition}</small>
                  </div>
                ))}
              </Col>
            </Form.Group>
          </fieldset>


          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Save Preferences</Button>
            </Col>
          </Form.Group>
        </Form>;


      </div >
    )
  }
}

myPreferences.propTypes = {
  currentUser: propTypes.object,
};

function mapStateToProps(state) {
  const { currentUser } = state
  return { currentUser: currentUser }
}

let dietFilters = {
  type: "radio",
  options: [{
    label: "Balanced",
    value: "balanced",
    definition: "Protein/Fat/Carb values in 15/35/50 ratio",
    selected: false
  }, {
    label: "Low-fat",
    value: "low-fat",
    definition: "Less than 15% of total calories from fat",
    selected: false
  }, {
    label: "Low-carbs",
    value: "low-carb",
    definition: "Less than 20% of total calories from carbs",
    selected: false
  }, {
    label: "High-protein",
    value: "high-protien",
    definition: "More than 50% of total calories from proteins",
    selected: false
  }, {
    label: "Keto",
    value: "keto",
    subtext: 'new!',
    definition: "Less than 5 grams of carbs per serving",
    selected: false
  }]
};

export default connect(mapStateToProps, {})(myPreferences);

