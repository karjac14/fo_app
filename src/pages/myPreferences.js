import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from "prop-types";

class myPreferences extends Component {
  render() {
    const {f_name, uid} = this.props.currentUser;
    return (
      <div>
        {f_name}
      <h6>My Preferences</h6>
    </div>
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

export default connect(mapStateToProps, {})(myPreferences);

