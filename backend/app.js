const express = require('express')
require('dotenv').config()
const authRoutes = require('./routes/authRoute')
const {connectDB} = require('./database/dbConnect')
const app = express()

connectDB()

app.use(express.json())
app.use('/', authRoutes)
app.listen(process.env.PORT, ()=>console.log('server started'))