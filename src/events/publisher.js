const { createKafkaInstance } = require('infra-lib/kafka/client');

const kafka = createKafkaInstance('payment-service');
const producer = kafka.producer();

(async () => await producer.connect())();

async function publishEvent(topic, data) {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(data) }],
    });
}

module.exports = { publishEvent };
