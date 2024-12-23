import React from 'react';
import CalendarGrid from './components/CalendarGrid';
import './styles/CalendarGrid.css'; // Import the CalendarGrid styles globally

const App = () => {
  return (
    <div className="app">
      <h1>Dynamic Event Calendar</h1>
      <CalendarGrid />
    </div>
  );
};

export default App;
