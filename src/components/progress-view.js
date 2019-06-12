
import React from 'react';
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiNumeric1CircleOutline, mdiNumeric2CircleOutline, mdiNumeric3CircleOutline, mdiNumeric4CircleOutline, mdiCheckboxMarkedCircle } from "@mdi/js";
import "../styles/progress.scss";

function ProgressBar(props) {
    const { activeRoute, progress } = props;

    return (
        <div className="container">
            <div className="status-row">
                <div className={"col-3 status-col " + (activeRoute === '1' ? 'active' : '')}><div><Icon path={progress.hasPreferences ? mdiCheckboxMarkedCircle : mdiNumeric1CircleOutline} /></div><div className="status-name">Set Diet Preferences</div></div>
                <div className={"col-3 status-col " + (activeRoute === '2' ? 'active' : '')}><div><Icon path={progress.hasChosen ? mdiCheckboxMarkedCircle : mdiNumeric2CircleOutline} /></div><div className="status-name">Choose Meals</div></div>
                <div className={"col-3 status-col " + (activeRoute === '3' ? 'active' : '')}><div><Icon path={progress.hasChosen ? mdiCheckboxMarkedCircle : mdiNumeric3CircleOutline} /></div><div className="status-name">Open Meals</div></div>
                <div className={"col-3 status-col " + (activeRoute === '4' ? 'active' : '')}><div><Icon path={mdiNumeric4CircleOutline} /></div><div className="status-name">Order Ingredients</div></div>
            </div>
        </div>
    );
}

ProgressBar.propTypes = {
    activeRoute: PropTypes.string,
    progress: PropTypes.object
};

ProgressBar.defaultProps = {
    activeRoute: "1"
};

export default ProgressBar;

