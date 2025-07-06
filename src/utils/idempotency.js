const Payment = require('../models/payment.model');

async function checkIdempotencyKey(key) {
    const exists = await Payment.findOne({ where: { idempotencyKey: key } });
    if (exists) throw new Error('Duplicate payment request');
}

module.exports = { checkIdempotencyKey };