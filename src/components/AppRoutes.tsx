import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import EventList from './EventList';
import ParticipantList from './ParticipantList';
import Dashboard from './Dashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="events" element={<EventList />} />
        <Route path="participants" element={<ParticipantList />} />
      </Route>
    </Routes>
  );
}; 