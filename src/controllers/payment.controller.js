const app = require('express');
const router = app.Router();
const PaymentService = require('../services/payment.service');

router.post('/', async (req, res) => {
    try {
        const payment = await PaymentService.createPayment(req.body);
        res.status(201).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

module.exports = router;