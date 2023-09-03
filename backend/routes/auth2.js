import express from 'express'
import { login, register } from '../Controllers/authController2.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'
// import fetchuser from '../middleware/fetchuser.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register2', register)
router.post('/login2', login)


export default router