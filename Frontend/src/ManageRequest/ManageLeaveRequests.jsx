import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import AddNavigationBar from '../AdminNavBar/AdminNavBar';
import './AdminLeaveRequestsPanel.css'

const LeaveRequestPanel = () => {
  const [events, setEvents] = useState([]);
  const [editedEvent, setEditedEvent] = useState({
    id: null,
    name: '',
    description: ''
  });

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error occurred while fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event) => {
    setEditedEvent(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${editedEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedEvent)
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        const updatedEvents = events.map(event =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
        setEvents(updatedEvents);
        setEditedEvent({ id: null, name: '', description: '' });
        console.log(`Event with ID ${editedEvent.id} updated successfully`);
      } else {
        console.error(`Failed to update event with ID ${editedEvent.id}`);
      }
    } catch (error) {
      console.error('Error occurred while updating event:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${eventId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        console.log(`Event with ID ${eventId} deleted successfully`);
      } else {
        console.error(`Failed to delete event with ID ${eventId}`);
      }
    } catch (error) {
      console.error('Error occurred while deleting event:', error);
    }
  };

  return (
    <div className="container" style={{ color: 'white' }}>
      <AddNavigationBar />
      <h2 className="text-center mb-4 mt-3">Events</h2>
      {events.map((event) => (
        <div key={event.id} className="event border rounded p-3 mb-3" style={{ width: '60%', margin: '0 auto' }}>
          {editedEvent.id === event.id ? (
            <div>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedEvent.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={editedEvent.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" className="me-2" onClick={handleSubmit}>Save</Button>
              <Button variant="secondary" onClick={() => setEditedEvent({ id: null, name: '', description: '' })}>Cancel</Button>
            </div>
          ) : (
            <div>
              <h3>Name: {event.name}</h3>
              <p>Description: {event.description}</p>
              <div className="d-flex justify-content-end">
                <Button variant="success" className="me-2" onClick={() => handleEdit(event)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(event.id)}>Delete</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeaveRequestPanel;
