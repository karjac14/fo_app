
import React from 'react';
import moment from 'moment';
import propTypes from "prop-types";
import "../styles/calendar-indicator.scss";

// This calendar component is inspired by an amazing sample code in https://codepen.io/RobVermeer/pen/zBgdwg
// Heavy Modifications were done to fit use cases for Cook up

const Heading = ({ date, endDate }) => (
    <nav className="text-center">
        {date.format("MMMM")} {date.format("MMMM") !== endDate.format("MMMM") ? " - " + endDate.format("MMMM") : ""}
    </nav>
);

const Week = ({ startDate, current, onClick }) => {
    let className = [];
    let days = [];
    let _startDate = startDate.clone();

    if (current) {
        className.push("active-week");
    }

    for (let i = 0; i < 7; i++) {
        days.push(
            <span
                key={_startDate.date()}
                onClick={() => onClick(_startDate.week())}
                week={_startDate.week()}
                className={className.join(" ")}
            >
                {_startDate.clone().date()}
            </span>
        )
        _startDate.add(1, 'days')
    }
    return (
        <div className={"week-container " + (current ? "active-week-container" : "inactive-week-container")}>
            {days.concat()}
        </div >
    );
};

const Weeks = ({ startDate, onClick }) => {

    let weeks = [];
    let labels = [];

    for (let i = 1; i <= 7; i++) {
        labels.push(
            <span key={i} className="label">
                {moment().day(i).format("dd")}
            </span>
        );
    }

    for (let i = 2; i >= 0; i--) {
        weeks.push(
            <Week
                key={moment().subtract(i, "weeks").date()}
                onClick={date => onClick(date)}
                startDate={startDate.clone().subtract(i, "weeks")}
                current={i === 0 ? true : false}
            />
        );
    }

    return (
        <nav className="calendar--days">
            {labels.concat()}
            <div className="days-container">{weeks.concat()}</div>
        </nav>
    );
};

function CalendarIndicator(props) {

    const { weekStart, weekEnd, today, changeWeek } = props;
    return (
        <div className="calendar">
            <Heading date={today} endDate={weekEnd} />
            <Weeks
                onClick={date => changeWeek(date)}
                startDate={weekStart}
            />
        </div>
    );
}

CalendarIndicator.propTypes = {
    weekStart: propTypes.object.isRequired,
    weekEnd: propTypes.object.isRequired,
};

CalendarIndicator.defaultProps = {
    today: moment()
};

export default CalendarIndicator;

