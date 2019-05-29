
import React from 'react';
// import PropTypes from "prop-types";
// import Icon from "@mdi/react";
// import { mdiNumeric1CircleOutline, mdiNumeric2CircleOutline, mdiNumeric3CircleOutline, mdiNumeric4CircleOutline, mdiCheckboxMarkedCircle } from "@mdi/js";
import "../styles/calendar-indicator.scss";
import moment from 'moment';

// This calendar component is inspired from an amazing sample code in https://codepen.io/RobVermeer/pen/zBgdwg
// Heavy Modifications were done to fit use cases for Cook up


const Heading = ({ date, changeMonth, resetDate }) => (
    <nav className="calendar--nav text-center">
        <small>{date.format("MMMM")} {date.format("YYYY")}</small>
    </nav>
);

const Day = ({ currentDate, date, startDate, endDate, onClick }) => {
    let className = [];

    if (moment().isSame(date, "day")) {
        className.push("active");
    }

    if (date.isSame(startDate, "day")) {
        className.push("start");
    }

    if (date.isBetween(startDate, endDate, "day")) {
        className.push("between");
    }

    if (date.isSame(endDate, "day")) {
        className.push("end");
    }

    if (!date.isSame(currentDate, "month")) {
        className.push("muted");
    }

    return (
        <span
            onClick={() => onClick(date)}
            currentdate={date}
            className={className.join(" ")}
        >
            {date.date()}
        </span>
    );
};

const Days = ({ date, startDate, endDate, onClick }) => {
    const thisDate = moment(date);
    const daysInMonth = moment(date).daysInMonth();
    const firstDayDate = moment(date).startOf("month");
    const previousMonth = moment(date).subtract(1, "month");
    const previousMonthDays = previousMonth.daysInMonth();
    const nextsMonth = moment(date).add(1, "month");
    let days = [];
    let labels = [];

    for (let i = 1; i <= 7; i++) {
        labels.push(
            <span key={i} className="label">
                {moment()
                    .day(i)
                    .format("dd")}
            </span>
        );
    }

    for (let i = firstDayDate.day(); i > 1; i--) {
        previousMonth.date(previousMonthDays - i + 2);

        days.push(
            <Day
                key={moment(previousMonth).format("DD MM YYYY")}
                onClick={date => onClick(date)}
                currentDate={date}
                date={moment(previousMonth)}
                startDate={startDate}
                endDate={endDate}
            />
        );
    }

    for (let i = 1; i <= daysInMonth; i++) {
        thisDate.date(i);

        days.push(
            <Day
                key={moment(thisDate).format("DD MM YYYY")}
                onClick={date => onClick(date)}
                currentDate={date}
                date={moment(thisDate)}
                startDate={startDate}
                endDate={endDate}
            />
        );
    }

    const daysCount = days.length;
    for (let i = 1; i <= 42 - daysCount; i++) {
        nextsMonth.date(i);
        days.push(
            <Day
                key={moment(nextsMonth).format("DD MM YYYY")}
                onClick={date => onClick(date)}
                currentDate={date}
                date={moment(nextsMonth)}
                startDate={startDate}
                endDate={endDate}
            />
        );
    }

    return (
        <nav className="calendar--days">
            {labels.concat()}
            {days.concat()}
        </nav>
    );
};









function CalendarIndicator(props) {

    const { weekStart, weekEnd, today, changeWeek } = props;
    return (
        <div className="calendar">
            <Heading date={today} />
            <Days
                onClick={date => changeWeek(date)}
                date={today}
                startDate={weekStart}
                endDate={weekEnd}
            />
        </div>
    );
}

// CalendarIndicator.propTypes = {
//     activeRoute: PropTypes.string,
//     progress: PropTypes.string
// };

// CalendarIndicator.defaultProps = {
//     activeRoute: "1",
//     progress: {
//         hasPreferences: true
//     }
// };

export default CalendarIndicator;

