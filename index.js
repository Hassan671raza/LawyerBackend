// PACKAGE IMPORTS 

const express = require('express');
const connectDB = require('./conn');
const dotenv = require('dotenv');


// IMPORTS 
const clientsRouter = require('./routes/clients');
const lawyerRouter = require('./routes/lawyers');
const bookingsRouter = require('./routes/bookings')

// VARIABLES
const app = express();
const PORT = 5000 || process.env.PORT;

// MIDDLEWARES 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
dotenv.config();
connectDB(process.env.MONGO_URI);

// ROUTES 
app.use('/api/client', clientsRouter);
app.use('/api/lawyer', lawyerRouter);
app.use('/api/bookings', bookingsRouter);

// LISTENING 
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));