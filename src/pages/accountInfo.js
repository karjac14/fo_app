import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import AccountPane from "../components/account-pane";
import ReferPane from "../components/refer-pane";
import "../styles/login.scss";
import { connect } from 'react-redux';
import { logOut } from '../actions/currentUserActions';



class accountInfo extends Component {

    render() {

        const { currentUser } = this.props;

        return (
            <div className="container page-main">
                <div className="row">
                    <aside className="panel-left d-none d-md-block col-md-3">
                        <div>
                        </div>
                    </aside>
                    <div className="panel-main col-xs-12 col-md-9">
                    </div>
                </div>
                <div className="row">
                    <aside className="panel-left d-none d-md-block col-md-3">
                        <div className="panel-left-sub">
                            <AccountPane currentUser={currentUser}></AccountPane>
                        </div>
                        <div className="panel-left-sub">
                            <h6>Quicklinks</h6>
                            <ul className="list-unstyled">
                                <li ><Link to="/my-preferences">Diet preferences</Link></li>
                                <li ><Link to="/my-options">Choose recipes</Link></li>
                                <li ><Link to="/my-meals">View meals</Link></li>
                                <li ><Link to="/">Invite Friends</Link></li>
                            </ul>
                        </div>
                        <div className="panel-left-sub">
                            <ReferPane></ReferPane>
                        </div>
                    </aside>
                    <div className="panel-main col-xs-12 col-md-9">
                        <div className="card shadow">
                            <div className="card-body">
                                <h3>Account Information</h3>
                                <br />
                                <br />
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">First name</th>
                                            <td>{currentUser.f_name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Last name</th>
                                            <td>{currentUser.l_name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Country</th>
                                            <td>{currentUser.country}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">State</th>
                                            <td>{currentUser.state}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">City</th>
                                            <td>{currentUser.city}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Zip</th>
                                            <td>{currentUser.zip}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td>{currentUser.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

accountInfo.propTypes = {
    isAuth: propTypes.bool,
    currentUser: propTypes.object
};

function mapStateToProps(state) {
    const { currentUser } = state
    return { currentUser }
}

export default connect(mapStateToProps, { logOut })(accountInfo);