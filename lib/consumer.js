const EventEmitter = require('events');
const Client       = require('./client');

module.exports = class Consumer extends EventEmitter {

  constructor(topic, options){
    super();
    this.topic   = topic;
    this.options = options || {};

    Client.subscribe(Object.assign({topic}, this.options)).then(this.onSubscribed.bind(this), this.onError.bind(this));
  }

  onSubscribed(consumer){
    this.consumer = consumer;
    this.emit('subscribed', this.consumer);
    this.listen();
  }

  listen(){
    this.consumer.receive().then( message => {
      this.emit('message', message);
      return this.listen();
    }, this.onError.bind(this) );
  }

  acknowledge(message){
    return this.consumer.acknowledge(message);
  }

  close(){
    return this.consumer.close();
  }

  onError(error){
    this.emit('error', error);
  }

};
