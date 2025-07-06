const app = require('express');
const router = app.Router();
const paymentController = require('../controllers/payment.controller');

router.use('/payments', paymentController);

module.exports = router;