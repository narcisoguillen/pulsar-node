pulsar-cli
==========

[![NPM](https://nodei.co/npm/pulsar-cli.png)](https://nodei.co/npm/pulsar-cli/)

> Node binding for pulsar

This library is inspired by [pulsar-client-node](https://github.com/apache/pulsar-client-node)

# Install

```
 npm install pulsar-cli
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
  serviceUrl : 'http://localhost:8080'
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
* `encoding` : String default 'binary', options ['binary', 'string']
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
* `TopicName` : **required

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
  console.log('-->', message.value);
  message.acknowledge();
});

consumer.on('error', error =>{
  // Something wrong happen
});
```

## close

this mechanisms closes all consumers, producers, and client.

```
pulsar.close().then( closed =>{
  // all is closed
}, error =>{
  // Something wrong happen
});
```
