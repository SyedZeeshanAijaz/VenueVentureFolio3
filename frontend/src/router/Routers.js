// Routers.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThankYou from '../pages/ThankYou';
import Home from './../pages/Home';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import TourDetails from './../pages/TourDetails';
import Tours from './../pages/Tours';
import MyBookings from '../pages/MyBookings';

import Dashboard2 from '../pages/Admin Dashboard/Dashboard2';
import MyBookings2 from '../pages/MyBookings2';
import ReservationComponent from '../pages/Admin Dashboard/ReservationComponent';
import BookingComponent from '../pages/Admin Dashboard/BookingComponent';
import VenueComponent from '../pages/Admin Dashboard/VenueComponent';

const Routers = ({ adminRouteFrom }) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === 'admin';
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  return (
    <Routes>
      {isAdmin ? (
        <>
          {/* Admin routes */}
          <Route path="/admin" element={<Dashboard2 />} />
          <Route path="/adminreservation" element={<ReservationComponent />} />
          <Route path="/adminbooking" element={<BookingComponent />} />
          <Route path="/adminvenue" element={<VenueComponent />} />
          {/* Redirect regular users from admin routes */}
          <Route path="/*" element={<Navigate to={from} />} />
        </>
      ) : (
        <>
          {/* Regular user routes */}
          {user ? (
            <>
              <Route path="/mybooking" element={<MyBookings />} />
              <Route path="/mybooking2" element={<MyBookings2 />} />
            </>
          ) : (
            <>
              {/* Redirect to home page if the user is not logged in */}
              <Route path="/mybooking" element={<Navigate to="/home" />} />
              <Route path="/mybooking2" element={<Navigate to="/home" />} />
            </>
          )}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          {/* Pass the current location to the Login component */}
          <Route path="/login" element={<Login redirectTo={adminRouteFrom} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/tours/search" element={<SearchResultList />} />
          <Route path="/*" element={<Navigate to={from} />} />

        </>
      )}
    </Routes>
  );
};

export default Routers;
