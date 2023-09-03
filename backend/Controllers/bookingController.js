import Booking from './../models/Booking.js'
// Reservation

// create new booking
export const adminCreateBooking = async (req, res) => {
   const newBooking = new Booking(req.body)

   try {
      const savedBooking = await newBooking.save()

      res.status(200).json({ success: true, message: "Your tour is booked!", data: savedBooking })
   } catch (error) {
      res.status(500).json({ success: true, message: "Internal server error!" })
   }
}

export const getBookingCount = async(req,res) => {
   try {
      const bookingCount = await Booking.estimatedDocumentCount()

      res.status(200).json({success:true, data:bookingCount})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}

// create new booking
export const createBooking = async (req, res) => {
   const newBooking = new Booking(req.body);

   try {
      // Check if a booking with the same bookAt date and the same venue (tourName) already exists
      const existingBookings = await Booking.find({
         userId: newBooking.userId,
      });

      // Check if there are already three reservations for the same tour at the same date
      if (existingBookings.length >= 3) {
         return res.status(400).json({ success: false, message: "You cannot reserve more than 3 venues" });
      }

      // Save the new booking if the limit is not reached
      const savedBooking = await newBooking.save();

      res.status(200).json({ success: true, message: "Your venue is booked!", data: savedBooking });
   } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error!" });
   }
};

 
 

// get single booking
export const getBooking = async (req, res) => {
   const id = req.params.id

   try {
      const book = await Booking.findById(id)

      if (!book) {
         return res.status(404).json({ success: false, message: "Booking not found2!" })
      }

      res.status(200).json({ success: true, message: "Successful!", data: book })
   } catch (error) {
      res.status(500).json({ success: true, message: "Internal server error!" })
   }
}

// get all booking
export const getAllBooking = async (req, res) => {

   try {
      const books = await Booking.find()

      res.status(200).json({ success: true, message: "Successful!", data: books })
   } catch (error) {
      res.status(500).json({ success: true, message: "Internal server error!" })
   }
}

// delete a booking
export const deleteBooking = async (req, res) => {
   const id = req.params.id

   try {
      const deletedBooking = await Booking.findByIdAndDelete(id)

      if (!deletedBooking) {
         return res.status(404).json({ success: false, message: "Booking not found3!" })
      }

      res.status(200).json({ success: true, message: "Booking deleted successfully!", data: deletedBooking })
   } catch (error) {
      res.status(500).json({ success: true, message: "Internal server error!" })
   }
}

// update a booking
export const updateBooking = async (req, res) => {
   const id = req.params.id

   try {
      const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true })

      if (!updatedBooking) {
         return res.status(404).json({ success: false, message: "Booking not found1!" })
      }

      res.status(200).json({ success: true, message: "Booking updated successfully!", data: updatedBooking })
   } catch (error) {
      res.status(500).json({ success: true, message: "Internal server error!" })
   }
}
export const getUserBookings = async (req, res) => {
   const userId = req.params.id; // Change from req.params.id to req.query.id
 
   console.log("User Data:", req.params);
   console.log("User ID:", req.params.id);
 
   try {
     const userBookings = await Booking.find({ userId });
     console.log("User Bookings:", userBookings);
 
     if (!userBookings || userBookings.length === 0) {
       return res.status(404).json({ success: false, message: "Bookingd!" });
     }
 
     res.status(200).json({ success: true, message: "Successful!", data: userBookings });
   } catch (error) {
      console.log(error)
     res.status(500).json({ success: false, message: "Internr!" });
   }
 };



