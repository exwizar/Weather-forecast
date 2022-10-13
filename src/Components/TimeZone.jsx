import React from 'react'

const TimeZone = (data) => {
    for(let key in data) {
        const timezone = data[key].timezone;
        const dt = data[key].dt;
        const dateTime = new Date(dt * 1000);
        const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
        const currentLocalTime = toUtc + 1000 * timezone;
        const selectedDate = new Date(currentLocalTime);
    
        const date = selectedDate.toLocaleString("ru-RU", {
            day: "numeric",
            weekday: "long",
            month: "long",
        });
        const year = selectedDate.toLocaleString("ru-RU", {
            year: "numeric",
        });
        const hour = selectedDate.toLocaleString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    
            return (
                <p>
                    {date.charAt(0).toUpperCase() + date.slice(1)} {year}, {hour}
                </p>
            )
    }
}

export default TimeZone