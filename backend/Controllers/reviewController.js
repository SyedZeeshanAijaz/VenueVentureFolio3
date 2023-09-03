import Tour from "../models/Tour.js"
import Review from "../models/Review.js"
import Booking2 from '../models/Booking2.js'

// export const createReview = async (req,res) => {
//    const tourId  = req.params.tourId
//    const newReview = new Review({...req.body}) 
   
//    try {
//       const savedReview = await newReview.save()

//       // after creating a new review now update the reviews array of the tour 
//       await Tour.findByIdAndUpdate(tourId, {
//          $push: {reviews: savedReview._id}
//       })

//       res.status(200).json({success:true, message:"Review submitted", data:savedReview})
//    } catch (error) {
//       res.status(500).json({success:false, message:"Failed to submit"})
//    }
// }

// Assuming you have access to the necessary models and modules

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });

  console.log('Tour ID:', tourId);
  console.log('User ID:', req.body.userId);

  try {
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Venue not found' });
    }

    // Check if the user has a valid booking for the tour
    const booking = await Booking2.findOne({
      userId: req.body.userId,
      tourName: tour.name,
    });

    console.log('Booking:', booking);


    if (!booking) {
      return res.status(401).json({ success: false, message: 'You must book the venue before submitting a review' });
    }

    const savedReview = await newReview.save();

    // after creating a new review now update the reviews array of the tour
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({ success: true, message: 'Review submitted', data: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit' });
  }
};

// Get a review by ID
export const getReview = async (req, res) => {
   const id = req.params.id;
 
   try {
     const review = await Review.findById(id);
 
     if (!review) {
       return res
         .status(404)
         .json({ success: false, message: "Review not found" });
     }
 
     res.status(200).json({ success: true, data: review });
   } catch (error) {
     res
       .status(500)
       .json({ success: false, message: "Failed to get the review" });
   }
 };
 
 // Update a review
 export const updateReview = async (req, res) => {
   const id = req.params.id;
 
   try {
     const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
       new: true,
     });
 
     if (!updatedReview) {
       return res
         .status(404)
         .json({ success: false, message: "Review not found" });
     }
 
     res
       .status(200)
       .json({ success: true, message: "Review updated", data: updatedReview });
   } catch (error) {
     res
       .status(500)
       .json({ success: false, message: "Failed to update the review" });
   }
 };
 
 // Delete a review
 export const deleteReview = async (req, res) => {
   const id = req.params.id;
 
   try {
     const deletedReview = await Review.findByIdAndDelete(id);
 
     if (!deletedReview) {
       return res
         .status(404)
         .json({ success: false, message: "Review not found" });
     }
 
     res
       .status(200)
       .json({ success: true, message: "Review deleted", data: deletedReview });
   } catch (error) {
     res
       .status(500)
       .json({ success: false, message: "Failed to delete the review" });
   }
 };