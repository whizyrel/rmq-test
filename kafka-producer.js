const { Kafka } = require('kafkajs');
const { interval } = require('rxjs');

const kafka = new Kafka({
	clientId: 'test-producer',
	brokers: ['localhost:19092'],
});

const topic = 'test';
const producer = kafka.producer({
	allowAutoTopicCreation: true,
	maxInFlightRequests: 1,
	retry: { retries: Number.POSITIVE_INFINITY },
	// transactionTimeout: 30000,
});

(async () => {
	await producer.connect();

	let i = 0;

	interval(5000).subscribe(async () => {
		console.log(i);
		await producer.send({
			topic,
			messages: [{ value: `[message] count ${i}` }],
			acks: -1,
		});

		await producer.send({
			topic: 'jordan-transform',
			messages: [{ value: `[message] count ${i}` }],
			acks: -1,
		});

		i++;
	});
})();
