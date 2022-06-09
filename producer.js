const mqtt = require('mqtt');
const { interval } = require('rxjs');

// INFO producer client
const protocol = `mqtt`;
const host = `evryword.com.ng`;
const port = 1883;
const url = `${protocol}://${host}:${port}`;
const topic = `jordan-collection`;
const username = 'guest';
const password = 'guest';

const client = mqtt.connect(url, { username, password });

client.on('connect', (s) => {
	console.log('connected', { s });
	let i = 0;

	interval(10000).subscribe(() => {
		// INFO publish message using MQTT protocol to consumers on the same topic using AMQP protocol and exchange and queue
		client.publish(topic, `[message] count ${i}`);
		// INFO publishing using MQTT protocol to consumers on the same topic using the same protocol
		client.publish('jordan-parallel', `[message] count ${i}`);

		i++;
	});

	client.subscribe('jordan-parallel');
});

client.on('message', (topic, message) => {
	// message is Buffer
	console.log(`[message]`, { topic, m: message.toString() });
});

client.on('error', (err) => {
	console.error(`[!] [Producer] Error`, err);
});
