import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useAuth } from '../context/AuthContext'; // Update the path to your AuthContext file.

const MyBookings2 = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserBookings(user._id); // Assuming the user object has a property '_id' for the user ID.
    }
  }, [user]);

  const handleCancelBooking = async (id) => {
    const confirmed = window.confirm("Do you want to cancel this booking?");
    if (!confirmed) {
      return; // Do nothing if the user clicks Cancel
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/booking2/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        // If the booking is successfully canceled, update the bookings state by removing the canceled booking
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
      } else {
        console.error('Error canceling booking:', data.message);
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };


  const fetchUserBookings = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/booking2/${id}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        const updatedBookings = data.data.map((booking) => {
          // Step 1: Convert the booking dates to JavaScript Date objects
          const bookAtDate = new Date(booking.bookAt);

          // Step 2: Calculate the 'endDate' by adding the booking duration (e.g., 3 days) to 'bookAtDate'
          const durationInDays = 0; // Modify this as needed
          const endDate = new Date(bookAtDate);
          endDate.setDate(endDate.getDate() + durationInDays);

          // Step 3: Calculate the remaining time in the span
          const remainingTime = endDate.getTime() - new Date().getTime();

          return {
            ...booking,
            bookAt: bookAtDate,
            endDate: endDate,
            remainingTime: remainingTime,
          };
        });
        setBookings(updatedBookings);
      } else {
        console.error("Error fetching user bookings:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };
  return (
    <div>
      <h2 className="bookings-title my-5" style={{color: "#042d66"}}>My Bookings</h2>
      {bookings.length === 0 ? (
        <div className='mb-5' style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "30px" }}>
          <u><h3>No Bookings yet</h3></u>
        </div>
      ) : (
        <>
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
                        {booking.remainingTime > 0
                          ? `${Math.ceil(booking.remainingTime / (1000 * 60 * 60 * 24))} days remaining`
                          : 'Expired'}
                      </span>
                    </div>
                    <div className="my-3 container card-body">
                      <h5 className="card-title">{booking.tourName}</h5>
                      <p className="card-text">Full Name: {booking.fullName}</p>
                      <p className="card-text">Meals: {booking.guestSize}</p>
                      <p className="card-text">Phone: {booking.phone}</p>
                      <p className="card-text">Booked At: {booking.bookAt.toISOString().split('T')[0]}</p>
                      <p className="card-text">Amount to pay: {booking.price.split('.')[0]} PKR</p>
                      <button className="cancel-booking-btn" onClick={() => handleCancelBooking(booking._id)}>
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings2;