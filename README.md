# RabbitMQ // MQTT Test

This is a test of the [RabbitMQ](https://www.rabbitmq.com/) and [MQTT](https://www.mosquitto.org/) libraries. Please look into the dependencies. The idea was to see produced messages from MQTT client consumed by a subscriber from the AMQP RabbitMQ side of things using a RabbitMQ broker.

## Files

- `Subscriber`: The [subscriber](index.js) that consumes messages from the broker.
- `Producer`: The [producer](producer.js) that publishes messages to the broker.
