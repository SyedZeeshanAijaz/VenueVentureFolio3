import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import CustomizedSnackbars from '../../shared/CustomizedSnackbars';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, name } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: name,
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: '',
  });

  const [signInAlertOpen, setSignInAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  const handleChange = (e) => {
    const { id, value } = e.target;

    // Handle the date input separately to account for time zone offset
    if (id === 'bookAt') {
      const selectedDate = new Date(value);
      // Get the UTC date string to account for time zone offset
      const utcDate = selectedDate.toISOString().split('T')[0];
      setBooking((prev) => ({ ...prev, [id]: utcDate }));
    } else {
      setBooking((prev) => ({ ...prev, [id]: value }));
    }
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(booking);

    try {
      if (!user || user === undefined || user === null) {
        setSignInAlertOpen(true);
      } else {
        const bookingData = {
          ...booking,
          price: totalAmount, // Save the totalAmount in the price field of booking
        };

        const res = await fetch(`${BASE_URL}/booking`, {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(bookingData),
        });

        const result = await res.json();

        if (!res.ok) {
          if (res.status === 400 && result.message === "You cannot reserve more than 3 venues") {
            setErrorAlertOpen(true);
            setErrorMessage(result.message);
          } else {
            setErrorAlertOpen(true);
            setErrorMessage('Please fill all the fields correctly');
          }
        } else {
          navigate('/thank-you');
        }
      }
    } catch (error) {
      setErrorAlertOpen(true);
      setErrorMessage('An error occurred while processing your request. Please try again later.');
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format


  return (
    <div className='booking'>
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>{price} Rs<span>/per meal</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i className='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* =============== BOOKING FORM START ============== */}
      <div className="booking__form">
        <h5>Reservation Form</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="tel" placeholder='Phone' id='phone' required onChange={handleChange} />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
              defaultValue={booking.bookAt} // Add this line
              min={today} // Set the minimum date to today


            />
            <input
              type="number"
              placeholder='Meals'
              id='guestSize'
              required
              onChange={handleChange}
              inputMode="numeric" // Add this line to remove increase/decrease arrows
              min="1" // Add this line to set the minimum value to 1
            />
          </FormGroup>
        </Form>
      </div>
      {/* =============== BOOKING FORM END ================ */}

      {/* =============== BOOKING BOTTOM ================ */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>{price} Rs for <i className='ri-close-line'></i> 1 meal</h5>
            <span> ${price}</span>
          </ListGroupItem>
          {/* <ListGroupItem className='border-0 px-0'>
            <h5>Service charge</h5>
            <span>{serviceFee} Rs</span>
          </ListGroupItem> */}
          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        
        {/* Add the note below the Total section */}
        <p style={{ textAlign:'center', color: 'red' }}>Confirm your booking within 3 days</p>

        

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Reserve Now</Button>
      </div>

      {/* CustomizedSnackbars */}
      <CustomizedSnackbars severity="error" open={signInAlertOpen} onClose={() => setSignInAlertOpen(false)}message={errorMessage} />

      <CustomizedSnackbars severity="error" open={errorAlertOpen} onClose={() => setErrorAlertOpen(false)} message={errorMessage} />

    </div>
  );
};

export default Booking;
