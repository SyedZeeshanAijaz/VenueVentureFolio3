import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import BookingComponent from './BookingComponent';
import VenueComponent from './VenueComponent';
import BookingModal from './BookingModal';
import Dashboard2 from './Dashboard2'

const AdminApp = () => {
  return (
    <>
      <Navbar />

      <div className="container-fluid" id="main">
        <div className="row">
          <div className="col-md-3">
            <Dashboard />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col">
                <Routes>
                  {/* <Route path="/admin" element={<Dashboard2 />} /> */}
                  {/* <Route path="/adminbookings" element={<BookingComponent />} /> */}
                  {/* <Route path="/adminvenues" element={<VenueComponent />} /> */}
                  {/* <Route path='/adminmodal' element={<BookingModal/>}/> */}
                  <Route path='/admin' element={<Dashboard2/>} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminApp;
