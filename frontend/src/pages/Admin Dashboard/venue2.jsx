import React, { useState, useEffect } from 'react';
import AddVenueComponent from './AddVenueComponent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomizedSnackbars from '../../shared/CustomizedSnackbars';
import { Box } from '@mui/material';
import './venue.css'
const VenueComponent = () => {
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [venueSuccess, setVenueSuccess] = useState(false);
  const [venueSuccess2, setVenueSuccess2] = useState(false);
  const [venueError, setVenueError] = useState(false);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/tours/all/ad');
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

  useEffect(() => {
    fetchTours();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVenue((prevVenue) => ({ ...prevVenue, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { _id, ...venueDataWithoutId } = newVenue;
    try {
      const response = await fetch('http://localhost:4000/api/v1/tours/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueDataWithoutId),
      });

      const data = await response.json();

      if (response.ok) {
        setVenueData((prevData) => [...prevData, data.data]);
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
        setVenueSuccess(true);
      } else {
        setVenueError(true);
        console.error('Error adding venue:', data.message);
      }
    } catch (error) {
      setVenueError(true);
      console.error('Error adding venue:', error);
    }
  };

  const handleDeleteVenue = async (id) => {
    const confirmed = window.confirm('Do you want to delete this venue?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/tours/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setVenueData((prevData) => prevData.filter((venue) => venue._id !== id));
        setVenueSuccess2(true);
      } else {
        setVenueError(true);
        console.error('Error deleting tour:', data.message);
      }
    } catch (error) {
      setVenueError(true);
      console.error('Error deleting tour:', error);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value.toLowerCase();
    setSearchQuery(newSearchQuery);
  };

  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredVenues(venueData);
    } else {
      const filteredResults = venueData.filter((venue) => {
        return (
          venue.name.toLowerCase().includes(searchQuery) ||
          venue.city.toLowerCase().includes(searchQuery) ||
          venue.address.toLowerCase().includes(searchQuery)
        );
      });
      setFilteredVenues(filteredResults);
    }
  }, [searchQuery, venueData]);

    const sortedVenueData = [...filteredVenues].reverse();

  return (
    <>
      <div className="container">
          {/* Step 5: Add a container for the heading and the button */}
          <div className="heading-container">
          <button className="cancel-booking-btn blue-btn" onClick={handleClickOpen}>
            Add New Venue
          </button></div>
          <div className="container">
          <h1 className="bookings-title ">All Venues</h1>

        </div>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3, mt: 3 }}>
          <TextField
            label="Search Venues"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <div className="text-center mb-3">
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Venue</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add a new venue, please fill in the following details:
              </DialogContentText>
              <form onSubmit={handleFormSubmit} className="form-container">
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
      inputMode="numeric" // Add this line to remove increase/decrease arrows
      min="1"
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
      inputMode="numeric" // Add this line to remove increase/decrease arrows
      min="1"
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
        </div>
        {sortedVenueData.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                <th>S.No</th>

                  <th>Venue Name</th>
                  <th>City</th>
                  <th>Address</th>
                  {/* <th>Description</th> */}
                  <th>Photo</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedVenueData.map((venue, index) => (
                  <tr key={venue._id}>
                    <td>{index+1}</td>
                    <td>{venue.name}</td>
                    <td>{venue.city}</td>
                    <td>{venue.address}</td>
                    {/* <td>{venue.desc}</td> */}
                    <td>
                      <img
                        src={venue.photo}
                        alt=""
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>{venue.price}</td>
                    <td>{venue.capacity}</td>
                    <td>{venue.featured ? 'Yes' : 'No'}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteVenue(venue._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="my-4">No venues found.</p>
        )}

        <CustomizedSnackbars
          severity="success"
          message="Venue added successfully"
          open={venueSuccess}
          onClose={() => setVenueSuccess(false)}
        />

        <CustomizedSnackbars
          severity="success"
          message="Venue deleted successfully"
          open={venueSuccess2}
          onClose={() => setVenueSuccess2(false)}
        />

        <CustomizedSnackbars
          severity="error"
          message="Error adding or deleting venue"
          open={venueError}
          onClose={() => setVenueError(false)}
        />
      </div>
    </>
  );
};

export default VenueComponent;
