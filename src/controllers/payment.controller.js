const app = require('express');
const router = app.Router();
const PaymentService = require('../services/payment.service');

router.post('/', async (req, res) => {
    try {
        const paymentId = await PaymentService.createPayment(req.body);
        res.status(201).json(paymentId);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;

        if (!paymentId) {
            return res.status(400).json({ error: 'Missing payment ID' });
        }

        const paymentIntent = await PaymentService.getPaymentById(paymentId);
        res.status(200).json(paymentIntent);
    } catch (err) {
        if (err.status === 404) {
           return res.status(404).json({ error: 'No payment found' });
        }
        console.error('[GET /payment/:paymentId]', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;