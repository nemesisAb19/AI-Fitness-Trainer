const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// 👇 Mount the Stripe route
const stripeRoutes = require('./routes/stripe');
app.use('/api/stripe', stripeRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
