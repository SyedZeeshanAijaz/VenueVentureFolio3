import React, { useEffect, useState } from 'react';
import '../MyBookings.css';
import Sidebar from './Sidebar';
import { Box, Stack, Typography } from '@mui/material';
import BookingModal from './BookingModal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './form.css'
import CustomizedSnackbars from '../../shared/CustomizedSnackbars';
import './reservation.css'


const BookingComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    tourName: '',
    fullName: '',
    guestSize: 0,
    phone: 0,
    bookAt: '',
    price: ''
  });

  // Step 1: Create a new state variable for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Step 2: Event handler to update the search query state
const handleSearchChange = (event) => {
  const newSearchQuery = event.target.value.toLowerCase();
  setSearchQuery(newSearchQuery);
};

const [filteredBookings, setFilteredBookings] = useState([]);
useEffect(() => {
  if (searchQuery === '') {
    // If the search query is empty, show all bookings
    setFilteredBookings(bookings);
  } else {
    // If the search query is not empty, filter the bookings
    const filteredResults = bookings.filter((booking) => {
      return (
        booking.tourName.toLowerCase().includes(searchQuery) ||
        booking.fullName.toLowerCase().includes(searchQuery) ||
        booking.phone.toString().includes(searchQuery) ||
        booking.bookAt.includes(searchQuery)
      );
    });
    setFilteredBookings(filteredResults);
  }
}, [searchQuery, bookings]);


  // New state variables to control success and error alerts
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingSuccess2, setBookingSuccess2] = useState(false);
  const [bookingError, setBookingError] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [venueList, setVenueList] = useState([]);

  useEffect(() => {
    fetchUserBookings();
    fetchVenueList();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/booking2/', {
        credentials: 'include', // Include credentials for authentication if needed
      });
      const data = await response.json();
      if (response.ok) {
        setBookings(data.data);
      } else {
        console.error('Error fetching user bookings:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const fetchVenueList = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/tours/all/ad', {
        credentials: 'include', // Include credentials for authentication if needed
      });
      const data = await response.json();
      if (response.ok) {
        setVenueList(data.data);
      } else {
        console.error('Error fetching venue list:', data.message);
      }
    } catch (error) {
      console.error('Error fetching venue list:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    // Check if the input is for the tourName field
    if (name === 'tourName') {
      // Find the selected venue from the venueList based on its name
      const selectedVenue = venueList.find((venue) => venue.name === value);
      
      // If the selectedVenue is found, update the price in the newBooking state
      if (selectedVenue) {
        setNewBooking((prevBooking) => ({
          ...prevBooking,
          [name]: value,
          price: selectedVenue.price * prevBooking.guestSize, // Calculate the total price
        }));
      } else {
        setNewBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
      }
    } else if (name === 'guestSize') {
      // If the input is for the guestSize field, also update the price based on the new guestSize
      setNewBooking((prevBooking) => ({
        ...prevBooking,
        [name]: value,
        price: newBooking.tourName
          ? venueList.find((venue) => venue.name === newBooking.tourName).price * value
          : 0,
      }));
    } else {
      // For other fields, simply update the state as before
      setNewBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
    }
  };
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/booking2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      const data = await response.json();

      if (response.ok) {
        setBookings((prevBookings) => [...prevBookings, data.data]);
        setNewBooking({
          tourName: '',
          fullName: '',
          guestSize: 0,
          phone: 0,
          bookAt: '',
        });

        // Show success alert
        setBookingSuccess2(true);
      } else {
        // Check if the booking date is already taken
        if (response.status === 400) {
          // Show error alert
          setBookingError(true);
        } else {
          console.error('Error adding booking:', data.message);
        }
      }
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  const handleCancelBooking = async (id) => {
    const confirmed = window.confirm('Do you want to cancel this booking?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/booking2/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
        // Show success alert
        setBookingSuccess(true);
      } else {
        console.error('Error canceling booking:', data.message);
        // Show error alert
        setBookingError(true);
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      // Show error alert
      setBookingError(true);
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

  const sortedReservationData = [...filteredBookings].reverse();

  return (
    <>
      <div className="container">
          {/* Step 5: Add a container for the heading and the button */}
          <div className="heading-container">
          <button className="cancel-booking-btn blue-btn" onClick={handleClickOpen}>
            Add New Booking
          </button></div>
          <div className="container">
          <h1 className="bookings-title ">All Bookings</h1>

        </div>

        {/* Step 3: Add the search bar below the top heading */}
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 , mt: 3 }}
        >
          <TextField
            label="Search Bookings"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <div className="text-center mb-3">
          {/* <button className="cancel-booking-btn blue-btn" onClick={handleClickOpen}>
            Add New Booking
          </button> */}
          {venueList.length > 0 && (
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Booking</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add a new Booking, please fill in the following details:
                </DialogContentText>
                <form onSubmit={handleFormSubmit} className="form-container">
  <div className="form-group">
    <label htmlFor="tourName">Venue Name</label>
    <select
      className="form-control"
      id="tourName"
      name="tourName"
      value={newBooking.tourName}
      onChange={handleInputChange}
      required
    >
      <option value="">Select Venue</option>
      {venueList.map((venue) => (
        <option key={venue._id} value={venue.name}>
          {venue.name}
        </option>
      ))}
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="fullName">Full Name</label>
    <input
      type="text"
      className="form-control"
      id="fullName"
      name="fullName"
      value={newBooking.fullName}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="guestSize">Meals</label>
    <input
      type="number"
      className="form-control"
      id="guestSize"
      name="guestSize"
      value={newBooking.guestSize}
      onChange={handleInputChange}
      required
      inputMode="numeric" // Add this line to remove increase/decrease arrows
      min="1"
    />
  </div>
  <div className="form-group">
    <label htmlFor="phone">Phone</label>
    <input
      type="number"
      className="form-control"
      id="phone"
      name="phone"
      value={newBooking.phone}
      onChange={handleInputChange}
      required
      inputMode="numeric" // Add this line to remove increase/decrease arrows
      min="1"
    />
  </div>
  <div className="form-group">
    <label htmlFor="bookAt">Booking Date</label>
    <input
      type="date"
      className="form-control"
      id="bookAt"
      name="bookAt"
      value={newBooking.bookAt}
      onChange={handleInputChange}
      required
      defaultValue={newBooking.bookAt} // Add this line
      min={today} // Set the minimum date to today
    />
  </div>
  <div className="form-group">
    <label htmlFor="phone">Price</label>
    <input
      type="number"
      className="form-control"
      id="price"
      name="price"
      value={newBooking.price}
      onChange={handleInputChange}
      required
      inputMode="numeric" // Add this line to remove increase/decrease arrows
      min="1"
      readOnly // Set the readOnly attribute to make the field non-editable
    />
  </div>
  <button type="submit" className="btn btn-primary mt-4">
    Book Now
  </button>
</form>

              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="bookings-container">
          <table className="table">
            <thead>
              <tr>
              <th>S.No</th>
                <th>Venue Name</th>
                <th>Booked by</th>
                <th>Meals</th>
                <th>Phone</th>
                <th>Booked At</th>
                <th>Price</th> {/* New column for displaying tour price */}

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Step 4: Render the filtered bookings */}
              {sortedReservationData.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.tourName}</td>
                  <td>{booking.fullName}</td>
                  <td>{booking.guestSize}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.bookAt.split('T')[0]}</td>
                  <td>{booking.price.split('.')[0]}</td>
                  <td>
                    <button
                      className="small-btn red-btn"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Display the success and error alerts using the CustomizedSnackbars component */}
      <CustomizedSnackbars
        severity="success"
        message="Booking cancelled successfully"
        open={bookingSuccess}
        onClose={() => setBookingSuccess(false)}
      />

      <CustomizedSnackbars
        severity="success"
        message="Booking Added successfully"
        open={bookingSuccess2}
        onClose={() => setBookingSuccess2(false)}
      />

      <CustomizedSnackbars
        severity="info"
        message="Booking date for this venue is already taken"
        open={bookingError}
        onClose={() => setBookingError(false)}
      />
    </>
  );
};

export default BookingComponent;