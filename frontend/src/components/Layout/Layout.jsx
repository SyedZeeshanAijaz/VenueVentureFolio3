// Layout.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './../Header/Header';
import Routers from '../../router/Routers';
import Footer from './../Footer/Footer';

const Layout = () => {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admin');
  const navigate = useNavigate();

  // State to store the current location when the user enters an admin route
  const [adminRouteFrom, setAdminRouteFrom] = useState('');

  useEffect(() => {
    // If the user enters an admin route, store the current location in adminRouteFrom state
    if (isAdminDashboard) {
      setAdminRouteFrom(location.pathname);
    }
  }, [location, isAdminDashboard]);

  return (
    <>
      {!isAdminDashboard && <Header />}
      <Routers adminRouteFrom={adminRouteFrom} />
      {!isAdminDashboard && <Footer />}
    </>
  );
};

export default Layout;
