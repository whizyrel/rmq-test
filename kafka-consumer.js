const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'test-consumer',
	brokers: ['localhost:19092'],
});

const groupId = 'test-consumer-group';
const topic = 'test';
const consumer = kafka.consumer({ groupId, allowAutoTopicCreation: true });
const admin = kafka.admin();

(async () => {
    await admin.connect();
    
    const topicExists = (await admin.listTopics())?.includes(topic);

    if (!topicExists) {
        await admin.createTopics({ topics: [{ topic }] });
    }

	const topics = (await admin.fetchTopicMetadata({ topics: [topic] })).topics;

	const topicMap = topics.reduce(
		(acc, item) => ((acc = { [item.name]: item.partitions.length }), acc),
		{}
	);

	console.log(topicMap);

	await admin.createPartitions({
		topicPartitions: [{ count: +(topicMap[topic] + 1), topic }],
	});
})();

consumer.logger().setLogLevel(logLevel.INFO);

consumer.subscribe({ topic });

consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
        await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
		console.log({
			topic,
			message: message.value.toString(),
			partition,
		});
	},
});
