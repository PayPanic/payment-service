const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/payment.model');
const { publishEvent } = require('../events/publisher');
const { checkIdempotencyKey } = require('../utils/idempotency');


async function createPayment({ merchantId, customerId, amount, product, idempotencyKey }) {
    await checkIdempotencyKey(idempotencyKey);

    const payment = await Payment.create({
        id: uuidv4(),
        merchantId,
        customerId,
        amount,
        product,
        status: 'created',
        idempotencyKey,
    });

    await publishEvent('payment.created', payment);
    return payment;
}

module.exports = { createPayment };