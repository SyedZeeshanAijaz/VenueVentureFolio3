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
import CustomizedSnackbars from '../../shared/CustomizedSnackbars';
import './reservation.css'

const ReservationComponent = () => {
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



  const [open, setOpen] = React.useState(false);
  const [venueList, setVenueList] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(false);
  
  const [bookingCancelled, setBookingCancelled] = useState(false);
  const [bookingAdd, setBookingAdd] = useState(false);
  const [bookingSame, setBookingSame] = useState(false);


  useEffect(() => {
    fetchUserBookings();
    fetchVenueList();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/booking/', {
        credentials: 'include',
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
        credentials: 'include',
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
  

  const handleConfirmBooking = async (bookingId) => {
    const confirmed = window.confirm('Do you want to confirm this booking?');
    if (!confirmed) {
      return;
    }

    try {
      const bookingToConfirm = bookings.find((booking) => booking._id === bookingId);
      if (!bookingToConfirm) {
        console.error('Booking not found in the list');
        return;
      }

      const response = await fetch('http://localhost:4000/api/v1/booking2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingToConfirm),
      });

      const data = await response.json();

      if (response.ok) {
        setBookings((prevBookings) => {
          const updatedBookings = prevBookings.map((booking) => {
            if (booking._id === bookingId) {
              return { ...booking, confirmed: true };
            } else {
              return booking;
            }
          });
          return updatedBookings;
        });

        try {
          const deleteResponse = await fetch(`http://localhost:4000/api/v1/booking/${bookingId}`, {
            method: 'DELETE',
          });
          const deleteData = await deleteResponse.json();
          if (deleteResponse.ok) {
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
            setBookingSame(true);
          } else {
            
            console.error('Error deleting booking from reservations:', deleteData.message);
          }
        } catch (error) {
          console.error('Error deleting booking from reservations:', error);
        }
      } else {
        setBookingSuccess(true);
        console.error('Error confirming booking:', data.message);
      }
    } catch (error) {
      
      console.error('Error confirming booking:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/v1/booking/ad', {
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
  
        setBookingAdd(true);
      } else {
        if (data.message === "Booking date for this venue is already taken!") {
          setBookingSame(true);
        } else {
          setBookingError(true);
          console.error('Error adding booking:', data.message);
        }
      }
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  const handleCancelBooking = async (id) => {
    const confirmed = window.confirm('Do you want to cancel this reservation?');
    if (!confirmed) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/v1/booking/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
        setBookingCancelled(true); // Set bookingCancelled to true when booking is successfully canceled.
      } else {
        setBookingError(true);
        console.error('Error canceling booking:', data.message);
      }
    } catch (error) {
      setBookingError(true);
      console.error('Error canceling booking:', error);
    }
  };
  const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
  const sortedReservationData = [...filteredBookings].reverse();



  return (
    <>
      <div className="container">
          {/* Step 5: Add a container for the heading and the button */}
          <div className="heading-container">
          <button className="cancel-booking-btn blue-btn " onClick={handleClickOpen}>
            Add New Reservation
          </button></div>
          <div className="container">
          <h1 className="bookings-title ">All Reservations</h1>

        </div>
        {/* Step 3: Add the search bar below the top heading */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 , mt: 3 }}>
          <TextField
            label="Search Reservations"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <div className="text-center mb-3">

          {venueList.length > 0 && (
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Reservation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add a new Reservation, please fill in the following details:
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
    <label htmlFor="bookAt">Reservation Date</label>
    <input
      type="date"
      className="form-control"
      id="bookAt"
      name="bookAt"
      value={newBooking.bookAt}
      onChange={handleInputChange}
      defaultValue={newBooking.bookAt} // Add this line
      min={today} // Set the minimum date to today
      required
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
    />
  </div>
  <button type="submit" className="btn btn-primary mt-4">
    Reserve Now
  </button>
</form>

              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="bookings-container">
          {sortedReservationData.length === 0 ? ( // Check if the filteredBookings array is empty
            <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
              <u>No reservations found.</u>
            </Typography>
          ) : (
            <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Venue Name</th>
                <th>Reserved by</th>
                <th>Meals</th>
                <th>Phone</th>
                <th>Booked At</th>
                <th>Price</th> {/* New column for displaying tour price */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedReservationData.map((booking, index) => (
                <tr key={booking._id}>
                  {/* Numbering */}
                  <td>{index + 1}</td>
                  <td>{booking.tourName}</td>
                  <td>{booking.fullName}</td>
                  <td>{booking.guestSize}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.bookAt.split('T')[0]}</td>
                  {/* Step 2: Calculate the price based on the tour price */}
                  <td>{booking.price.split('.')[0]}</td>
                  <td>
        <button
          className="small-btn green-btn"
          onClick={() => handleConfirmBooking(booking._id)}
        >
          Confirm Booking
        </button>
        <span style={{ margin: '0 5px' }}></span>
        <button
          className="small-btn red-btn"
          onClick={() => handleCancelBooking(booking._id)}
        >
          Cancel Reservation
        </button>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          )}
        </div>
        {/* Display the success and error snackbars using the CustomizedSnackbars component */}
        <CustomizedSnackbars
          severity="info"
          message="Booking date for this venue is already taken"
          open={bookingSuccess}
          onClose={() => setBookingSuccess(false)}
        />

        <CustomizedSnackbars
          severity="success"
          message="Reservation cancelled successfully!"
          open={bookingCancelled}
          onClose={() => setBookingCancelled(false)}
        />

        <CustomizedSnackbars
          severity="success"
          message="Reservation added successfully"
          open={bookingAdd}
          onClose={() => setBookingAdd(false)}
        />

        <CustomizedSnackbars
          severity="success"
          message="Booking confirmed successfully"
          open={bookingSame}
          onClose={() => setBookingSame(false)}
        />
      </div>
    </>
  );
};

export default ReservationComponent;
