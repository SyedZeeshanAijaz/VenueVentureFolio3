import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState,useEffect } from 'react';
import CustomizedSnackbars from '../../shared/CustomizedSnackbars';


export default function AddVenueComponent() {
  const [open, setOpen] = React.useState(false);
  const [venueData, setVenueData] = useState([]);
  const [newVenue, setNewVenue] = useState({
    name: '',
    city: '',
    address: '',
    desc: '',
    photo: '',
    price: 0,
    capacity: 0,
    featured: false,
    selected: false,
  });
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [loginAlertSeverity, setLoginAlertSeverity] = useState('error');
  const [loginAlertMessage, setLoginAlertMessage] = useState('');

  

  // Fetch all tours from the backend API
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/tours/');
      const data = await response.json();
      if (response.ok) {
        setVenueData(data.data);
      } else {
        console.error('Error fetching tours:', data.message);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVenue((prevVenue) => ({ ...prevVenue, [name]: value }));
  };


const handleFormSubmit = async (event) => {
  event.preventDefault();

  // Remove the _id field from newVenue
  const { _id, ...venueDataWithoutId } = newVenue;

  try {
    const response = await fetch('http://localhost:4000/api/v1/tours/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venueDataWithoutId), // Send the newVenue object without _id
    });

    const data = await response.json();

    if (response.ok) {
      // If the venue is successfully added to the backend, update the venueData state with the new venue
      setVenueData((prevData) => [...prevData, data.data]);

      // Reset the form fields
      setNewVenue({
        name: '',
        city: '',
        address: '',
        desc: '',
        photo: '',
        price: 0,
        capacity: 0,
        featured: false,
        selected: false,
      });

       // Show success alert
       setLoginAlertOpen(true);
       setLoginAlertSeverity('success');
       setLoginAlertMessage('Venue added successfully!');
     } else {
       console.error('Error adding venue:', data.message);
       // Show error alert
       setLoginAlertOpen(true);
       setLoginAlertSeverity('error');
       setLoginAlertMessage('Error adding venue: ' + data.message);
     }
   } catch (error) {
     console.error('Error adding venue:', error);
     // Show error alert
     setLoginAlertOpen(true);
     setLoginAlertSeverity('error');
     setLoginAlertMessage('Error adding venue: ' + error.message);
   }
 };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic goes here
    // For example, you can access form data using event.target elements and handle the submission accordingly
    const formData = new FormData(event.target);
    const newVenue = {
      name: formData.get('name'),
      city: formData.get('city'),
      address: formData.get('address'),
      desc: formData.get('desc'),
      photo: formData.get('photo'),
      price: formData.get('price'),
      capacity: formData.get('capacity'),
      featured: formData.get('featured') === 'true' ? true : false,
    };
    console.log(newVenue); // Handle newVenue data accordingly
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Venue
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Venue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new venue, please fill in the following details:
          </DialogContentText>
          <form onSubmit={handleFormSubmit} className="d-flex flex-column align-items-center">
              <div className="form-group">
                <label htmlFor="venueName">Venue Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="venueName"
                  name="name"
                  value={newVenue.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="venueCity"
                  name="city"
                  value={newVenue.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="venueAddress"
                  name="address"
                  value={newVenue.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueDesc">Description</label>
                <textarea
                  className="form-control"
                  id="venueDesc"
                  name="desc"
                  value={newVenue.desc}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="venuePhoto">Photo URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="venuePhoto"
                  name="photo"
                  value={newVenue.photo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="venuePrice">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="venuePrice"
                  name="price"
                  value={newVenue.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueCapacity">Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  id="venueCapacity"
                  name="capacity"
                  value={newVenue.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueFeatured">Featured</label>
                <select
                  className="form-control"
                  id="venueFeatured"
                  name="featured"
                  value={newVenue.featured}
                  onChange={handleInputChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Add Venue
              </button>
            </form> 
        </DialogContent>
      </Dialog>
      <CustomizedSnackbars
        severity={loginAlertSeverity}
        children={loginAlertMessage}
        open={loginAlertOpen}
        onClose={() => setLoginAlertOpen(false)}
      />
    </div>
  );
}
    