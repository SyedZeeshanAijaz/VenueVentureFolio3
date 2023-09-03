import express  from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import authRoute2 from './routes/auth2.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'
import booking2Route from './routes/bookings2.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000
const corsOptions = {
   origin: true,
   credentials: true
}

mongoose.set("strictQuery", false)
const connect = async() => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })

      console.log('MongoDB connected')
   } catch (error) {
      console.log('MongoDB connected failed')
   }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/auth2", authRoute2)
app.use("/api/v1/tours", tourRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/review", reviewRoute)
app.use("/api/v1/booking", bookingRoute)
app.use("/api/v1/booking2", booking2Route)

app.listen(port, () => {
   connect()
   console.log('server listening on port', port)
})