const { createKafkaInstance } = require('infra-lib/kafka/client');

const kafka = createKafkaInstance('payment-service');
const producer = kafka.producer();

(async () => await producer.connect())();

async function publishEvent(topic, data) {
    try {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(data) }],
        });
    } catch (err) {
        console.error(`[Kafka] Failed to publish event to ${topic}:`, err);
    }
}

module.exports = { publishEvent };
