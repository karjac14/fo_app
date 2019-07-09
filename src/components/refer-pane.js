import React from 'react';
import { Link } from "react-router-dom";
import refer from "../assets/img/refer.jpg";

function ReferPane() {


    return (
        <div className="refer-pane">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col">
                        <img src={refer} alt="" />
                    </div>
                    <div className="col refer-texts">
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

