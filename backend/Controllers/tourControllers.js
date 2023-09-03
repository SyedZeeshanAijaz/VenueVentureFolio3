import Tour from '../models/Tour.js'
import Booking from '../models/Booking.js'

//Create new tour
export const createTour = async (req, res) => {
   const newTour = new Tour(req.body)

   try {
      const savedTour = await newTour.save()

      res.status(200).json({ success: true, message: 'Successfully created', data: savedTour })
   } catch (error) {
      res.status(500).json({ success: true, message: 'Failed to create. Try again!' })
   }
}


export const getTourPrice = async (req, res) => {
   try {
     // Fetch all tours from the database
     const tours = await Tour.find({}, 'price');
 
     // Create an object to store tour prices with tour names as keys
     const tourPrices = {};
     tours.forEach((tour) => {
       tourPrices[tour.name] = tour.price;
     });
 
     res.json({ data: tourPrices });
   } catch (error) {
     console.error('Error fetching tour prices:', error);
     res.status(500).json({ message: 'Error fetching tour prices' });
   }
 }
 

//Update Tour
export const updateTour = async (req, res) => {
   const id = req.params.id

   try {
      const updatedTour = await Tour.findByIdAndUpdate(id, {
         $set: req.body
      }, { new: true })

      res.status(200).json({ success: true, message: 'Successfully updated', data: updatedTour })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update' })
   }
}

// Delete Tour
export const deleteTour = async (req, res) => {
   const id = req.params.id;

   try {
      // Find the tour before deleting it to retrieve its name
      const deletedTour = await Tour.findByIdAndDelete(id);

      if (!deletedTour) {
         return res.status(404).json({ success: false, message: 'Tour not found!' });
      }

      // Delete all reservations associated with the deleted tour (venue)
      await Booking.deleteMany({ tourName: deletedTour.name });

      res.status(200).json({ success: true, message: 'Successfully deleted tour and associated reservations' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete tour and associated reservations' });
   }
};


//Getsingle Tour
export const getSingleTour = async (req, res) => {
   const id = req.params.id

   try {
      const tour = await Tour.findById(id).populate('reviews')

      res.status(200).json({ success: true, message: 'Successfully', data: tour })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}


//Get All Tour
export const getAllTour = async (req, res) => {
   const page = parseInt(req.query.page)

   //console.log(page)

   try {
      const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8)

      res.status(200).json({ success: true, count: tours.length, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}






//Get featured Tour
export const getAdminTour = async (req, res) => {
   //console.log(page)

   try {
      const tours = await Tour.find({}).populate('reviews')

      res.status(200).json({ success: true, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}
 

export const getTourBySearch = async (req, res) => {
   const searchParams = {};
 
   if (req.query.city) {
     // 'i' means case-insensitive
     searchParams.city = new RegExp(req.query.city, 'i');
   }
   if (req.query.name) {
      // 'i' means case-insensitive
      searchParams.name = new RegExp(req.query.name, 'i');
    }
   if (req.query.price) {
      const price = parseInt(req.query.price);
      // 'gte' means greater than or equal to, 'lte' means less than or equal to
      searchParams.price = { $gte: price - 10000, $lte: price + 10000 };
    }
 
   if (req.query.capacity) {
     const capacity = parseInt(req.query.capacity);
     // 'gte' means greater than or equal to
     searchParams.capacity = { $gte: capacity - 100, $lte: capacity + 100 };
   }
 
   try {
     const tours = await Tour.find(searchParams).populate('reviews');
     res.status(200).json({ success: true, message: 'Successfully', data: tours });
   } catch (error) {
     res.status(404).json({ success: false, message: 'Not Found' });
   }
 };


//  export const getTourBySearch = async (req, res) => {
//    const searchParams = {};
 
//    if (req.query.city) {
//      // 'i' means case-insensitive
//      searchParams.city = new RegExp(req.query.city, 'i');
//    }
//    if (req.query.price) {
//       const price = parseInt(req.query.price);
//       // 'gte' means greater than or equal to, 'lte' means less than or equal to
//       searchParams.price = { $gte: price - 10000, $lte: price + 10000 };
//     }
 
//    if (req.query.capacity) {
//      const capacity = parseInt(req.query.capacity);
//      // 'gte' means greater than or equal to
//      searchParams.capacity = { $gte: capacity - 100, $lte: capacity + 100 };
//    }
 
//    try {
//      const tours = await Tour.find(searchParams).populate('reviews');
//      res.status(200).json({ success: true, message: 'Successfully', data: tours });
//    } catch (error) {
//      res.status(404).json({ success: false, message: 'Not Found' });
//    }
//  };
 

//Get featured Tour
export const getFeaturedTour = async (req, res) => {
   //console.log(page)

   try {
      const tours = await Tour.find({ featured: true }).populate('reviews').limit(8)

      res.status(200).json({ success: true, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get tour count 
export const getTourCount = async(req,res) => {
   try {
      const tourCount = await Tour.estimatedDocumentCount()

      res.status(200).json({success:true, data:tourCount})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}