import express from 'express'
import { createBooking, getBookingCount, getAllBooking, getBooking, deleteBooking, updateBooking, getUserBookings } from '../Controllers/booking2Controller.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', createBooking)
// router.get('/:id', getBooking)
router.get('/count', getBookingCount)

router.get('/',  getAllBooking)
router.delete('/:id',deleteBooking)
router.put('/:id', updateBooking)
router.get('/:id', getUserBookings)

export default router
