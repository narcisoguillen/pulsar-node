pulsar-node
==========

[![NPM](https://nodei.co/npm/pulsar-node.png)](https://nodei.co/npm/pulsar-node/)

> Node binding for Apache Pulsar

![Pulsar logo](docs/pulsar.png)

This library is inspired by [pulsar-client-node](https://github.com/apache/pulsar-client-node)

# Requirements

`pulsar-client` is a peer dependency, make sure to install it. Tested on pulsar-client 1.0.0-rc.1

```
 npm install pulsar-client
```

# Install

```
 npm install pulsar-node
```

# Options

* `serviceUrl` : **required**
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

* `auth` : *optional*
* * `tls` : {Object}
* * `athenz` : {Object}
* * `token` : string


## authentication

### tls
```
Pulsar.init({
  serviceUrl: 'pulsar+ssl://localhost:6651',
  tlsTrustCertsFilePath: '/path/to/server.crt',
  auth : {
    tls : {
      certificatePath: '/path/to/client.crt',
      privateKeyPath: '/path/to/client.key'
    }
  }
});
```

### token
```
Pulsar.init({
  serviceUrl: 'pulsar://localhost:6650',
  auth : {
    token : 'a.b.c'
  }
});
```

# API

## init

```
Pulsar.init({
  serviceUrl : 'pulsar://localhost:6650'
}).then( pulsar =>{
  // ready to use
}, error =>{
  // something wrong happen
});
```

## **send**(\<message\>)

### Message format

* `topic` : **required**
* `message` : **required**
* `encoding` : default 'binary', options ['binary', 'string']
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

```
pulsar.send({
  topic   : 'persistent://public/default/my-topic',
  message : 'hello world'
}).then( seccess => {
  // Message was sent
}, error => {
  // Something wrong happen
});
```

## **addConsumer**(\<TopicName\>, \<Options\>)

### TopicName
* `TopicName` : **required**

### Options

* `subscription` : **required**
* `subscriptionType`
* `ackTimeoutMs`
* `receiverQueueSize`
* `receiverQueueSizeAcrossPartitions`
* `consumerName`
* `properties`

```
let consumer = pulsar.addConsumer('persistent://public/default/my-topic', { subscription : 'sub1' });

consumer.on('message', message => {

  console.log('The message data', {
    id           : message.getMessageId().toString(),
    topicName    : message.getTopicName(),
    properties   : message.getProperties(),
    data         : message.getData().toString(),
    partitionKey : message.getPartitionKey(),
  });

  consumer.acknowledge(message);
});

consumer.on('error', error =>{
  // Something wrong happen
});
```

## **Message Object**

### Methods

* `getTopicName`
* `getProperties`
* `getData`
* `getMessageId`
* `getPublishTimestamp`
* `getEventTimestamp`
* `getPartitionKey`
* `validateCMessage`


## close

this mechanisms closes all consumers, producers, and client.

```
pulsar.close().then( closed =>{
  // all is closed
}, error =>{
  // Something wrong happen
});
```
