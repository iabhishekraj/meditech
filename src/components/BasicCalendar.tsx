import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

function BasicCalendar() {
  const [events, setEvents] = useState([
    {
      title: "Appointment - Abhishek Raj",
      start: new Date(2024, 7, 20, 10, 0), // August 20, 2024, 10:00 AM
      end: new Date(2024, 7, 20, 12, 0), // August 20, 2024, 12:00 PM
    },
    {
      title: "Appointment - Niraj",
      start: new Date(2024, 7, 24, 10, 0), // August 20, 2024, 10:00 AM
      end: new Date(2024, 7, 24, 12, 0), // August 20, 2024, 12:00 PM
    },
    {
      title: "Appointment - Ram",
      start: new Date(2024, 7, 22, 10, 0), // August 20, 2024, 10:00 AM
      end: new Date(2024, 7, 22, 12, 0), // August 20, 2024, 12:00 PM
    },
  ]);
  return (
    <div className="calendar-wrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default BasicCalendar;
