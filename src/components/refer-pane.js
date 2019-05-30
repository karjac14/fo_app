
import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import refer from "../assets/img/refer.jpg";

function ReferPane(props) {


    return (
        <div className="refer-pane">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col">
                        <img src={refer} alt="" />
                    </div>
                    <div className="col refer-texts">
                        <h6 className="card-title">Refer a friend</h6>
                        <p className="card-text">Share the love, share Cook Up to your friends!</p>
                        <Link to="/">
                            <button className="btn btn-primary btn-sm">
                                Invite Friends
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferPane;
