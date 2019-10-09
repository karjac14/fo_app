import React, { memo } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Quicklinks = (props) => {

    return (
        <div>
            {props.parent &&
                <div className="panel-left-sub">
                    <h6>Quicklinks</h6>
                    <ul className="list-unstyled">
                        <li ><Link to="/">Invite Friends</Link></li>
                        <li ><Link to="/">Account info</Link></li>
                    </ul>
                </div>
            }
        </div>
    );
}

Quicklinks.propTypes = {
    parent: PropTypes.string
};


export default memo(Quicklinks);

