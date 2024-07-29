import express from 'express'
import mongoose from 'mongoose'
import { env } from './config.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// ROUTES
import routerContact from './routes/contact.js';
import routerUser from './routes/user.js';
import routerCourse from './routes/course.js';
import routerReview from './routes/review.js';
import routerReservation from './routes/reservation.js';

const app = express()

// PORT
const PORT = env.port || 8080

// DATABASE MONGOOSE
mongoose
  .connect(env.mongoURI, { dbName: 'Fialko' })
  .then(() => console.log("Connexion à Mongoose réussie !"))
  .catch(error => console.log(error))

// MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))
app.use(express.static("public"));

// MIDDLEWARE TO ROUTE
app.use("/api/contact", routerContact)
app.use("/api/user", routerUser)
app.use("/api/course", routerCourse)
app.use("/api/review", routerReview)
app.use("/api/reservation", routerReservation)

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})
