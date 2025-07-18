const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/payment.model');
const { publishEvent } = require('../events/publisher');
const { checkIdempotencyKey } = require('../utils/idempotency');

class PaymentService {

    static async createPayment({ merchantId, customerId, amount, product, idempotencyKey }) {
        await checkIdempotencyKey(idempotencyKey);

        const paymentIntent = await Payment.create({
            id: uuidv4(),
            merchantId: uuidv4(),
            customerId: uuidv4(),
            amount,
            product,
            status: 'created',
            idempotencyKey,
        });

        await publishEvent('payment.created', paymentIntent);
        return paymentIntent.id;
    }

    static async getPaymentById(paymentId) {
        const paymentIntent = await Payment.findByPk(paymentId);
        if (!paymentIntent) {
            const error = new Error('No payment found');
            error.status = 404;
            throw error;
        }
        return paymentIntent;
    }
}

module.exports = PaymentService;