require('dotenv').config();
const express = require('express');
const app = express();
const paymentRoutes = require('./routes/payment.routes');

app.use(express.json());
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));
