import React, { useState, useEffect } from 'react';
import NavigationBar from '../UserNavBar/UserNavBar';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Make a request to the backend to fetch events
      const response = await fetch('http://localhost:8080/api/events');
      if (response.ok) {
        // If the request is successful, parse the response and set the events state
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error occurred while fetching events:', error);
    }
  };

  return (
    <div className="container">
      <NavigationBar />
      <h2 className="text-center mb-4 mt-3" style={{ color: 'white' }}>Event Dashboard</h2>
      {events.map((event) => (
        <div key={event.id} className="event border rounded p-3 mb-3" style={{ width: '60%', margin: '0 auto' }}>
          <h3 style={{ color: 'white' }}>Name: {event.name}</h3>
          
          <p style={{ color: 'white' }}>Description: {event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventDashboard;
