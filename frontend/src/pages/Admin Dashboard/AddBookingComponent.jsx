import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddBookingDialog() {
  const [open, setOpen] = React.useState(false);
  const [newBooking, setNewBooking] = React.useState({
    tourName: '', // Use an input field instead of dropdown
    fullName: '',
    guestSize: '',
    phone: '',
    bookAt: '',
  });
  const [venueList, setVenueList] = React.useState([]);

  React.useEffect(() => {
    // Fetch the venue list from the API
    fetchVenueList();
  }, []);

  const fetchVenueList = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/tours/');
      const data = await response.json();
      console.log(data);
      setVenueList(data); // Assuming the API response contains an array of venue objects
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
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic goes here
    console.log(newBooking); // Handle newBooking data accordingly
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Booking Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new booking, please fill in the following details:
          </DialogContentText>
     <form onSubmit={handleFormSubmit} className="form-container">
  <div className="form-group">
    <label htmlFor="tourName">Venue Name</label>
    <input
      type="text"
      className="form-control"
      id="tourName"
      name="tourName"
      value={newBooking.tourName}
      onChange={handleInputChange}
      required
    />
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
    />
  </div>
  <div className="form-group">
    <label htmlFor="bookAt">Booked At</label>
    <input
      type="date"
      className="form-control"
      id="bookAt"
      name="bookAt"
      value={newBooking.bookAt}
      onChange={handleInputChange}
      required
    />
  </div>
  <button type="submit" className="btn btn-primary mt-4">
    Book Now
  </button>
</form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
