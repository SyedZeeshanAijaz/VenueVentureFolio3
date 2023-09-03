import express from 'express'
import { createBooking, adminCreateBooking, getAllBooking, getBooking, deleteBooking, updateBooking, getUserBookings, getBookingCount } from '../Controllers/bookingController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'
import fetchuser from '../middleware/fetchuser.js'

const router = express.Router()

router.post('/', createBooking)
router.post('/ad', adminCreateBooking)
router.get('/count', getBookingCount)
// router.get('/:id', getBooking)
router.get('/',  getAllBooking)
router.delete('/:id',deleteBooking)
router.put('/:id', updateBooking)
router.get('/:id', getUserBookings)

export default router
