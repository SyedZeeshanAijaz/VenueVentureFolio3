import Booking from './../models/Booking2.js'
// Booking

// create new booking
// export const createBooking = async (req, res) => {
//    const newBooking = new Booking(req.body)

//    try {
//       const savedBooking = await newBooking.save()

//       res.status(200).json({ success: true, message: "Your tour is booked!", data: savedBooking })
//    } catch (error) {
//       res.status(500).json({ success: true, message: "Internal server error!" })
//    }
// }


export const createBooking = async (req, res) => {
   const newBooking = new Booking(req.body);
 
   try {
     // Check if a booking with the same bookAt date and the same venue (tourName) already exists
     const existingBooking = await Booking.findOne({
       bookAt: newBooking.bookAt,
       tourName: newBooking.tourName, // Assuming tourName represents the venue in the newBooking object
     });
 
     if (existingBooking) {
       // A booking with the same date and venue already exists, return a response indicating that the booking cannot be made
       return res.status(400).json({ success: false, message: "Booking date for this venue is already taken!" });
     }
 
     // Save the new booking if no conflicting date is found
     const savedBooking = await newBooking.save();
 
     res.status(200).json({ success: true, message: "Your venue is booked!", data: savedBooking });
   } catch (error) {
     res.status(500).json({ success: false, message: "Internal server error!" });
   }
 };
 
 
 export const getBookingCount = async(req,res) => {
   try {
      const bookingCount = await Booking.estimatedDocumentCount()

      res.status(200).json({success:true, data:bookingCount})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}

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

      res.status(200).json({ success: true, message: "Successful hai bro!", data: books })
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
 

 export const getTourCount = async(req,res) => {
   try {
      const tourCount = await Booking.estimatedDocumentCount()

      res.status(200).json({success:true, data:tourCount})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}