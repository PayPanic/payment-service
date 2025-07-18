const { createKafkaInstance } = require('infra-lib/kafka/client');
const Payment = require('../models/payment.model');

const kafka = createKafkaInstance('payment-service');

const consumer = kafka.consumer( { groupId: 'payment-consumer-group' });

async function runConsumer() {
    await consumer.connect();
    console.log('[Kafka] Connected as payment-service');

    await consumer.subscribe({ topic: 'transaction.processed', fromBeginning: false });
    await consumer.subscribe({ topic: 'transaction.failed', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            const event = JSON.parse(message.value.toString());
            console.log(`[Kafka] Received ${topic}:`, event);

            try {
                const payment = await Payment.findByPk(event.paymentId);
                if (!payment) {
                    console.warn(`[Kafka] Payment not found for ID: ${event.paymentId}`);
                    return;
                }

                payment.status = topic === 'transaction.processed' ? 'completed' : 'failed';
                await payment.save();
                console.log(`[Kafka] Updated payment ${event.paymentId} to status: ${payment.status}`);
            } catch (error) {
                console.error('[Kafka] Error handling transaction event:', error);
            }
        },
    });
}

runConsumer().catch(console.error);