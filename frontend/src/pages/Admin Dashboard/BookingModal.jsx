import React, { useState } from 'react';

const BookingModal = ({ closeModal }) => {
  const [newBooking, setNewBooking] = useState({
    tourName: '',
    fullName: '',
    guestSize: 0,
    phone: '',
    bookAt: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/booking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      const data = await response.json();

      if (response.ok) {
        // If the booking is successfully added to the backend, close the modal
        closeModal();
        // Show success alert
        alert('Booking added successfully!');
      } else {
        console.error('Error adding booking:', data.message);
      }
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  return (
    // <!-- Modal -->
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
