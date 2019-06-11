pulsar-cli
==========

[![NPM](https://nodei.co/npm/pulsar-cli.png)](https://nodei.co/npm/pulsar-cli/)

> Node binding for pulsar

This library is inspired by [pulsar-client-node](https://github.com/apache/pulsar-client-node)

# Install

```
 npm install pulsar-cli
```

# API

## Client

### Options

* `serviceUrl`
* `authentication`
* `binding`
* `operationTimeoutSeconds`
* `ioThreads`
* `messageListenerThreads`
* `concurrentLookupRequest`
* `useTls`
* `tlsTrustCertsFilePath`
* `tlsValidateHostname`
* `tlsAllowInsecureConnection`
* `statsIntervalInSeconds`

### Methods

* `createProducer`
* `subscribe`
* `close`


```
const Pulsar = require('pulsar-cli');

const client = new Pulsar.Client({
  serviceUrl: 'pulsar://localhost:6650'
});

```

## Producer

### Options

* `topic` : required
* `producerName`
* `sendTimeoutMs`
* `initialSequenceId`
* `maxPendingMessages`
* `maxPendingMessagesAcrossPartitions`
* `blockIfQueueFull`
* `messageRoutingMode`
* `hashingScheme`
* `compressionType`
* `batchingEnabled`
* `batchingMaxPublishDelayMs`
* `batchingMaxMessages`
* `properties`

### Methods

* `send`
* `flush`
* `close`


```
const {Client} = require('pulsar-cli');
const client   = new Client({ serviceUrl: 'pulsar://localhost:6650' });

client.createProducer({
  topic: 'persistent://public/default/my-topic'
}).then( producer => {
  //..
});

```

## Consumer

### Options

* `topic` : required
* `subscription` : required
* `subscriptionType`
* `ackTimeoutMs`
* `receiverQueueSize`
* `receiverQueueSizeAcrossPartitions`
* `consumerName`
* `properties`

### Methods

* `receive`
* `acknowledge`
* `acknowledgeId`
* `acknowledgeCumulative`
* `acknowledgeCumulativeId`
* `close`


```
const {Client} = require('pulsar-cli');
const client   = new Client({ serviceUrl: 'pulsar://localhost:6650' });

client.subscribe({
  topic: 'persistent://public/default/my-topic',
  subscription: 'sub1'
}).then( consumer =>{
  //..
});

```

## Message

### Methods

* `getTopicName`
* `getProperties`
* `getData`
* `getMessageId`
* `getPublishTimestamp`
* `getEventTimestamp`
* `getPartitionKey`
* `validateCMessage`


# Send a message

```
const {Client} = require('pulsar-cli');
const client   = new Client({ serviceUrl: 'pulsar://localhost:6650' });

client.createProducer({
  topic: 'persistent://public/default/my-topic'
}).then( producer => {
  producer.send({
    data: Buffer.from('My-Message')
  });
});
```

# Receive a message

```
const {Client} = require('pulsar-cli');
const client   = new Client({ serviceUrl: 'pulsar://localhost:6650' });

client.subscribe({
  topic: 'persistent://public/default/my-topic',
  subscription: 'sub1'
}).then( consumer => {
  consumer.receive().then( message => {
    console.log(message.getData().toString()); // 'My-Message'
    consumer.acknowledge(message);
  });
});
```
