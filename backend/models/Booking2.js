import mongoose from "mongoose";
// booking

const booking2Schema = new mongoose.Schema(
   {
      userId: {
         type: String
      },
      userEmail: {
         type: String
      },
      tourName: {
         type: String,
         required: true,
      },
      fullName: {
         type: String,
         required: true,
      },
      guestSize: {
         type: Number,
         required: true
      },
      phone: {
         type: Number,
         required: true
      },
      bookAt: {
         type: Date,
         required: true
      },      
      price: {
         type: String,
         required: true
      },
      status:{
         type: String,
         default: "booked"
      }
   },
   { timestamps: true }
);

export default mongoose.model("Booking2", booking2Schema);
