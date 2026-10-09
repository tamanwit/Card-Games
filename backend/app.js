const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const authRoutes = require('./routes/authRoute')
const {connectDB} = require('./database/dbConnect')
const app = express()

// cors implementation
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB()


app.use(express.json())
app.use(cookieParser())
app.use('/', authRoutes)
app.listen(process.env.PORT, ()=>console.log('server started'))