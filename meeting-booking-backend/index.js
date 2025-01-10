const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/meetingBookingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    property: { type: String, required: true },
    meetingType: { type: String, required: true },
    date: { type: Date, required: true },
    dealer: { type: String, required: true },
    notes: { type: String },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Route to handle form submissions
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send({ message: 'Booking saved successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving booking.', error });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
