import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import propTypes from "prop-types";

import Icon from "@mdi/react";
import { mdiNumeric1CircleOutline, mdiNumeric2CircleOutline, mdiNumeric3CircleOutline,mdiNumeric4CircleOutline } from "@mdi/js";


import "../styles/progress.scss";

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps) {

    }



    render() {
        const isAuth = this.props.isAuth;
        const {activeRoute} = this.props;

        return (
            <div className="container">
                <div className="status-row">
                    <div className={"col-3 status-col " + (activeRoute === '1' ? 'active' : '')}><div><Icon path={mdiNumeric1CircleOutline}  /></div><div className="status-name">Preferences</div></div>
                    <div className={"col-3 status-col " + (activeRoute === '2' ? 'active' : '')}><div><Icon path={mdiNumeric2CircleOutline}  /></div><div className="status-name">Meal Options</div></div>
                    <div className={"col-3 status-col " + (activeRoute === '3' ? 'active' : '')}><div><Icon path={mdiNumeric3CircleOutline}  /></div><div className="status-name">Chosen Meals</div></div>
                    <div className={"col-3 status-col " + (activeRoute === '4' ? 'active' : '')}><div><Icon path={mdiNumeric4CircleOutline}  /></div><div className="status-name">Order Ingredients</div></div>
                </div>
            </div>
        );
    }
}

ProgressBar.propTypes = {
    isAuth: propTypes.bool
};

function mapStateToProps(state) {
    const { currentUser } = state;
    return { isAuth: currentUser.isAuth };
}

export default withRouter(
    connect(
        mapStateToProps
    )(ProgressBar)
);
