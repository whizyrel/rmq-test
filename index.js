const amqplib = require('amqplib');

// INFO consumer client
const protocol = `amqp`;
const host = `evryword.com.ng`;
const port = 5672;
const url = `${protocol}://${host}:${port}`;

amqplib
	.connect(url)
	.then(async (conn) => {
		const ch = await conn.createChannel();
		const q = `jordan-collection`;

		await ch.assertQueue(q, { durable: true });
		console.log(` [*] Waiting for messages in ${q}. To exit press CTRL+C`);
		// ch.bindExchange(destination, source, pattern)
		ch.bindQueue(q, 'amq.topic', 'jordan-collection');

		ch.consume(
			q,
			(msg) => {
				console.log(` [x] Received`, {
					...msg,
					content: msg.content.toString(),
				});
			},
			{ noAck: true }
		);
	})
	.catch((err) => {
		console.error(`[!] [Consumer] Error`, err);
	});
