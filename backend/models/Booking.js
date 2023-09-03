import mongoose from "mongoose";
//Reservation 

const bookingSchema = new mongoose.Schema(
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
      status:{
         type: String,
         default: "reserved"
      }      ,
      price: {
         type: String,
         required: true
      },
   },
   { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
