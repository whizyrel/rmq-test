const mqtt = require('mqtt');

// INFO producer client
const protocol = `mqtt`;
const host = `localhost`;
const port = 1883;
const url = `${protocol}://${host}:${port}`;
const topic = `test`;
const username = 'guest'
const password = 'guest'

const client = mqtt.connect(url, { username, password });

client.on('connect', (s) => {
    console.log('connected', { s });
    let i = 0;

    setInterval(() => {
        client.publish(topic, `[message] count ${i}`);

        i++;
    }, 10000);

    // client.subscribe(topic);
});

client.on('message', (topic, message) => {
    // message is Buffer
    console.log(`[message]`, { topic, m: message.toString() });
});
