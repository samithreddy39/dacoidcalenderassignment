import React, { useState } from 'react';
import '../styles/EventModal.css';

const EventModal = ({ date, events, onSave, onDelete, onClose }) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');

  // Initialize form values for editing an event
  React.useEffect(() => {
    if (selectedEventIndex !== null) {
      const event = events[selectedEventIndex];
      setEventName(event.eventName);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description);
    } else {
      setEventName('');
      setStartTime('');
      setEndTime('');
      setDescription('');
    }
  }, [selectedEventIndex, events]);

  const handleSave = () => {
    if (eventName && startTime && endTime) {
      const newEvent = { eventName, startTime, endTime, description };
      onSave(newEvent, selectedEventIndex); // Pass selectedEventIndex to replace
      setEventName('');
      setStartTime('');
      setEndTime('');
      setDescription('');
      setSelectedEventIndex(null);
    } else {
      alert('Please fill in all required fields!');
    }
  };

  const handleEditEvent = (index) => {
    setSelectedEventIndex(index);
  };

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Events for {date}</h2>
        <input
          type="text"
          placeholder="Search events"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
          className="search-input"
        />
        <div className="event-list">
          {filteredEvents.map((event, index) => (
            <div key={index} className="event-item">
              <div>
                <strong>{event.eventName}</strong>
                <p>
                  {event.startTime} - {event.endTime}
                </p>
                <p>{event.description}</p>
              </div>
              <button
                onClick={() => handleEditEvent(index)}
                className="edit-btn"
              >
                Edit
              </button>
              <button onClick={() => onDelete(index)} className="delete-btn">
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="event-form">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="time"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <textarea
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleSave} className="save-btn">
            {selectedEventIndex !== null ? 'Update Event' : 'Save Event'}
          </button>
        </div>
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
