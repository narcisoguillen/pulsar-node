const EventEmitter = require('events');
const PulsarNode   = require('../');

module.exports = class Consumer extends EventEmitter {

  constructor(options){
    super();
    this.options = options || {};

    PulsarNode.client.subscribe(this.options).then( consumer => {
      this.consumer = consumer;
      this.emit('subscribed', this.consumer);
      this.listen();
    }, error => {
      this.emit('error', error);
    });
  }

  listen(){
    this.consumer.receive().then( message => {
      this.emit('message', message);
      return this.listen();
    }, error => {
      this.emit('error', error);
      return this.listen();
    });
  }

  acknowledge(message){
    return this.consumer.acknowledge(message);
  }

  close(){
    return this.consumer.close();
  }

};
