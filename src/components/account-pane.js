import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AccountPane(props) {

    const { f_name } = props.currentUser;

    return (
        <div className="panel-left-sub">
            <div className="account-pane center-text">
                <h4>Hey {f_name}!</h4>
                <Link to="/account">Account Info</Link>
            </div>
        </div >
    );
}

AccountPane.propTypes = {
    currentUser: PropTypes.object.isRequired
};

AccountPane.defaultProps = {
    currentUser: {
        f_name: "Guest"
    }
};

export default AccountPane;

