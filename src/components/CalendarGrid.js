import React, { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  getDay,
} from 'date-fns';
import '../styles/CalendarGrid.css';
import EventModal from './EventModal';

const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    return storedEvents;
  }); // Load events initially
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDate, setHighlightedDate] = useState(null); // Highlight the selected day
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const generateDays = () => {
    const startDate = startOfWeek(startOfMonth(currentDate));
    const endDate = endOfWeek(endOfMonth(currentDate));
    const days = [];

    for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
      days.push(day);
    }
    return days;
  };

  const handleDayClick = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(formattedDate);
    setHighlightedDate(formattedDate); // Set the highlighted date
    setIsModalOpen(true);
  };

  const handleSaveEvent = (newEvent, selectedEventIndex) => {
    const dateEvents = events[selectedDate] || [];

    const isOverlapping = dateEvents.some((event, index) => {
      if (index === selectedEventIndex) return false;
      const eventStartTime = new Date(`1970-01-01T${event.startTime}:00`);
      const eventEndTime = new Date(`1970-01-01T${event.endTime}:00`);
      const newEventStartTime = new Date(`1970-01-01T${newEvent.startTime}:00`);
      const newEventEndTime = new Date(`1970-01-01T${newEvent.endTime}:00`);

      return (
        newEventStartTime < eventEndTime && newEventEndTime > eventStartTime
      );
    });

    if (isOverlapping) {
      alert('This event overlaps with another event. Please choose a different time.');
      return;
    }

    setEvents((prevEvents) => {
      const updatedEvents = [...(prevEvents[selectedDate] || [])];
      if (selectedEventIndex !== null) {
        updatedEvents[selectedEventIndex] = newEvent;
      } else {
        updatedEvents.push(newEvent);
      }
      return { ...prevEvents, [selectedDate]: updatedEvents };
    });

    setIsModalOpen(false);
  };

  const handleDeleteEvent = (eventIndex) => {
    setEvents((prevEvents) => {
      const dateEvents = [...(prevEvents[selectedDate] || [])];
      dateEvents.splice(eventIndex, 1);
      return { ...prevEvents, [selectedDate]: dateEvents };
    });
  };

  const days = generateDays();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="nav-btn">Previous</button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="nav-btn">Next</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
        {days.map((day) => {
          const formattedDay = format(day, 'yyyy-MM-dd');
          return (
            <div
              key={day}
              className={`calendar-day ${
                !isSameMonth(day, currentDate) ? 'out-of-month' : ''
              } ${isToday(day) ? 'today' : ''} ${
                highlightedDate === formattedDay ? 'highlighted' : ''
              } ${
                getDay(day) === 0 || getDay(day) === 6 ? 'weekend' : 'weekday'
              }`}
              onClick={() => handleDayClick(day)}
            >
              {format(day, 'd')}
              <div className="events-indicator">
                {events[formattedDay]?.length > 0 && (
                  <span className="text-xs text-red-500">●</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <EventModal
          date={selectedDate}
          events={events[selectedDate] || []}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
