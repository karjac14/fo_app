
import React from 'react';
import Icon from "@mdi/react";
import { mdiNumeric1CircleOutline, mdiNumeric2CircleOutline, mdiNumeric3CircleOutline, mdiNumeric4CircleOutline, mdiCheckboxMarkedCircle } from "@mdi/js";
import "../styles/progress.scss";

function ProgressBar(props) {
    const { activeRoute, progress } = props;

    return (
        <div className="container">
            <div className="status-row">
                <div className={"col-3 status-col " + (activeRoute === '1' ? 'active' : '')}><div><Icon path={progress.hasPreferences ? mdiCheckboxMarkedCircle : mdiNumeric1CircleOutline} /></div><div className="status-name">Preferences</div></div>
                <div className={"col-3 status-col " + (activeRoute === '2' ? 'active' : '')}><div><Icon path={progress.hasChosen ? mdiCheckboxMarkedCircle : mdiNumeric2CircleOutline} /></div><div className="status-name">Meal Options</div></div>
                <div className={"col-3 status-col " + (activeRoute === '3' ? 'active' : '')}><div><Icon path={mdiNumeric3CircleOutline} /></div><div className="status-name">Chosen Meals</div></div>
                <div className={"col-3 status-col " + (activeRoute === '4' ? 'active' : '')}><div><Icon path={mdiNumeric4CircleOutline} /></div><div className="status-name">Order Ingredients</div></div>
            </div>
        </div>
    );
}

export default ProgressBar;

