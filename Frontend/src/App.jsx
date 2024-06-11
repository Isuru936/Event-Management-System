import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes from react-router-dom
import LoginPage from './login/Login';
import CreateEventForm from './CreateEvent/CreateEvent';
import AdminLeaveRequestsPanel from './ManageRequest/ManageLeaveRequests';
import EventDashboard from './EventDashboard/EventDashboard';
import AddUserPage from './Adduser/AddUser';
import UserInformation from './UserInformation/UserInformation';
import EditUserForm from './EditUser/EditUser';

import './App.css';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Route */}
        <Route exact path="/login" element={<LoginPage />} /> {/* Wrap Route with Routes */}
        <Route exact path="/form" element={<CreateEventForm />} /> 
        <Route exact path="/dashboard" element={<EventDashboard />} /> 
        <Route exact path="/admin" element={<AdminLeaveRequestsPanel />} /> 
        <Route exact path="/adduser" element={<AddUserPage />} />
        <Route exact path="/userlist" element={<UserInformation />} />
        <Route exact path="/edit" element={<EditUserForm />} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
