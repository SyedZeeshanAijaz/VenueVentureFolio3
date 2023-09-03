import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useAuth } from '../context/AuthContext'; // Update the path to your AuthContext file.

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user && user._id) { // Check if user and user._id are both present
      fetchUserBookings(user._id);
    }
  }, [user]);

  const handleCancelBooking = async (id) => {
    const confirmed = window.confirm("Do you want to cancel this reservation?");
    if (!confirmed) {
      return; // Do nothing if the user clicks Cancel
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/booking/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message); // Throw an error if the response is not successful
      }

      // If the booking is successfully canceled, update the bookings state by removing the canceled booking
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const fetchUserBookings = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/booking/${id}`, {
        credentials: 'include',
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      const currentDate = new Date();
  
      const updatedBookings = data.data.map((booking) => {
        // Step 1: Convert the createdAt date to JavaScript Date object
        const createdAtDate = new Date(booking.createdAt);
  
        // Log the format of the createdAtDate to check if it's correct
        console.log("createdAtDate:", createdAtDate);
  
        const endDate = new Date(createdAtDate); // Create a new Date object to avoid modifying the original createdAtDate
        endDate.setDate(endDate.getDate() + 3); // Add 3 days correctly
  
        // Log the endDate and remainingTime to check their values
        console.log("endDate:", endDate);
        console.log("remainingTime:", endDate.getTime() - currentDate.getTime());
  
        // Step 2: Calculate the remaining time for the booking
        const remainingTime = endDate.getTime() - currentDate.getTime();
  
        return {
          ...booking,
          createdAt: createdAtDate,
          endDate: endDate,
          remainingTime: remainingTime,
        };
      });
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };
  




  return (
    <div>
      <h2 className="bookings-title my-5" style={{color: "#042d66"}}>My Reservations</h2>
      {bookings.length === 0 ? (
        <div className='mb-5' style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "30px" }}>
          <u><h3>No Reservations yet</h3></u>
        </div>
      ) : (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {bookings.map((booking) => (
              <div className="col" key={booking._id}>
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }> 
                    <span className="badge rounded-pill bg-danger">
                      {booking.remainingTime >= 0
                        ? `confirm within ${Math.ceil(booking.remainingTime / (24 * 60 * 60 * 1000))} days`
                        : 'contact venue owner'}
                    </span>
                  </div>
                  <div className="my-3 card-body">
                    <h5 className="card-title">{booking.tourName}</h5>
                    <p className="card-text">Full Name: {booking.fullName}</p>
                    <p className="card-text">Meals: {booking.guestSize}</p>
                    <p className="card-text">Phone: {booking.phone}</p>
                    <p className="card-text">Reserved At: {booking.bookAt.split('T')[0]}</p>
                    <p className="card-text">Amount to pay: {booking.price.split('.')[0]} PKR</p> {/* Add this line to display the price */}
                    <button
                      className="cancel-booking-btn"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;